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

// Tried / rating / date for one recipe note. Stored in the "My Bar" note, keyed by recipe name.
const name = dv.current().file.name;
const fd = v => !v ? "" : (v.toISODate ? v.toISODate() : String(v).slice(0, 10));
const today = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
const e0 = (barFm().tried || {})[name];

const wrap = dv.container.createEl("div");
wrap.style.cssText = "display:flex;gap:.8em;align-items:center;flex-wrap:wrap";
const l1 = wrap.createEl("label");
const cb = l1.createEl("input", { attr: { type: "checkbox" } });
l1.createEl("span", { text: " Tried" });
const l2 = wrap.createEl("label");
l2.createEl("span", { text: "Rating " });
const sel = l2.createEl("select");
for (const v of ["", "1", "2", "3", "4", "5"]) sel.createEl("option", { text: v || "-", attr: { value: v } });
const l3 = wrap.createEl("label");
l3.createEl("span", { text: "Date " });
const date = l3.createEl("input", { attr: { type: "date" } });
cb.checked = e0 !== undefined && e0 !== null;
if (e0 && e0.rating !== undefined && e0.rating !== null) sel.value = String(e0.rating);
if (e0 && e0.date) date.value = fd(e0.date);

async function save(fn) {
  const f = await ensureBar();
  await app.fileManager.processFrontMatter(f, fm => {
    const t = (fm.tried && typeof fm.tried === "object") ? fm.tried : {};
    fn(t); fm.tried = t;
  });
}
const ensure = t => { t[name] = (t[name] && typeof t[name] === "object") ? t[name] : {}; if (!t[name].date) t[name].date = date.value || today(); return t[name]; };
cb.addEventListener("change", async () => {
  await save(t => { if (cb.checked) { ensure(t); } else delete t[name]; });
  if (cb.checked && !date.value) date.value = today();
  if (!cb.checked) { sel.value = ""; date.value = ""; }
});
sel.addEventListener("change", async () => {
  await save(t => { const o = ensure(t); if (sel.value) o.rating = Number(sel.value); else delete o.rating; });
  cb.checked = true; if (!date.value) date.value = today();
});
date.addEventListener("change", async () => {
  await save(t => { const o = ensure(t); if (date.value) o.date = date.value; else delete o.date; });
  cb.checked = true;
});
