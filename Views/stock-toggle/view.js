const app = dv.app;
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

// In-stock checkbox for one ingredient note. Reads and writes the "My Bar" note (not this note).
const me = dv.current();
const name = me.file.name;
const cover = (() => { const c = me.covered_by; return !c ? [] : (typeof c === "string" ? [c] : Array.from(c)); })();
const readSet = () => { const s = barFm().in_stock; return new Set(Array.isArray(s) ? s : []); };

const wrap = dv.container.createEl("div");
const label = wrap.createEl("label");
const cb = label.createEl("input", { attr: { type: "checkbox" } });
label.createEl("span", { text: " In stock" });
const note = wrap.createEl("div");
note.style.cssText = "opacity:.7;font-size:.9em";
const set0 = readSet();
cb.checked = set0.has(name);
const via = cover.filter(n => set0.has(n));
if (!cb.checked && via.length) note.setText("Covered: you have " + via.join(", ") + ".");
cb.addEventListener("change", async () => {
  cb.disabled = true;
  const f = await ensureBar();
  await app.fileManager.processFrontMatter(f, fm => {
    const s = new Set(Array.isArray(fm.in_stock) ? fm.in_stock : []);
    if (cb.checked) s.add(name); else s.delete(name);
    fm.in_stock = sortNames([...s]);
  });
  if (cb.checked) note.setText("");
  cb.disabled = false;
});
