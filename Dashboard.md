# Cocktail Codex Dashboard

What to buy next: [[Shopping Priorities]]. What's in stock: [[Ingredients on Hand]].

## What can I make right now?
```dataviewjs
// ---- CONFIG -------------------------------------------------------------
const ROOTS = [
  ["#old-fashioned", "Old-Fashioned", "Spirit, sugar and bitters, stirred over ice."],
  ["#martini", "Martini family", "Spirit plus an aromatized wine (vermouth), seasoned with bitters or a liqueur; stirred and served up. Includes the Manhattan, Negroni and Martinez."],
  ["#daiquiri", "Daiquiri", "Spirit, citrus and sugar, shaken: the classic sour."],
  ["#sidecar", "Sidecar", "A sour where an orange liqueur does the sweetening: spirit, orange liqueur and citrus."],
  ["#flip", "Flip", "Spirit or fortified wine, sugar and a whole egg (or dairy), shaken: rich and silky."],
  ["#whiskey-highball", "Whisky Highball", "Spirit lengthened with a cold sparkling mixer, served tall."]
];
// A recipe that names a generic category note ([[Gin]]) is satisfied by any owned bottle in these categories.
const GENERIC = {
  "Gin": ["Gin"], "Rum": ["Rum"], "Vodka": ["Vodka"], "Tequila": ["Tequila"], "Cognac": ["Cognac"],
  "Bourbon": ["Bourbon"], "Rye Whiskey": ["Rye whiskey"], "Amaro": ["Amaro"], "Dry Vermouth": ["Dry vermouth"],
  "Whiskey": ["Bourbon", "Rye whiskey", "Scotch", "Irish whiskey", "Japanese whisky", "Whiskey (other)"]
};
// Pairs of notes that are the same bottle (see _Notes - Bottle Review). Owning either counts as owning both.
const SAME = [["Appleton Estate Reserve Blend rum", "Appleton Estate Reserve Blend"], ["Flor de Cana 4-Year White", "Flor de Cana 4-year white rum"], ["Gosling's Black Seal rum", "Gosling's Black Seal"], ["Zacapa 23 rum", "Zacapa 23"], ["Blume Marillen Apricot Eau-de-Vie", "Blume Marillen apricot eau-de-vie"], ["Russell's Reserve 6-Year Rye", "Russell's Reserve rye"], ["H by Hine VSOP", "Hine H Cognac"], ["Paul Beau VS Cognac", "Paul Beau VS"], ["Chareau California Aloe Liqueur", "Chareau aloe liqueur"], ["Cocchi Americano Bianco", "Cocchi Americano"], ["Maraska Maraschino", "Maraska maraschino liqueur"], ["Dolin Rouge", "Dolin Sweet Vermouth"]];
// Category notes (Gin.md, Rum.md ...) carry their own in_stock flag from the old dashboard. false = ignore it and require an owned bottle.
const TRUST_CATEGORY_FLAG = false;
const TIER_NAMES = ["As written", "Close swap", "Stretch swap"];
// -------------------------------------------------------------------------

const ing = dv.pages('"Ingredients"').array();
const byPath = new Map(ing.map(p => [p.file.path, p]));
const byName = new Map(ing.map(p => [p.file.name, p]));
const partners = new Map();
for (const [a, b] of SAME) {
  if (!partners.has(a)) partners.set(a, []); partners.get(a).push(b);
  if (!partners.has(b)) partners.set(b, []); partners.get(b).push(a);
}
const isOwned = p => p.in_stock === true ||
  (partners.get(p.file.name) || []).some(n => byName.get(n)?.in_stock === true);
const isSame = (a, b) => a.file.name === b.file.name || (partners.get(a.file.name) || []).includes(b.file.name);
const byCat = new Map();
for (const p of ing) if (p.category) { if (!byCat.has(p.category)) byCat.set(p.category, []); byCat.get(p.category).push(p); }
const catsLower = new Map([...byCat.keys()].map(c => [c.toLowerCase(), c]));
const genericCats = p => GENERIC[p.file.name] || (catsLower.has(p.file.name.toLowerCase()) ? [catsLower.get(p.file.name.toLowerCase())] : null);
const ownedIn = (cats, p) => (TRUST_CATEGORY_FLAG && p.in_stock === true) || cats.some(c => (byCat.get(c) || []).some(isOwned));
const nm = p => p.file.name;
const lc = s => (s || "").toString();


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
  // Names linked from the "## Ingredients" section only (not prose in Notes / See also).
  let txt = "";
  try { txt = (await dv.io.load(r.file.path)) || ""; } catch (e) { return null; }
  const m = txt.match(/^##\s+Ingredients[^\n]*\n([\s\S]*?)(?=^##\s|(?![\s\S]))/m);
  if (!m) return null;
  const set = new Set(); set.lines = new Map();
  for (const x of m[1].matchAll(/\[\[([^\]|#]+)/g)) set.add(x[1].trim().toLowerCase());
  for (const ln of m[1].split("\n")) for (const x of ln.matchAll(/\[\[([^\]|#]+)/g)) { const k = x[1].trim().toLowerCase(); if (!set.lines.has(k)) set.lines.set(k, ln); }
  return set;
}

async function evaluate(r) {
  const swaps = [], blocked = [], prep = [];
  let tier = 0;
  const names = await ingredientNames(r);
  const unfiltered = !names;  // fall back to every ingredient link in the note (old dashboard behaviour)
  let matched = 0;
  const seen = new Set();
  for (const l of r.file.outlinks) {
    const path = l.path || "";
    const base = path.split("/").pop().replace(/\.md$/, "").toLowerCase();
    if ((names && !names.has(base)) || seen.has(path)) continue;
    seen.add(path);
    if (path.startsWith("Ingredients/") || path.startsWith("Sub-Recipes/")) matched++;
    if (path.startsWith("Sub-Recipes/")) { prep.push(path.split("/").pop().replace(/\.md$/, "")); continue; }
    if (!path.startsWith("Ingredients/")) continue;
    const p = byPath.get(path); if (!p) continue;
    if (p.category) {
      if (isOwned(p)) continue;
      const cands = (byCat.get(p.category) || []).filter(c => isOwned(c) && !isSame(c, p));
      if (!cands.length) { blocked.push(p.category.toLowerCase().replace(/^./, c => c.toUpperCase()) + " (" + nm(p) + ")"); continue; }
      const close = cands.filter(c => p.style && c.style && p.style === c.style);
      const kind = close.length ? 1 : 2;
      swaps.push({ want: p, have: (close.length ? close : cands).slice(0, 3), kind });
      tier = Math.max(tier, kind);
    } else {
      const gc = genericCats(p);
      if (gc) {
        const hint = styleHint(gc, names && names.lines && names.lines.get(base));
        if (!hint) { if (!ownedIn(gc, p)) blocked.push(gc[0] + " (any)"); }
        else {
          const have = (byCat.get(gc[0]) || []).filter(isOwned);
          if (!have.length) blocked.push(gc[0] + " (" + hint + ")");
          else if (!have.some(c => c.style === hint)) {
            swaps.push({ want: { file: { name: hint + " " + gc[0].toLowerCase() }, category: gc[0], style: hint, character: "" }, have: have.slice(0, 3), kind: 2 });
            tier = Math.max(tier, 2);
          }
        }
      }
      else if (p.in_stock !== true) blocked.push(nm(p));
    }
  }
  return { r, tier, swaps, blocked, prep, matched, unfiltered };
}

function swapText(s) {
  const w = s.want, h = s.have[0];
  const names = s.have.map(nm).join(" or ");
  const sty = x => (x.style && x.style !== "standard") ? x.style : (x.style === "standard" ? "standard" : "an unlisted style");
  const why = s.kind === 1
    ? "both " + ((w.style && w.style !== "standard") ? w.style + " " : "") + w.category.toLowerCase()
    : "book calls for " + sty(w) + "; this is " + sty(h);
  const trim = t => { t = lc(t); return t.length > 150 ? t.slice(0, 147).replace(/ \S*$/, "") + "..." : t; };
  const line = p => lc(p.character) ? "<br><small>" + nm(p) + ": " + trim(p.character) + "</small>" : "";
  return "**" + names + "** for " + nm(w) + " (" + why + ")" + line(w) + line(h);
}

const recipes = dv.pages('"Recipes"').where(r => !r.file.name.includes("_Notes")).array();
const results = await Promise.all(recipes.map(evaluate));

dv.paragraph("Tiers: **As written** = you own every named bottle. **Close swap** = same category and style (Tanqueray for Beefeater). **Stretch swap** = same category, different or unlisted style. Produce and pantry items are exact-only. A *Prep* entry means a sub-recipe (infusion, syrup, etc.) has to be made first. Drinks missing a whole category of bottle aren't listed; the line under each root says what's blocking them.");

const unread = results.filter(x => x.unfiltered).length;
const totalMatched = results.reduce((a, x) => a + x.matched, 0);
dv.paragraph("*Checked " + results.length + " recipes against " + ing.filter(p => p.category && isOwned(p)).length + " bottles and " + ing.filter(p => !p.category && p.in_stock === true).length + " other items marked in stock" + "; " + totalMatched + " ingredient links matched" + (unread ? "; WARNING: " + unread + " recipes fell back to unfiltered links" : "") + (totalMatched === 0 ? "; WARNING: no ingredient links matched, results are not reliable" : "") + ".*");

const byRootList = list => ROOTS.map(([tag, title]) => {
  const names = list.filter(x => x.r.root === tag).sort((a, b) => nm(a.r).localeCompare(nm(b.r))).map(x => x.r.file.link);
  return names.length ? "- " + title + ": " + names.join(" · ") : null;
}).filter(Boolean).concat(list.filter(x => !ROOTS.some(r => r[0] === x.r.root)).length
  ? ["- Other: " + list.filter(x => !ROOTS.some(r => r[0] === x.r.root)).map(x => x.r.file.link).join(" · ")] : []).join("\n");
for (const [t, label] of [[0, "Ready tonight: as written, no prep"], [1, "Close swap, no prep"], [2, "Stretch swap, no prep"]]) {
  const list = results.filter(x => x.tier === t && !x.blocked.length && !x.prep.length);
  dv.header(3, label + " (" + list.length + ")");
  dv.paragraph(list.length ? byRootList(list) : (t === 0 ? "*Nothing yet. Mark bottles in stock in the table at the bottom.*" : "*None right now.*"));
}

for (const [tag, title, blurb] of ROOTS) {
  const mine = results.filter(x => x.r.root === tag);
  const ok = mine.filter(x => !x.blocked.length);
  const blockedHere = mine.filter(x => x.blocked.length);
  dv.header(3, title);
  dv.paragraph("*" + blurb + "*");
  const counts = [0, 1, 2].map(t => ok.filter(x => x.tier === t).length);
  dv.paragraph("**" + counts[0] + "** as written · **" + counts[1] + "** close swap · **" + counts[2] + "** stretch swap · " + blockedHere.length + " blocked");
  for (let t = 0; t < 3; t++) {
    const rows = ok.filter(x => x.tier === t)
      .sort((a, b) => a.swaps.length - b.swaps.length || a.prep.length - b.prep.length || nm(a.r).localeCompare(nm(b.r)));
    if (!rows.length) continue;
    dv.header(4, TIER_NAMES[t] + " (" + rows.length + ")");
    const head = t === 0 ? ["Drink", "Type", "Page", "Prep"] : ["Drink", "Type", "Page", "Prep", "What changes"];
    dv.table(head, rows.map(x => {
      const base = [x.r.file.link, rootType(x.r), x.r.page, x.prep.length ? x.prep.join(", ") : ""];
      return t === 0 ? base : base.concat([x.swaps.map(swapText).join("<br><br>")]);
    }));
  }
  if (blockedHere.length) {
    const c = new Map();
    for (const x of blockedHere) for (const b of new Set(x.blocked)) { const k = b.replace(/ \(.*\)$/, ""); c.set(k, (c.get(k) || 0) + 1); }
    const top = [...c.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, n]) => k + " (" + n + ")").join(", ");
    dv.paragraph("*Blocked by: " + top + "*");
  }
}

function rootType(r) {
  // the first link under "## Root" names the sub-type (Manhattan, Negroni, Gin Martini, ...)
  const ro = r.file.outlinks.find(l => (l.path || "").startsWith("Recipes/"));
  return ro ? ro.display || (ro.path.split("/").pop().replace(/\.md$/, "")) : "";
}

```


## What have I tried?
```dataview
TABLE date_tried, rating, root
FROM "Recipes"
WHERE tried = true
SORT date_tried DESC
```
