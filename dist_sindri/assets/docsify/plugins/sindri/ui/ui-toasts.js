// Sindri Docsify plugin: ui:toasts
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:toasts
items:
  - variant: "success"
    title: "Saved"
    description: "Your changes have been saved."
  - variant: "error"
    title: "Failed"
    description: "Could not connect to server."
```
 */

(function () {
  function classesForVariant(v) {
    const map = {
      success: 'border-green-600/50 bg-green-50 text-green-900',
      error: 'border-red-600/50 bg-red-50 text-red-900',
      warning: 'border-amber-600/50 bg-amber-50 text-amber-900',
      info: 'border-indigo-600/50 bg-indigo-50 text-indigo-900',
    };
    return map[v] || map.info;
  }

  function renderToasts(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-lg p-6';
    const stackCls = 'space-y-3';
    const toastBase = 'rounded-xl border p-4 shadow-sm';
    const titleCls = 'font-semibold';
    const descCls = 'mt-1 text-sm text-muted-foreground';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'toasts' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'toasts-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it) => {
      const variant = String(it?.variant || it?.type || 'info').toLowerCase();
      const title = it?.title || it?.label || '';
      const desc = it?.description || it?.content || '';
      const extra = it?.htmltag?.class || '';
      const cls = [toastBase, classesForVariant(variant), extra].filter(Boolean).join(' ');
      const attr = C.attrsToString ? C.attrsToString({ class: cls, role: 'status', 'aria-live': 'polite' }) : '';
      const tHtml = title ? `<div class="${titleCls}">${title}</div>` : '';
      const dHtml = desc ? `<div class="${descCls}">${desc}</div>` : '';
      return `<div ${attr}>${tHtml}${dHtml}</div>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}><div class="${stackCls}">${itemsHtml}</div></div></section>`;
    return `<div class="sindri-ui sindri-ui-toasts">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:toasts': renderToasts,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
