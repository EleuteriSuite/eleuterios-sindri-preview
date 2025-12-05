// Sindri Docsify plugin: ui:textareas
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:textareas
items:
  - title: "Notes"
    id: "Notes"
    rows: 4
    value: "Texto inicial"
htmltag:
  styles:
    - background: "linear-gradient(180deg, #fff, #f8fafc)"
```
 */

(function () {
  function renderTextareas(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-lg p-6';
    const labelSpanCls = 'text-sm font-medium text-gray-700';
    const textareaBaseCls = 'mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'textareas' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'textareas-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [{}];
    const itemsHtml = items.map((it, idx) => {
      const id = it?.id || `sindri-textarea-${idx}`;
      const title = it?.title || it?.label || '';
      const rows = it?.rows != null ? String(it.rows) : '4';
      const name = it?.name || undefined;
      const placeholder = it?.placeholder != null ? String(it.placeholder) : undefined;
      const value = it?.value != null ? String(it.value) : '';
      const extraCls = it?.htmltag?.class || '';
      const taAttr = C.attrsToString ? C.attrsToString({
        id,
        name,
        rows,
        placeholder,
        class: [textareaBaseCls, extraCls].filter(Boolean).join(' '),
      }) : '';

      const labelOpen = `<label for="${id}">`;
      const span = title ? `<span class="${labelSpanCls}"> ${title} </span>` : '';
      const content = value ? value : '';
      return `${labelOpen}${span}<textarea ${taAttr}>${content}</textarea></label>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${itemsHtml}</div></section>`;
    return `<div class="sindri-ui sindri-ui-textareas">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:textareas': renderTextareas,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
