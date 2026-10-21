# Ingredients on Hand
Tick a box to mark something in stock (it edits that ingredient's `in_stock` field). The drinks on the [[Dashboard]] update after a moment.

```dataviewjs
// Ingredient stock table with editable in-stock checkboxes.
// Ticking a box rewrites only the `in_stock:` line in that ingredient note's frontmatter.
const app = dv.app;
const ST = (window.__cocktailStock = window.__cocktailStock || { q: "", status: "all", closed: {} });
const GROUPS = ["Spirits", "Liqueurs & Fortified", "Bitters", "Acids & Juices", "Syrups & Sweeteners", "Other"];

const items = dv.pages('"Ingredients"').where(p => !p.is_category).array();
const groupOf = p => p.file.path.split("/")[1] || "Other";
const nameOf = p => p.file.name;

async function setStock(path, val) {
  const f = app.vault.getAbstractFileByPath(path);
  if (!f) return;
  await app.vault.process(f, t => {
    const m = t.match(/^---\n([\s\S]*?)\n---/);
    if (!m) return t;
    const fm = /^in_stock:.*$/m.test(m[1])
      ? m[1].replace(/^in_stock:.*$/m, "in_stock: " + val)
      : m[1] + "\nin_stock: " + val;
    return t.slice(0, m.index) + "---\n" + fm + "\n---" + t.slice(m.index + m[0].length);
  });
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
    const on = p.in_stock === true;
    if (ST.status === "in" && !on) return false;
    if (ST.status === "out" && on) return false;
    if (!q) return true;
    return [nameOf(p), p.category, p.style].some(s => (s || "").toString().toLowerCase().includes(q));
  };
  const total = items.length, have = items.filter(p => p.in_stock === true).length;
  summary.setText(have + " of " + total + " in stock");
  for (const g of GROUPS.concat([...new Set(items.map(groupOf))].filter(x => !GROUPS.includes(x)))) {
    const all = items.filter(p => groupOf(p) === g);
    const rows = all.filter(match).sort((a, b) => (a.category || "~").localeCompare(b.category || "~") || nameOf(a).localeCompare(nameOf(b)));
    if (!rows.length) continue;
    const det = body.createEl("details");
    det.open = !ST.closed[g] || !!q;
    det.addEventListener("toggle", () => { if (!q) ST.closed[g] = !det.open; });
    det.createEl("summary", { text: g + " (" + all.filter(p => p.in_stock === true).length + " of " + all.length + " in stock)" });
    const tbl = det.createEl("table");
    const hr = tbl.createEl("thead").createEl("tr");
    for (const h of ["Have", "Ingredient", "Category", "Style"]) hr.createEl("th", { text: h });
    const tb = tbl.createEl("tbody");
    for (const p of rows) {
      const tr = tb.createEl("tr");
      const cb = tr.createEl("td").createEl("input", { attr: { type: "checkbox" } });
      cb.checked = p.in_stock === true;
      cb.addEventListener("change", async () => { cb.disabled = true; await setStock(p.file.path, cb.checked); p.in_stock = cb.checked; cb.disabled = false; });
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
