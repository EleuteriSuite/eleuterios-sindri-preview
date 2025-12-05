// Sindri Docsify plugin: marketing:carts
// Lista simple de líneas de carrito con totales y acciones

/*
```sindri:marketing:carts
items:
  - image:
      src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop"
      alt: "Headphones"
    title: "Noise Cancelling Headphones"
    variant: "Black / 64GB"
    qty: 1
    price: 199
  - image:
      src: "https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?q=80&w=400&auto=format&fit=crop"
      alt: "Backpack"
    title: "Everyday Backpack"
    qty: 2
    price: 89
subtotal: 377
shipping: 10
tax: 34.5
total: 421.5
actions:
  - description: "Continue shopping"
    variant: "outline"
  - description: "Checkout"
    variant: "default"
```
 */

(function () {
  function money(val) {
    if (val == null) return '';
    if (typeof val === 'number') return `$${val.toFixed(2)}`;
    return String(val);
  }

  function renderCarts(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-12';
    const containerCls = 'mx-auto max-w-3xl px-4 sm:px-6 lg:px-8';
    const listCls = 'divide-y rounded-xl border bg-card text-card-foreground shadow-sm';
    const rowCls = 'flex items-center gap-4 p-4';
    const imgCls = 'size-16 rounded-md object-cover';
    const titleCls = 'font-medium text-gray-900';
    const metaCls = 'text-xs text-muted-foreground';
    const qtyCls = 'text-sm text-gray-600';
    const priceCls = 'ml-auto text-sm font-semibold text-gray-900';
    const totalWrapCls = 'mt-6 flex items-center justify-between';
    const totalLabelCls = 'text-sm text-gray-600';
    const totalValueCls = 'text-base font-semibold text-gray-900';
    const actionsCls = 'mt-4 flex justify-end gap-3';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'carts' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'carts-container' }) : '';
    const listAttr = C.attrsToString ? C.attrsToString({ class: listCls, 'data-slot': 'carts-list' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const linesHtml = items.map((it) => {
      const image = it?.image || {};
      const imgSrc = image?.src || '';
      const imgAlt = image?.alt || (it?.title || 'Product image');
      const imgHtml = imgSrc ? `<img src="${imgSrc}" alt="${imgAlt}" class="${imgCls}"/>` : '';
      const title = it?.title || 'Product';
      const variant = it?.variant || '';
      const qty = it?.qty != null ? `× ${it.qty}` : '';
      const price = it?.price != null ? money(it.price) : '';
      return `<div class="${rowCls}">${imgHtml}<div><p class="${titleCls}">${title}</p>${variant ? `<p class="${metaCls}">${variant}</p>` : ''}${qty ? `<p class="${qtyCls}">${qty}</p>` : ''}</div><span class="${priceCls}">${price}</span></div>`;
    }).join('');

    const subtotal = cfg?.subtotal != null ? money(cfg.subtotal) : '';
    const shipping = cfg?.shipping != null ? money(cfg.shipping) : '';
    const tax = cfg?.tax != null ? money(cfg.tax) : '';
    const total = cfg?.total != null ? money(cfg.total) : '';

    const totalsHtml = `<div class="${totalWrapCls}"><span class="${totalLabelCls}">Subtotal</span><span class="${totalValueCls}">${subtotal}</span></div>`+
      (shipping ? `<div class="${totalWrapCls}"><span class="${totalLabelCls}">Shipping</span><span class="${totalValueCls}">${shipping}</span></div>` : '')+
      (tax ? `<div class="${totalWrapCls}"><span class="${totalLabelCls}">Tax</span><span class="${totalValueCls}">${tax}</span></div>` : '')+
      (total ? `<div class="${totalWrapCls}"><span class="${totalLabelCls}">Total</span><span class="${totalValueCls}">${total}</span></div>` : '');

    // Acciones (checkout, continue shopping)
    const actions = Array.isArray(cfg?.actions) ? cfg.actions : [];
    let actionsHtml = '';
    if (actions.length) {
      try {
        const renderButton = window.__SindriUtilsUi?.renderButton || null;
        if (renderButton) actionsHtml = `<div class="${actionsCls}">` + actions.map((a) => renderButton(a)).join('') + `</div>`;
      } catch (e) { /* ignore */ }
    }

    const html = `<section ${sectionAttr}><div ${containerAttr}><div ${listAttr}>${linesHtml}</div>${totalsHtml}${actionsHtml}</div></section>`;
    return `<div class="sindri-marketing sindri-marketing-carts">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:carts': renderCarts,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
