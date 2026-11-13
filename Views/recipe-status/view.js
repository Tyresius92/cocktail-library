// Per-recipe "your bar" view. Shared by every recipe note via dv.view.
const GENERIC = {
  "Gin": ["Gin"], "Rum": ["Rum"], "Vodka": ["Vodka"], "Tequila": ["Tequila"], "Cognac": ["Cognac"],
  "Bourbon": ["Bourbon"], "Rye Whiskey": ["Rye whiskey"], "Amaro": ["Amaro"], "Dry Vermouth": ["Dry vermouth"],
  "Whiskey": ["Bourbon", "Rye whiskey", "Scotch", "Irish whiskey", "Japanese whisky", "Whiskey (other)"]
};
const SAME = [["Appleton Estate Reserve Blend rum", "Appleton Estate Reserve Blend"], ["Flor de Cana 4-Year White", "Flor de Cana 4-year white rum"], ["Gosling's Black Seal rum", "Gosling's Black Seal"], ["Zacapa 23 rum", "Zacapa 23"], ["Blume Marillen Apricot Eau-de-Vie", "Blume Marillen apricot eau-de-vie"], ["Russell's Reserve 6-Year Rye", "Russell's Reserve rye"], ["H by Hine VSOP", "Hine H Cognac"], ["Paul Beau VS Cognac", "Paul Beau VS"], ["Chareau California Aloe Liqueur", "Chareau aloe liqueur"], ["Cocchi Americano Bianco", "Cocchi Americano"], ["Maraska Maraschino", "Maraska maraschino liqueur"], ["Dolin Rouge", "Dolin Sweet Vermouth"]];
const TIER = ["As written", "Close swap", "Stretch swap"];

const r = dv.current();
const ing = dv.pages('"Ingredients"').array();
const byPath = new Map(ing.map(p => [p.file.path, p]));
const byName = new Map(ing.map(p => [p.file.name, p]));
const partners = new Map();
for (const [a, b] of SAME) {
  if (!partners.has(a)) partners.set(a, []); partners.get(a).push(b);
  if (!partners.has(b)) partners.set(b, []); partners.get(b).push(a);
}
const isOwned = p => p.in_stock === true || (partners.get(p.file.name) || []).some(n => byName.get(n)?.in_stock === true);
const isSame = (a, b) => a.file.name === b.file.name || (partners.get(a.file.name) || []).includes(b.file.name);
const byCat = new Map();
for (const p of ing) if (p.category) { if (!byCat.has(p.category)) byCat.set(p.category, []); byCat.get(p.category).push(p); }
const catsLower = new Map([...byCat.keys()].map(c => [c.toLowerCase(), c]));
const genericCats = p => GENERIC[p.file.name] || (catsLower.has(p.file.name.toLowerCase()) ? [catsLower.get(p.file.name.toLowerCase())] : null);
const nm = p => p.file.name;
const coverNames = p => { const c = p.covered_by; if (!c) return []; return typeof c === "string" ? [c] : Array.from(c); };
const haveItem = p => p.in_stock === true || coverNames(p).some(n => byName.get(n)?.in_stock === true);
const lk = p => p.file.link || ("[[" + nm(p) + "]]");
const dedupe = ps => { const out = []; for (const p of ps) if (!out.some(o => isSame(o, p))) out.push(p); return out; };
const names = ps => dedupe(ps).map(lk).join(" or ");
const lc = s => (s || "").toString();
const trim = t => { t = lc(t); return t.length > 140 ? t.slice(0, 137).replace(/ \S*$/, "") + "..." : t; };

function styleHint(gc, line) {
  if (!line || gc.length !== 1) return null;
  const styles = [...new Set((byCat.get(gc[0]) || []).map(c => c.style).filter(s => s && s !== "standard"))].sort((a, b) => b.length - a.length);
  const low = line.toLowerCase();
  for (const s of styles) { const esc = s.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); if (new RegExp("\\b" + esc + "\\b").test(low)) return s; }
  return null;
}
const suggest = (cat, style) => {
  const pool = (byCat.get(cat) || []).filter(p => !isOwned(p));
  const pick = [...pool.filter(p => style && p.style === style), ...pool.filter(p => !(style && p.style === style))].slice(0, 3);
  return pick.length ? " (e.g. " + pick.map(lk).join(", ") + ")" : "";
};

// Ingredient section
let txt = ""; try { txt = (await dv.io.load(r.file.path)) || ""; } catch (e) {}
const m = txt.match(/^##\s+Ingredients[^\n]*\n([\s\S]*?)(?=^##\s|(?![\s\S]))/m);
if (!m) { dv.paragraph("*Couldn't read this note's ingredient list.*"); }
else {
  const wanted = new Set(), lines = new Map();
  const reqSet = new Set();
  for (const ln of m[1].split("\n")) { const garnish = /^\s*-\s*Garnish:/i.test(ln);
    for (const x of ln.matchAll(/\[\[([^\]|#]+)/g)) { const k = x[1].trim().toLowerCase(); wanted.add(k); if (!garnish) reqSet.add(k); if (!lines.has(k)) lines.set(k, ln); } }
  const optional = new Set([...wanted].filter(k => !reqSet.has(k)));
  const have = [], missing = [], swaps = [], prep = [], garnishMissing = [];
  let tier = 0; const seen = new Set();
  for (const l of r.file.outlinks) {
    const path = l.path || "";
    const base = path.split("/").pop().replace(/\.md$/, "").toLowerCase();
    if (!wanted.has(base) || seen.has(path)) continue; seen.add(path);
    if (path.startsWith("Sub-Recipes/")) { prep.push(l); continue; }
    if (!path.startsWith("Ingredients/")) continue;
    const p = byPath.get(path); if (!p) continue;
    if (p.category) {
      if (isOwned(p)) { have.push(lk(p)); continue; }
      const cands = (byCat.get(p.category) || []).filter(c => isOwned(c) && !isSame(c, p));
      if (!cands.length) { missing.push(lk(p) + ": no " + p.category.toLowerCase() + " on hand" + suggest(p.category, p.style)); continue; }
      const close = cands.filter(c => p.style && c.style && p.style === c.style);
      const kind = close.length ? 1 : 2; tier = Math.max(tier, kind);
      const use = dedupe(close.length ? close : cands).slice(0, 3);
      const sty = x => (x.style && x.style !== "standard") ? x.style : (x.style === "standard" ? "standard" : "an unlisted style");
      const why = kind === 1 ? "same " + ((p.style && p.style !== "standard") ? p.style + " " : "") + p.category.toLowerCase() : "book calls for " + sty(p) + "; this is " + sty(use[0]);
      swaps.push("**" + names(use) + "** for " + lk(p) + " (" + why + ")" + (lc(use[0].character) ? "<br><small>" + nm(use[0]) + ": " + trim(use[0].character) + "</small>" : ""));
      continue;
    }
    const gc = genericCats(p);
    if (gc) {
      const hint = styleHint(gc, lines.get(base));
      const owned = gc.flatMap(c => (byCat.get(c) || []).filter(isOwned));
      const label = lk(p) + (hint ? " (" + hint + ")" : "");
      if (!owned.length) { missing.push(label + ": none on hand" + suggest(gc[0], hint)); continue; }
      if (!hint || owned.some(c => c.style === hint)) { have.push(label + ": " + (hint ? owned.filter(c => c.style === hint) : owned).slice(0, 3).map(lk).join(", ")); continue; }
      tier = Math.max(tier, 2);
      swaps.push("**" + names(dedupe(owned).slice(0, 3)) + "** for " + label + " (book calls for " + hint + ")");
      continue;
    }
    const via = coverNames(p).find(n => byName.get(n)?.in_stock === true);
    if (p.in_stock === true) have.push(lk(p));
    else if (via) have.push(lk(p) + " (using [[" + via + "]])");
    else if (optional.has(base)) garnishMissing.push(lk(p));
    else missing.push(lk(p));
  }
  const verdict = missing.length ? "Missing something" : TIER[tier];
  const out = ["**" + verdict + "**" + (prep.length ? " · prep: " + prep.map(l => "[[" + (l.path || "").split("/").pop().replace(/\.md$/, "") + "]]").join(", ") : "")];
  if (have.length) out.push("**Have:** " + have.join(" · "));
  if (missing.length) out.push("**Missing:**\n" + missing.map(x => "- " + x).join("\n"));
  if (garnishMissing.length) out.push("**Optional garnish you don't have:** " + garnishMissing.join(" · ") + ". Skip it or substitute.");
  if (swaps.length) out.push("**Could swap:**\n" + swaps.map(x => "- " + x).join("\n"));
  if (!swaps.length && !missing.length && have.length) out.push("*Nothing to swap: you can make this as written.*");
  dv.paragraph(out.join("\n\n"));
}
