// Sindri Docsify plugin: ui:stats
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:stats
items:
  - value: "24k"
    label: "Users"
  - value: "98%"
    label: "Uptime"
  - value: "312"
    label: "Deploys"
```
 */

(function () {
  function renderStats(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-5xl p-6';
    const gridCls = 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3';
    const cardCls = 'rounded-xl border bg-white p-6 text-center shadow-sm';
    const valueCls = 'text-2xl font-bold text-gray-900';
    const labelCls = 'mt-1 text-xs text-muted-foreground';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'stats' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'stats-container' }) : '';
    const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'stats-grid' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it) => {
      const value = it?.value != null ? String(it.value) : '';
      const label = it?.label || it?.title || '';
      const extra = it?.htmltag?.class || '';
      const cardAttr = C.attrsToString ? C.attrsToString({ class: [cardCls, extra].filter(Boolean).join(' ') }) : '';
      return `<div ${cardAttr}><div class="${valueCls}">${value}</div><div class="${labelCls}">${label}</div></div>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}><div ${gridAttr}>${itemsHtml}</div></div></section>`;
    return `<div class="sindri-ui sindri-ui-stats">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:stats': renderStats,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
