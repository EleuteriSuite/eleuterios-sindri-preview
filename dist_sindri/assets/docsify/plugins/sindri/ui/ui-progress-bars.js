// Sindri Docsify plugin: ui:progress-bars
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:progress-bars
items:
  - title: "Uploading files"
    value: 35
    max: 100
    caption: "35% completed"
  - title: "Generating report"
    value: 72
    max: 120
    colorClass: "bg-emerald-600"
    caption: "Step 3 of 5"
```
 */

(function () {
  function clamp(n, min, max) {
    n = Number(n);
    if (Number.isNaN(n)) return 0;
    return Math.max(min, Math.min(max, n));
  }

  function renderProgressBars(cfg) {
    const C = window.SindriCore || {};

    // Clases base inspiradas en un patrón simple de Tailwind
    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-2xl p-6 space-y-4';
    const labelCls = 'mb-1 text-sm font-medium text-gray-700';
    const barOuterCls = 'relative h-3.5 w-full overflow-hidden rounded-full bg-gray-200';
    const barInnerBaseCls = 'h-full bg-indigo-600 transition-[width] duration-500';
    const captionCls = 'mt-1 text-xs text-muted-foreground';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'progress-bars' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'progress-bars-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [{}];
    const itemsHtml = items.map((it, idx) => {
      const title = it?.title || it?.label || '';
      const value = Number(it?.value ?? 0);
      const max = Number(it?.max ?? 100);
      const percent = max > 0 ? clamp((value / max) * 100, 0, 100) : 0;
      const innerExtraCls = it?.htmltag?.class || '';
      const colorCls = it?.colorClass || it?.color || '';

      const outerAttr = C.attrsToString ? C.attrsToString({ class: barOuterCls }) : '';
      const innerStyle = `width: ${percent}%`;
      const innerAttr = C.attrsToString ? C.attrsToString({ class: [barInnerBaseCls, colorCls, innerExtraCls].filter(Boolean).join(' '), style: innerStyle }) : '';

      const labelHtml = title ? `<div class="${labelCls}">${title}</div>` : '';
      const captionText = it?.caption != null ? String(it.caption) : '';
      const captionHtml = captionText ? `<div class="${captionCls}">${captionText}</div>` : '';

      return [
        '<div>',
        labelHtml,
        `<div ${outerAttr}><div ${innerAttr}></div></div>`,
        captionHtml,
        '</div>'
      ].join('');
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${itemsHtml}</div></section>`;
    return `<div class="sindri-ui sindri-ui-progress-bars">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:progress-bars': renderProgressBars,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
