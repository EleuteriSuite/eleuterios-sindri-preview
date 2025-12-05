// Sindri Docsify plugin: marketing:product-cards
// Tarjetas de producto con imagen, precio, rating y acción

/*
```sindri:marketing:product-cards
items:
  - image:
      src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
      alt: "Headphones"
    title: "Noise Cancelling Headphones"
    price: "$199.00"
    rating: 4
    action:
      description: "Add to cart"
      variant: "default"
  - image:
      src: "https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?q=80&w=1200&auto=format&fit=crop"
      alt: "Backpack"
    title: "Everyday Backpack"
    price: "$89.00"
    rating: 5
```
 */

(function () {
  function renderProductCards(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
    const gridCls = 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3';
    const cardCls = 'flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm';
    const imgWrapCls = 'relative';
    const imgCls = 'h-64 w-full object-cover';
    const bodyCls = 'flex flex-1 flex-col gap-2 p-6';
    const titleCls = 'text-base font-semibold text-gray-900';
    const priceCls = 'text-sm font-medium text-gray-900';
    const ratingCls = 'text-xs text-amber-500';
    const actionWrapCls = 'mt-3';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'product-cards' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'product-cards-container' }) : '';
    const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'product-cards-grid' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const cardsHtml = items.map((it) => {
      const image = it?.image || {};
      const imgSrc = image?.src || '';
      const imgAlt = image?.alt || (it?.title || 'Product image');
      const imgHtml = imgSrc ? `<div class="${imgWrapCls}"><img src="${imgSrc}" alt="${imgAlt}" class="${imgCls}"/></div>` : '';

      const title = it?.title || 'Product';
      const price = it?.price || '';
      const rating = Math.max(0, Math.min(5, Number(it?.rating || 0)));
      const ratingHtml = rating ? `<div class="${ratingCls}">` + '★'.repeat(rating) + '☆'.repeat(5 - rating) + `</div>` : '';

      // Botón de acción si existe util renderButton
      let actionHtml = '';
      const action = it?.action;
      if (action) {
        try {
          const renderButton = window.__SindriUtilsUi?.renderButton || null;
          if (renderButton) actionHtml = `<div class="${actionWrapCls}">` + renderButton(action) + `</div>`;
        } catch (e) { /* ignore */ }
      }

      return `<article class="${cardCls}">${imgHtml}<div class="${bodyCls}">`+
             `<h3 class="${titleCls}">${title}</h3>`+
             `${price ? `<p class="${priceCls}">${price}</p>` : ''}`+
             `${ratingHtml}`+
             `${actionHtml}`+
             `</div></article>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}><div ${gridAttr}>${cardsHtml}</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-product-cards">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:product-cards': renderProductCards,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
