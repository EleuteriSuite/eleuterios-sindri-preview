// Sindri Docsify plugin: marketing:sections
// Secciones genéricas con título, descripción, acciones y media opcional

/*
```sindri:marketing:sections
title: "Build fast"
description: "Ship beautiful docs with reusable blocks."
image:
  src: "https://picsum.photos/seed/section/640/400"
  alt: "Section image"
actions:
  - description: "Get started"
    variant: "default"
  - description: "Learn more"
    variant: "outline"
```
 */

(function () {
  function renderSections(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8';
    const titleCls = 'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl';
    const descCls = 'mt-4 text-base text-gray-600';
    const actionsCls = 'mt-6 flex flex-wrap gap-3';
    const imgCls = 'w-full rounded-xl border shadow-sm';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'sections' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'sections-container' }) : '';

    const title = cfg?.title || cfg?.heading || '';
    const description = cfg?.description || cfg?.lead || '';
    const image = cfg?.image || {};

    // Actions
    const actions = Array.isArray(cfg?.actions) ? cfg.actions : (cfg?.action ? [cfg.action] : []);
    let actionsHtml = '';
    if (actions.length) {
      try {
        const renderButton = window.__SindriUtilsUi?.renderButton || null;
        if (renderButton) actionsHtml = `<div class="${actionsCls}">` + actions.map((a) => renderButton(a)).join('') + `</div>`;
      } catch (e) { /* ignore */ }
    }

    const textCol = `<div><h2 class="${titleCls}">${title}</h2>${description ? `<p class="${descCls}">${description}</p>` : ''}${actionsHtml}</div>`;
    const imgCol = (function(){
      const src = image?.src || '';
      if (!src) return '';
      const alt = image?.alt || '';
      const cls = [imgCls, image?.class].filter(Boolean).join(' ');
      return `<div><img src="${src}" alt="${alt}" class="${cls}"/></div>`;
    })();

    const html = `<section ${sectionAttr}><div ${containerAttr}>${textCol}${imgCol}</div></section>`;
    return `<div class="sindri-marketing sindri-marketing-sections">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:sections': renderSections,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
