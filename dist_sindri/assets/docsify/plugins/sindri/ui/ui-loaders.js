// Sindri Docsify plugin: ui:loaders
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:loaders
items:
  - type: "spinner"
    size: 8
    colorClass: "text-indigo-600"
    title: "Loading data"
  - type: "dots"
    size: 4
    colorClass: "text-gray-500"
    title: "Waiting"
```
 */

(function () {
  function renderOneLoader(it, C) {
    const type = String(it?.type || 'spinner').toLowerCase();
    const size = String(it?.size || '6'); // Tailwind size-6 por defecto
    const colorCls = it?.colorClass || it?.color || 'text-indigo-600';
    const extra = it?.htmltag?.class || '';

    if (type === 'dots' || type === 'ellipsis') {
      // Tres puntos animados usando CSS utility
      const dotCls = `size-${size} rounded-full bg-current opacity-60 animate-bounce`;
      const wrapAttr = C.attrsToString ? C.attrsToString({
        class: ['flex items-center gap-1', colorCls, extra].filter(Boolean).join(' '),
        'aria-label': 'Loading',
      }) : '';
      return `<div ${wrapAttr}><span class="${dotCls}" style="animation-delay:0ms"></span><span class="${dotCls}" style="animation-delay:150ms"></span><span class="${dotCls}" style="animation-delay:300ms"></span></div>`;
    }

    // Por defecto: spinner SVG con animate-spin
    const wrapAttr = C.attrsToString ? C.attrsToString({
      class: ['inline-flex', colorCls, extra].filter(Boolean).join(' '),
      role: 'status', 'aria-live': 'polite', 'aria-busy': 'true'
    }) : '';
    const s = size; // Tailwind size-N
    const svg = `
      <svg aria-hidden="true" class="size-${s} animate-spin" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>`;
    const sr = it?.srLabel ? `<span class="sr-only">${it.srLabel}</span>` : '';
    return `<span ${wrapAttr}>${svg}${sr}</span>`;
  }

  function renderLoaders(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'flex flex-wrap items-center justify-center gap-6 p-6';
    const captionCls = 'text-xs text-muted-foreground mt-1 text-center block';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'loaders' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'loaders-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [{}];
    const itemsHtml = items.map((it) => {
      const piece = renderOneLoader(it, C);
      const caption = it?.title || it?.label || '';
      const captionHtml = caption ? `<small class="${captionCls}">${caption}</small>` : '';
      return `<div class="flex flex-col items-center">${piece}${captionHtml}</div>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${itemsHtml}</div></section>`;
    return `<div class="sindri-ui sindri-ui-loaders">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:loaders': renderLoaders,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
