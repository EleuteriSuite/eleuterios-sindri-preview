// Sindri Docsify plugin: marketing:empty-content
// Estados vacíos con icono/ilustración, título, descripción y acciones

/*
```sindri:marketing:empty-content
icon: "📭"
title: "No items found"
description: "Try changing your filters or create a new item."
actions:
  - description: "Create item"
    variant: "default"
```
 */

(function () {
  function renderEmptyContent(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-20';
    const wrapCls = 'mx-auto flex max-w-md flex-col items-center gap-4 px-4 text-center';
    const iconWrapCls = 'inline-flex size-16 items-center justify-center rounded-full bg-gray-50 text-3xl';
    const imgCls = 'mx-auto size-24';
    const titleCls = 'text-xl font-semibold text-gray-900';
    const descCls = 'text-sm text-muted-foreground';
    const actionsCls = 'mt-2 flex flex-wrap justify-center gap-3';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'empty-content' }) : '';
    const wrapAttr = C.attrsToString ? C.attrsToString({ class: wrapCls, 'data-slot': 'empty-content-wrap' }) : '';

    // Icon or image
    let visual = '';
    if (cfg?.image?.src) {
      const src = cfg.image.src;
      const alt = cfg.image.alt || '';
      const cls = [imgCls, cfg?.image?.class].filter(Boolean).join(' ');
      visual = `<img src="${src}" alt="${alt}" class="${cls}"/>`;
    } else if (cfg?.icon) {
      const content = typeof cfg.icon === 'string' ? cfg.icon : '';
      visual = `<div class="${iconWrapCls}">${content}</div>`;
    }

    const title = cfg?.title || cfg?.heading || '';
    const description = cfg?.description || cfg?.content || '';

    // Actions
    const actions = Array.isArray(cfg?.actions) ? cfg.actions : (cfg?.action ? [cfg.action] : []);
    let actionsHtml = '';
    if (actions.length) {
      try {
        const renderButton = window.__SindriUtilsUi?.renderButton || null;
        if (renderButton) actionsHtml = `<div class="${actionsCls}">` + actions.map((a) => renderButton(a)).join('') + `</div>`;
      } catch (e) { /* ignore */ }
    }

    const html = `<section ${sectionAttr}><div ${wrapAttr}>${visual}${title ? `<h3 class="${titleCls}">${title}</h3>` : ''}${description ? `<p class="${descCls}">${description}</p>` : ''}${actionsHtml}</div></section>`;
    return `<div class="sindri-marketing sindri-marketing-empty-content">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:empty-content': renderEmptyContent,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
