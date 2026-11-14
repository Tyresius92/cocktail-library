# Ingredients on Hand
Tick a box to mark something in stock. Your stock list is saved in the [[My Bar]] note, which git ignores, so updates to this vault never overwrite it. The drinks on the [[Dashboard]] update after a moment.

```dataviewjs
// Ingredient stock table with editable in-stock checkboxes.
// Ticking a box adds or removes the ingredient's name in the `in_stock` list of the "My Bar" note.
const ST = (window.__cocktailStock = window.__cocktailStock || { q: "", status: "all", closed: {} });
const GROUPS = ["Spirits", "Liqueurs & Fortified", "Bitters", "Acids & Juices", "Syrups & Sweeteners", "Other"];

const app = dv.app;
const items = dv.pages('"Ingredients"').where(p => !p.is_category).array();
const groupOf = p => p.file.path.split("/")[1] || "Other";
const nameOf = p => p.file.name;

const BAR = "My Bar.md";
const BAR_TEMPLATE = "---\nin_stock: []\ntried: {}\n---\n\n# My Bar\n\nThis note records what you have in stock and which drinks you have tried. It is created automatically and git ignores it, so pulling updates never overwrites it.\n\nTick boxes on [[Ingredients on Hand]], or in any ingredient or recipe note.\n";
const barFm = () => { const f = app.vault.getAbstractFileByPath(BAR); return (f && app.metadataCache.getFileCache(f)?.frontmatter) || {}; };
async function ensureBar() {
  let f = app.vault.getAbstractFileByPath(BAR);
  if (f) return f;
  try { f = await app.vault.create(BAR, BAR_TEMPLATE); } catch (e) { f = app.vault.getAbstractFileByPath(BAR); }
  return f;
}
const sortNames = a => a.sort((x, y) => x.localeCompare(y, undefined, { sensitivity: "base" }));
const readSet = () => { const s = barFm().in_stock; return new Set(Array.isArray(s) ? s : []); };
await ensureBar();
const stockSet = readSet();
async function setStock(name, val) {
  const f = await ensureBar();
  await app.fileManager.processFrontMatter(f, fm => {
    const s = new Set(Array.isArray(fm.in_stock) ? fm.in_stock : []);
    if (val) s.add(name); else s.delete(name);
    fm.in_stock = sortNames([...s]);
  });
  if (val) stockSet.add(name); else stockSet.delete(name);
}

const root = dv.container.createEl("div");
const bar = root.createEl("div");
bar.style.cssText = "display:flex;gap:.6em;align-items:center;margin:.4em 0 .8em;flex-wrap:wrap";
const input = bar.createEl("input", { attr: { type: "text", placeholder: "Filter by name, category or style..." } });
input.style.cssText = "flex:1;min-width:14em";
input.value = ST.q;
const sel = bar.createEl("select");
for (const [v, label] of [["all", "All"], ["in", "In stock"], ["out", "Out of stock"]]) {
  const o = sel.createEl("option", { text: label, attr: { value: v } });
  if (ST.status === v) o.selected = true;
}
const summary = bar.createEl("span");
const body = root.createEl("div");

function draw() {
  body.empty();
  const q = ST.q.trim().toLowerCase();
  const match = p => {
    const on = stockSet.has(nameOf(p));
    if (ST.status === "in" && !on) return false;
    if (ST.status === "out" && on) return false;
    if (!q) return true;
    return [nameOf(p), p.category, p.style].some(s => (s || "").toString().toLowerCase().includes(q));
  };
  const total = items.length, have = items.filter(p => stockSet.has(nameOf(p))).length;
  summary.setText(have + " of " + total + " in stock");
  for (const g of GROUPS.concat([...new Set(items.map(groupOf))].filter(x => !GROUPS.includes(x)))) {
    const all = items.filter(p => groupOf(p) === g);
    const rows = all.filter(match).sort((a, b) => (a.category || "~").localeCompare(b.category || "~") || nameOf(a).localeCompare(nameOf(b)));
    if (!rows.length) continue;
    const det = body.createEl("details");
    det.open = !ST.closed[g] || !!q;
    det.addEventListener("toggle", () => { if (!q) ST.closed[g] = !det.open; });
    det.createEl("summary", { text: g + " (" + all.filter(p => stockSet.has(nameOf(p))).length + " of " + all.length + " in stock)" });
    const tbl = det.createEl("table");
    const hr = tbl.createEl("thead").createEl("tr");
    for (const h of ["Have", "Ingredient", "Category", "Style"]) hr.createEl("th", { text: h });
    const tb = tbl.createEl("tbody");
    for (const p of rows) {
      const tr = tb.createEl("tr");
      const cb = tr.createEl("td").createEl("input", { attr: { type: "checkbox" } });
      cb.checked = stockSet.has(nameOf(p));
      cb.addEventListener("change", async () => { cb.disabled = true; await setStock(nameOf(p), cb.checked); cb.disabled = false; });
      const a = tr.createEl("td").createEl("a", { text: nameOf(p), cls: "internal-link", attr: { "data-href": p.file.path, href: p.file.path } });
      tr.createEl("td", { text: (p.category || "").toString() });
      tr.createEl("td", { text: (p.style || "").toString() });
    }
  }
}
input.addEventListener("input", () => { ST.q = input.value; draw(); });
sel.addEventListener("change", () => { ST.status = sel.value; draw(); });
draw();
```

Back to [[Dashboard]].
