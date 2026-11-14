# Shopping Priorities

What to buy next, ranked by how many drinks it unblocks. Back to [[Dashboard]].

```dataviewjs
// ---- CONFIG -------------------------------------------------------------
const ROOTS = [
  ["#old-fashioned", "Old-Fashioned"], ["#martini", "Martini family"], ["#daiquiri", "Daiquiri"],
  ["#sidecar", "Sidecar"], ["#flip", "Flip"], ["#whiskey-highball", "Whisky Highball"]
];
const GENERIC = {
  "Gin": ["Gin"], "Rum": ["Rum"], "Vodka": ["Vodka"], "Tequila": ["Tequila"], "Cognac": ["Cognac"],
  "Bourbon": ["Bourbon"], "Rye Whiskey": ["Rye whiskey"], "Amaro": ["Amaro"], "Dry Vermouth": ["Dry vermouth"],
  "Whiskey": ["Bourbon", "Rye whiskey", "Scotch", "Irish whiskey", "Japanese whisky", "Whiskey (other)"]
};
const SAME = [["Appleton Estate Reserve Blend rum", "Appleton Estate Reserve Blend"], ["Flor de Cana 4-Year White", "Flor de Cana 4-year white rum"], ["Gosling's Black Seal rum", "Gosling's Black Seal"], ["Zacapa 23 rum", "Zacapa 23"], ["Blume Marillen Apricot Eau-de-Vie", "Blume Marillen apricot eau-de-vie"], ["Russell's Reserve 6-Year Rye", "Russell's Reserve rye"], ["H by Hine VSOP", "Hine H Cognac"], ["Paul Beau VS Cognac", "Paul Beau VS"], ["Chareau California Aloe Liqueur", "Chareau aloe liqueur"], ["Cocchi Americano Bianco", "Cocchi Americano"], ["Maraska Maraschino", "Maraska maraschino liqueur"], ["Dolin Rouge", "Dolin Sweet Vermouth"]];
const TOP_DETAILS = 15;   // how many rows get a folded drink list
const TIER_NAMES = ["as written", "close swap", "stretch swap"];
// -------------------------------------------------------------------------

const ing = dv.pages('"Ingredients"').array();
const byPath = new Map(ing.map(p => [p.file.path, p]));
const byName = new Map(ing.map(p => [p.file.name, p]));
const toArr = v => !v ? [] : (typeof v === "string" ? [v] : Array.from(v));
const barPage = dv.page("My Bar");
const stockSet = new Set(toArr(barPage && barPage.in_stock));
const owns = p => !!p && stockSet.has(p.file.name);
const partners = new Map();
for (const [a, b] of SAME) {
  if (!partners.has(a)) partners.set(a, []); partners.get(a).push(b);
  if (!partners.has(b)) partners.set(b, []); partners.get(b).push(a);
}
const isOwned = p => owns(p) || (partners.get(p.file.name) || []).some(n => owns(byName.get(n)));
const isSame = (a, b) => a.file.name === b.file.name || (partners.get(a.file.name) || []).includes(b.file.name);
const byCat = new Map();
for (const p of ing) if (p.category) { if (!byCat.has(p.category)) byCat.set(p.category, []); byCat.get(p.category).push(p); }
const catsLower = new Map([...byCat.keys()].map(c => [c.toLowerCase(), c]));
const genericCats = p => GENERIC[p.file.name] || (catsLower.has(p.file.name.toLowerCase()) ? [catsLower.get(p.file.name.toLowerCase())] : null);
const nm = p => p.file.name;
const coverNames = p => { const c = p.covered_by; if (!c) return []; return typeof c === "string" ? [c] : Array.from(c); };
const haveItem = p => owns(p) || coverNames(p).some(n => owns(byName.get(n)));
const sty = s => (s || "").toString();


// A generic line such as "2 oz white rum ([[Rum]])" carries a style hint; match it against the category's known styles.
function styleHint(gc, line) {
  if (!line || gc.length !== 1) return null;
  const styles = [...new Set((byCat.get(gc[0]) || []).map(c => c.style).filter(s => s && s !== "standard"))]
    .sort((a, b) => b.length - a.length);
  const low = line.toLowerCase();
  for (const s of styles) { const esc = s.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); if (new RegExp("\\b" + esc + "\\b").test(low)) return s; }
  return null;
}

async function ingredientNames(r) {
  let txt = "";
  try { txt = (await dv.io.load(r.file.path)) || ""; } catch (e) { return null; }
  const m = txt.match(/^##\s+Ingredients[^\n]*\n([\s\S]*?)(?=^##\s|(?![\s\S]))/m);
  if (!m) return null;
  const set = new Set(); set.lines = new Map();
  for (const x of m[1].matchAll(/\[\[([^\]|#]+)/g)) set.add(x[1].trim().toLowerCase());
  const reqSet = new Set(), anySet = new Set();
  for (const ln of m[1].split("\n")) {
    const garnish = /^\s*-\s*Garnish:/i.test(ln);
    for (const x of ln.matchAll(/\[\[([^\]|#]+)/g)) { const k = x[1].trim().toLowerCase(); anySet.add(k); if (!garnish) reqSet.add(k); if (!set.lines.has(k)) set.lines.set(k, ln); }
  }
  set.optional = new Set([...anySet].filter(k => !reqSet.has(k)));
  return set;
}

// Turn a recipe into a list of requirements, once.
async function parse(r) {
  const reqs = [], seen = new Set();
  const names = await ingredientNames(r);
  for (const l of r.file.outlinks) {
    const path = l.path || "";
    const base = path.split("/").pop().replace(/\.md$/, "").toLowerCase();
    if ((names && !names.has(base)) || seen.has(path)) continue;
    seen.add(path);
    if (!path.startsWith("Ingredients/")) continue;
    const p = byPath.get(path); if (!p) continue;
    if (p.category) reqs.push({ k: "bottle", p, key: "cat:" + p.category, label: p.category });
    else { const gc = genericCats(p);
      if (gc) { const hint = styleHint(gc, names && names.lines && names.lines.get(base));
        reqs.push({ k: "gen", cats: gc, hint, key: "gen:" + p.file.name + (hint || ""), label: gc[0] + " (" + (hint || "any") + ")" }); }
      else reqs.push({ k: "pantry", p, key: "item:" + nm(p), label: nm(p), optional: !!(names && names.optional && names.optional.has(base)) }); }
  }
  return { r, reqs };
}

// H = hypothetical purchase: {cat, style} for a bottle, {item} for a pantry item, or null.
function reqState(q, H) {
  if (q.k === "pantry") return (q.optional || haveItem(q.p) || (H && H.item && (H.item === nm(q.p) || coverNames(q.p).includes(H.item)))) ? { ok: true, tier: 0 } : { ok: false };
  if (q.k === "gen" && q.hint) {
    const styles = (byCat.get(q.cats[0]) || []).filter(isOwned).map(c => c.style);
    if (H && H.cat === q.cats[0]) styles.push(H.style);
    if (!styles.length) return { ok: false };
    return { ok: true, tier: styles.includes(q.hint) ? 0 : 2 };
  }
  if (q.k === "gen") {
    const owned = q.cats.some(c => (byCat.get(c) || []).some(isOwned)) || (H && H.cat && q.cats.includes(H.cat));
    return owned ? { ok: true, tier: 0 } : { ok: false };
  }
  const p = q.p;
  if (isOwned(p)) return { ok: true, tier: 0 };
  const styles = (byCat.get(p.category) || []).filter(c => isOwned(c) && !isSame(c, p)).map(c => c.style);
  if (H && H.cat === p.category) styles.push(H.style);
  if (!styles.length) return { ok: false };
  return { ok: true, tier: styles.some(s => p.style && s && p.style === s) ? 1 : 2 };
}
function recState(x, H) {
  const st = x.reqs.map(q => [q, reqState(q, H)]);
  const fails = st.filter(([, s]) => !s.ok).map(([q]) => q);
  return { ok: !fails.length, tier: Math.max(0, ...st.filter(([, s]) => s.ok).map(([, s]) => s.tier)), fails };
}

const recipes = dv.pages('"Recipes"').where(r => !r.file.name.includes("_Notes")).array();
const parsed = await Promise.all(recipes.map(parse));
const base = parsed.map(x => [x, recState(x, null)]);

// Candidate purchases
const cands = [];
const seenCS = new Set();
for (const p of ing) if (p.category) {
  const s = sty(p.style), k = p.category + "|" + s;
  if (seenCS.has(k)) continue; seenCS.add(k);
  cands.push({ kind: "bottle", H: { cat: p.category, style: s },
    label: p.category + (s && s !== "standard" ? " · " + s : (s ? "" : " · style unlisted")) });
}
const pantrySeen = new Set();
for (const [x, b] of base) for (const q of b.fails) if (q.k === "pantry")
  for (const n of [nm(q.p), ...coverNames(q.p)]) {
    const it = byName.get(n);
    if (!it || owns(it) || pantrySeen.has(n)) continue;
    pantrySeen.add(n); cands.push({ kind: "pantry", H: { item: n }, label: n });
  }

const rootTitle = r => (ROOTS.find(t => t[0] === r.root) || [0, "Other"])[1];
const L = x => x.r.file.link;
function analyze(c) {
  const unblocks = [], near = [], upgrades = [];
  for (const [x, b] of base) {
    const a = recState(x, c.H);
    if (!b.ok) {
      if (a.ok) unblocks.push({ x, tier: a.tier });
      else {
        const resolved = b.fails.some(q => !a.fails.includes(q));
        const keys = [...new Set(a.fails.map(q => q.key))];
        if (resolved && keys.length === 1) near.push({ x, need: a.fails.find(q => q.key === keys[0]).label });
      }
    } else if (a.tier < b.tier) upgrades.push({ x, from: b.tier, to: a.tier });
  }
  return { c, unblocks, near, upgrades };
}
const rootCounts = list => {
  const m = new Map(); for (const u of list) m.set(rootTitle(u.x.r), (m.get(rootTitle(u.x.r)) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => k + " ×" + n).join(" · ");
};
const all = cands.map(analyze).filter(a => a.unblocks.length || a.near.length || a.upgrades.length)
  .sort((a, b) => b.unblocks.length - a.unblocks.length || b.near.length - a.near.length || b.upgrades.length - a.upgrades.length || a.c.label.localeCompare(b.c.label));

// Merge rows in one category whose results are identical (e.g. every sherry style).
function mergeRows(rows) {
  const out = [], idx = new Map();
  for (const a of rows) {
    if (a.c.kind !== "bottle") { out.push(a); continue; }
    const sig = a.c.H.cat + "|" + JSON.stringify([a.unblocks.map(u => nm(u.x.r) + u.tier).sort(), a.near.map(u => nm(u.x.r)).sort(), a.upgrades.map(u => nm(u.x.r) + u.to).sort()]);
    if (idx.has(sig)) { const m = idx.get(sig); m.styles.push(a.c.H.style); m.c.Hs.push(a.c.H); }
    else { const m = { ...a, styles: [a.c.H.style], c: { ...a.c, Hs: [a.c.H] } }; idx.set(sig, m); out.push(m); }
  }
  for (const m of out) if (m.styles && m.styles.length > 1) {
    const named = m.styles.filter(s => s && s !== "standard").sort();
    m.c.label = m.c.H.cat + " · " + (named.length > 3 ? "any style (" + m.styles.length + " styles)" : named.join(" / ") + (m.styles.includes("") ? " / unlisted" : ""));
  }
  return out;
}
function bookBottles(c) {
  if (c.kind !== "bottle") return "";
  const Hs = c.Hs || [c.H];
  const same = ing.filter(p => Hs.some(h => p.category === h.cat && sty(p.style) === h.style) && !isOwned(p)).map(nm);
  return same.length ? same.slice(0, 8).join(", ") + (same.length > 8 ? ", and " + (same.length - 8) + " more" : "") : "";
}
function callout(a) {
  const bb = bookBottles(a.c);
  const lines = ["> [!example]- " + a.c.label + ": unblocks " + a.unblocks.length + " · one more away " + a.near.length + (a.upgrades.length ? " · upgrades " + a.upgrades.length : "")];
  if (bb) lines.push("> Bottles in the book: " + bb);
  const sec = (title, arr, fn) => { if (!arr.length) return; lines.push(">", "> **" + title + "**"); for (const u of arr) lines.push("> - " + fn(u)); };
  sec("Unblocks", a.unblocks.sort((p, q) => nm(p.x.r).localeCompare(nm(q.x.r))), u => L(u.x) + " (" + rootTitle(u.x.r) + "): " + TIER_NAMES[u.tier]);
  sec("One more purchase away", a.near.sort((p, q) => nm(p.x.r).localeCompare(nm(q.x.r))), u => L(u.x) + " (" + rootTitle(u.x.r) + "): also needs " + u.need);
  sec("Upgrades", a.upgrades.sort((p, q) => nm(p.x.r).localeCompare(nm(q.x.r))), u => L(u.x) + ": " + TIER_NAMES[u.from] + " to " + TIER_NAMES[u.to]);
  return lines.join("\n");
}

dv.paragraph("Ranked by how many drinks you **can't make at all** become makeable if you add the item. **One more away** counts drinks where this purchase fixes one gap and exactly one other gap remains. Bottles are grouped by category and style: a same-style bottle makes a drink a close swap, a different style a stretch swap. Open a row below the table for the drinks.");
dv.paragraph("*Based on " + parsed.length + " recipes, " + ing.filter(p => p.category && isOwned(p)).length + " bottles and " + ing.filter(p => !p.category && haveItem(p)).length + " other items in stock. " + base.filter(([, b]) => !b.ok).length + " recipes are currently blocked.*");

for (const [kind, title, firstCol] of [["bottle", "Bottles to buy", "Buy"], ["pantry", "Pantry and fresh", "Get"]]) {
  const rows = mergeRows(all.filter(a => a.c.kind === kind));
  dv.header(3, title);
  if (!rows.length) { dv.paragraph("*Nothing here would unblock or upgrade a drink.*"); continue; }
  dv.table([firstCol, "Unblocks", "One more away", "Opens up"], rows.slice(0, 40).map(a => [
    a.c.label, a.unblocks.length, a.near.length + (a.upgrades.length ? " (+" + a.upgrades.length + " upgrades)" : ""), rootCounts(a.unblocks)]));
  if (rows.length > 40) dv.paragraph("*" + (rows.length - 40) + " more rows with smaller effects not shown.*");
  dv.header(4, "Drinks behind the top " + Math.min(TOP_DETAILS, rows.length));
  dv.paragraph(rows.slice(0, TOP_DETAILS).map(callout).join("\n\n"));
}

```
