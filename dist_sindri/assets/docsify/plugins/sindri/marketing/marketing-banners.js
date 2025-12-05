// Sindri Docsify plugin: marketing:banners
// Depende de window.SindriCore (core.js) y opcionalmente de window.__SindriUtilsUi

/*
```sindri:marketing:banners
title: "Understand user flow and"
titleStrong:
  description: "increase"
  variant: "primary"
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident accusamus impedit minima harum corporis iusto."
actions:
  - description: "Get Started"
    href: "#"
    variant: "default"
  - description: "Learn More"
    href: "#"
    variant: "outline"
```
 */

(function () {
  function renderBanners(cfg) {
    const C = window.SindriCore || {};
    const U = window.__SindriUtilsUi || {};

    // 1) Clases base inspiradas en ai_helpers/components/marketing/banners/1.html
    const sectionCls = 'bg-white lg:grid lg:h-screen lg:place-content-center';
    const containerCls = 'mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32';
    const proseCls = 'mx-auto max-w-prose text-center';
    const titleCls = 'text-4xl font-bold text-gray-900 sm:text-5xl';
    const descCls = 'mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed';
    const actionsCls = 'mt-4 flex justify-center gap-4 sm:mt-6';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'banners' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'banners-container' }) : '';
    const proseAttr = C.attrsToString ? C.attrsToString({ class: proseCls, 'data-slot': 'banners-prose' }) : '';

    const title = cfg?.title || '';
    const titleStrong = cfg?.titleStrong.description || '';
    const strongCls = cfg?.titleStrong.variant === 'secondary'? 'text-secondary' : 'text-primary';
    const description = cfg?.description || '';

    const titleHtml = (title || titleStrong)
      ? `<h1 class="${titleCls}">${C.unwrapAnglesInString ? C.unwrapAnglesInString(title) : title} ${titleStrong ? `<strong class="${strongCls}">${titleStrong}</strong>` : ''}</h1>`
      : '';
    const descHtml = description ? `<p class="${descCls}">${description}</p>` : '';

    // Actions (array of buttons)
    const actions = Array.isArray(cfg?.actions) ? cfg.actions : [];
    let renderButton = null;
    try {
      renderButton = window.__SindriUtilsUi?.renderButton || null;
    } catch (e) {
      throw new Error('Sindri: marketing:banners plugin requires Sindri Utils UI');
    }
    const actionsHtml = actions.length
      ? `<div class="${actionsCls}">` + actions.map((a) => renderButton(a)).join('') + `</div>`
      : '';

    const html = `<section ${sectionAttr}><div ${containerAttr}><div ${proseAttr}>${titleHtml}${descHtml}${actionsHtml}</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-banners">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:banners': renderBanners,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
