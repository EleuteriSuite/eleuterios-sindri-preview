// Sindri Docsify plugin: marketing:pricing
// Tabla de precios con planes, lista de features y acción

/*
```sindri:marketing:pricing
title: "Simple pricing"
description: "Choose the plan that fits your needs"
plans:
  - name: "Starter"
    price: "$9/mo"
    description: "For individuals"
    features:
      - "1 project"
      - "Basic support"
    action:
      description: "Choose Starter"
      variant: "default"
  - name: "Pro"
    price: "$29/mo"
    description: "For small teams"
    popular: true
    features:
      - "Unlimited projects"
      - "Priority support"
    action:
      description: "Choose Pro"
      variant: "primary"
```
 */

(function () {
  function renderPricing(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
    const headCls = 'mx-auto max-w-2xl text-center';
    const titleCls = 'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl';
    const descCls = 'mt-3 text-base text-gray-600';
    const gridCls = 'mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3';
    const cardCls = 'relative flex h-full flex-col rounded-xl border bg-card p-6 text-card-foreground shadow-sm';
    const popularBadgeCls = 'absolute right-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white';
    const planNameCls = 'text-base font-semibold text-gray-900';
    const planPriceCls = 'mt-1 text-3xl font-bold text-gray-900';
    const planDescCls = 'mt-1 text-sm text-muted-foreground';
    const ulCls = 'mt-4 space-y-2 text-sm';
    const liCls = 'flex items-start gap-2';
    const actionWrapCls = 'mt-6';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'pricing' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'pricing-container' }) : '';
    const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'pricing-grid' }) : '';

    const title = cfg?.title || '';
    const description = cfg?.description || '';
    const headHtml = (title || description)
      ? `<div class="${headCls}">${title ? `<h2 class="${titleCls}">${title}</h2>` : ''}${description ? `<p class="${descCls}">${description}</p>` : ''}</div>`
      : '';

    const plans = Array.isArray(cfg?.plans) ? cfg.plans : (Array.isArray(cfg?.items) ? cfg.items : []);
    const cardsHtml = plans.map((p) => {
      const name = p?.name || p?.title || 'Plan';
      const price = p?.price || '';
      const desc = p?.description || '';
      const feats = Array.isArray(p?.features) ? p.features : [];
      const popular = !!p?.popular;
      const featuresHtml = feats.length ? `<ul class="${ulCls}">` + feats.map((f) => `<li class="${liCls}">`+
        `<svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 size-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`+
        `<span>${f}</span></li>`).join('') + `</ul>` : '';
      let actionHtml = '';
      if (p?.action) {
        try {
          const renderButton = window.__SindriUtilsUi?.renderButton || null;
          if (renderButton) actionHtml = `<div class="${actionWrapCls}">` + renderButton(p.action) + `</div>`;
        } catch (e) { /* ignore */ }
      }
      return `<div class="${cardCls}">`+
        `${popular ? `<div class="${popularBadgeCls}">Popular</div>` : ''}`+
        `<div><div class="${planNameCls}">${name}</div>`+
        `${price ? `<div class="${planPriceCls}">${price}</div>` : ''}`+
        `${desc ? `<div class="${planDescCls}">${desc}</div>` : ''}`+
        `${featuresHtml}${actionHtml}</div>`+
      `</div>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${headHtml}<div ${gridAttr}>${cardsHtml}</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-pricing">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:pricing': renderPricing,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
