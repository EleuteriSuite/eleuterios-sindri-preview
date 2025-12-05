// Sindri Docsify plugin: marketing:feature-grids
// Rejilla de features con icono, título y descripción (similar a marketing:cards, más minimal)

/*
```sindri:marketing:feature-grids
title: "Everything you need"
description: "A compact set of building blocks"
items:
  - icon: "⚡"
    title: "Fast"
    description: "Optimized bundle and instant rendering"
  - icon:
      svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' class='size-5'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'/></svg>"
    title: "Reliable"
    description: "Simple, predictable output"
```
 */

(function () {
  function renderFeatureGrids(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
    const headCls = 'mx-auto max-w-2xl text-center';
    const titleCls = 'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl';
    const descCls = 'mt-3 text-base text-gray-600';
    const gridCls = 'mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3';
    const cardCls = 'h-full rounded-xl border bg-card p-6 text-card-foreground shadow-sm';
    const iconWrapCls = 'mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600';
    const iconImgCls = 'size-5';
    const itemTitleCls = 'text-base font-semibold text-gray-900';
    const itemDescCls = 'mt-2 text-sm text-muted-foreground';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'feature-grids' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'feature-grids-container' }) : '';
    const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'feature-grids-grid' }) : '';

    const title = cfg?.title || '';
    const description = cfg?.description || '';
    const headHtml = (title || description)
      ? `<div class="${headCls}">${title ? `<h2 class="${titleCls}">${title}</h2>` : ''}${description ? `<p class="${descCls}">${description}</p>` : ''}</div>`
      : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it) => {
      const icon = it?.icon || {};
      let iconHtml = '';
      if (typeof icon === 'string') {
        iconHtml = icon.trim().startsWith('<') ? icon : `<span>${icon}</span>`;
      } else if (icon && (icon.src || icon.svg)) {
        if (icon.src) iconHtml = `<img src="${icon.src}" alt="${icon.alt || ''}" class="${iconImgCls}"/>`;
        if (icon.svg) iconHtml = icon.svg;
      }
      iconHtml = iconHtml ? `<div class="${iconWrapCls}">${iconHtml}</div>` : '';

      const t = it?.title || it?.label || 'Feature';
      const d = it?.description || it?.content || '';
      const titleHtml = `<h3 class="${itemTitleCls}">${t}</h3>`;
      const descHtml = d ? `<p class="${itemDescCls}">${d}</p>` : '';

      return `<div class="${cardCls}">${iconHtml}${titleHtml}${descHtml}</div>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${headHtml}<div ${gridAttr}>${itemsHtml}</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-feature-grids">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:feature-grids': renderFeatureGrids,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
