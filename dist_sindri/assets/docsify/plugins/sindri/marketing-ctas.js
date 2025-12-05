// Sindri Docsify plugin: marketing:ctas
// Depende de window.SindriCore (core.js) y opcionalmente de window.__SindriUtilsUi

/*
```sindri:marketing:ctas
title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit"
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper."
image:
  src: "https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?auto=format&fit=crop&q=80&w=1160"
  alt: "CTA image"
actions:
  - description: "Get Started Today"
    href: "#"
    variant: "secondary"
```
 */

(function () {
  function renderCtas(cfg) {
    const C = window.SindriCore || {};
    const U = window.__SindriUtilsUi || {};

    const sectionCls = 'overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2';
    const textWrapCls = 'p-8 md:p-12 lg:px-16 lg:py-24';
    const innerCls = 'mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right';
    const titleCls = 'text-2xl font-bold text-gray-900 md:text-3xl';
    const descCls = 'hidden text-gray-500 md:mt-4 md:block';
    const actionWrapCls = 'mt-4 md:mt-8';
    const imgCls = 'h-56 w-full object-cover sm:h-full';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'ctas' }) : '';

    const title = cfg?.title || '';
    const description = cfg?.description || '';
    const image = cfg?.image || {};

    const titleHtml = title ? `<h2 class="${titleCls}">${title}</h2>` : '';
    const descHtml = description ? `<p class="${descCls}">${description}</p>` : '';

    const actions = Array.isArray(cfg?.actions) ? cfg.actions : (cfg?.action ? [cfg.action] : []);
    const actionBtn = actions.length ? (function(){
      const a = actions[0];
      let renderButton = null;
      try {
          renderButton = window.__SindriUtilsUi?.renderButton || null;
      } catch (e) {
          throw new Error('Sindri: marketing:ctas plugin requires Sindri Utils UI');
      }
      return renderButton(a);
    })() : '';

    const imgSrc = image?.src || '';
    const imgAlt = image?.alt || '';
    const imgClass = [imgCls, image?.class].filter(Boolean).join(' ');
    const imgHtml = imgSrc ? `<img alt="${imgAlt}" src="${imgSrc}" class="${imgClass}"/>` : '';

    const leftHtml = `<div class="${textWrapCls}"><div class="${innerCls}">${titleHtml}${descHtml}<div class="${actionWrapCls}">${actionBtn}</div></div></div>`;
    const rightHtml = imgHtml;

    const html = `<section ${sectionAttr}>${leftHtml}${rightHtml}</section>`;
    return `<div class="sindri-marketing sindri-marketing-ctas">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:ctas': renderCtas,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
