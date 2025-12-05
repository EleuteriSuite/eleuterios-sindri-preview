// Sindri Docsify plugin: marketing:logo-clouds
// Muestra una rejilla de logos con enlaces opcionales

/*
```sindri:marketing:logo-clouds
items:
  - src: "https://dummyimage.com/160x40/000/fff&text=Logo+A"
    alt: "Logo A"
  - src: "https://dummyimage.com/160x40/000/fff&text=Logo+B"
    alt: "Logo B"
  - src: "https://dummyimage.com/160x40/000/fff&text=Logo+C"
    alt: "Logo C"
  - src: "https://dummyimage.com/160x40/000/fff&text=Logo+D"
    alt: "Logo D"
```
 */

(function () {
  function renderLogoClouds(cfg) {
    const C = window.SindriCore || {};

    const outerCls = 'mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8';
    const gridCls = 'grid grid-cols-2 gap-px md:grid-cols-4';
    const cellCls = 'grid place-content-center p-4 grayscale transition-[filter] hover:grayscale-0';
    const imgCls = 'h-8';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const wrapAttrs = C.attrsToString ? C.attrsToString({ class: [outerCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'logo-clouds' }) : '';
    const gridAttrs = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'logo-clouds-grid' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const cellsHtml = items.map((it) => {
      const cellAttrs = C.attrsToString ? C.attrsToString({ class: [cellCls, it?.htmltag?.class].filter(Boolean).join(' ') }) : '';
      const src = it?.src || '';
      const alt = it?.alt || '';
      const href = it?.href || '';
      const content = src ? `<img src="${src}" alt="${alt}" class="${it?.imgClass || imgCls}"/>` : (it?.svg || '');
      const inner = href ? `<a href="${href}" aria-label="${alt || 'Logo'}">${content}</a>` : content;
      return `<div ${cellAttrs}>${inner}</div>`;
    }).join('');

    const html = `<div ${gridAttrs}>${cellsHtml}</div>`;
    return `<div class="sindri-marketing sindri-marketing-logo-clouds"><div ${wrapAttrs}>${html}</div></div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:logo-clouds': renderLogoClouds,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
