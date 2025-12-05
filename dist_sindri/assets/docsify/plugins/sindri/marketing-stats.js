// Sindri Docsify plugin: marketing:stats
// KPIs en rejilla simple

/*
```sindri:marketing:stats
title: "Our impact"
description: "Key numbers that matter"
items:
  - value: "12k+"
    label: "Users"
  - value: "98%"
    label: "Satisfaction"
  - value: "24/7"
    label: "Support"
```
 */

(function () {
  function renderMarketingStats(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8';
    const headCls = 'mx-auto max-w-2xl text-center';
    const titleCls = 'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl';
    const descCls = 'mt-3 text-base text-gray-600';
    const gridCls = 'mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3';
    const cardCls = 'rounded-xl border bg-card p-6 text-center text-card-foreground shadow-sm';
    const valueCls = 'text-3xl font-semibold text-gray-900';
    const labelCls = 'mt-1 text-sm text-muted-foreground';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'stats' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'stats-container' }) : '';
    const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'stats-grid' }) : '';

    const title = cfg?.title || '';
    const description = cfg?.description || '';
    const headHtml = (title || description)
      ? `<div class="${headCls}">${title ? `<h2 class="${titleCls}">${title}</h2>` : ''}${description ? `<p class="${descCls}">${description}</p>` : ''}</div>`
      : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it) => {
      const v = it?.value != null ? String(it.value) : '';
      const l = it?.label || '';
      return `<div class="${cardCls}">${v ? `<div class="${valueCls}">${v}</div>` : ''}${l ? `<div class="${labelCls}">${l}</div>` : ''}</div>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${headHtml}<div ${gridAttr}>${itemsHtml}</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-stats">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:stats': renderMarketingStats,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
