// Sindri Docsify plugin: ui:checkboxes
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:checkboxes
legend: "Checkboxes"
items:
  - id: "Option1"
    title: "Option 1"
    checked: true
  - id: "Option2"
    title: "Option 2"
  - id: "Option3"
    title: "Option 3"
```
 */

(function () {
  function renderCheckboxes(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-lg p-6';
    const groupCls = 'flex flex-col items-start gap-3';
    const labelCls = 'inline-flex items-center gap-3';
    const inputCls = 'size-5 rounded border-gray-300 shadow-sm';
    const spanCls = 'font-medium text-gray-700';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'checkboxes' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'checkboxes-container' }) : '';

    const legend = cfg?.legend || 'Checkboxes';
    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it, idx) => {
      const id = it?.id || `sindri-check-${idx}`;
      const name = it?.name || undefined;
      const value = it?.value != null ? String(it.value) : 'on';
      const checked = it?.checked ? true : undefined;
      const extraCls = it?.htmltag?.class || '';
      const attr = C.attrsToString ? C.attrsToString({
        type: 'checkbox', id, name, value, checked,
        class: [inputCls, extraCls].filter(Boolean).join(' '),
      }) : '';
      const title = it?.title || it?.label || `Option ${idx + 1}`;
      return `<label for="${id}" class="${labelCls}">`+
             `<input ${attr} />`+
             `<span class="${spanCls}">${title}</span>`+
             `</label>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>`+
                 `<fieldset><legend class="sr-only">${legend}</legend>`+
                 `<div class="${groupCls}">${itemsHtml}</div>`+
                 `</fieldset></div></section>`;
    return `<div class="sindri-ui sindri-ui-checkboxes">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:checkboxes': renderCheckboxes,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
