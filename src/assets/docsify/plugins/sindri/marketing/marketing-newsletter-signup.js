// Sindri Docsify plugin: marketing:newsletter-signup
// Sección de newsletter con título, descripción e input + botón

/*
```sindri:marketing:newsletter-signup
title: "Newsletter title"
description: "Nesletter description"
placeholder: iam@valentigamez.com
button:
  description: "Subscribe"
  variant: "primary"
```
 */

(function () {
  function renderNewsletterSignup(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center';
    const titleCls = 'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl';
    const descCls = 'mt-3 text-base text-gray-600';
    const formCls = 'mx-auto mt-6 flex max-w-md gap-3';
    const inputCls = 'w-full rounded-md border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'newsletter-signup' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'newsletter-signup-container' }) : '';

    const title = cfg?.title || 'Join our newsletter';
    const description = cfg?.description || '';
    const placeholder = cfg?.placeholder || 'you@example.com';

    let buttonHtml = '';
    const buttonCfg = cfg?.button || { description: 'Subscribe', variant: 'default' };
    try {
      const renderButton = window.__SindriUtilsUi?.renderButton || null;
      if (renderButton) buttonHtml = renderButton(buttonCfg);
    } catch (e) { /* ignore */ }

    const html = `<section ${sectionAttr}><div ${containerAttr}>`+
      `<h2 class="${titleCls}">${title}</h2>`+
      `${description ? `<p class="${descCls}">${description}</p>` : ''}`+
      `<form class="${formCls}" onsubmit="return false;">`+
      `<input type="email" placeholder="${placeholder}" class="${inputCls}"/>${buttonHtml}`+
      `</form>`+
      `</div></section>`;

    return `<div class="sindri-marketing sindri-marketing-newsletter-signup">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:newsletter-signup': renderNewsletterSignup,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
