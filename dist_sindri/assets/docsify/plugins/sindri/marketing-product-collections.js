// Sindri Docsify plugin: marketing:product-collections
// Rejilla de colecciones de productos (imagen + título + conteo + enlace)

/*
```sindri:marketing:product-collections
items:
  - image:
      src: "https://images.unsplash.com/photo-1520975954732-35dd22f47506?q=80&w=1200&auto=format&fit=crop"
      alt: "Men collection"
    title: "Men"
    count: 24
    href: "#"
  - image:
      src: "https://images.unsplash.com/photo-1520975923867-8ce001175f48?q=80&w=1200&auto=format&fit=crop"
      alt: "Women collection"
    title: "Women"
    count: 18
    href: "#"
```
 */

(function () {
  function renderProductCollections(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
    const gridCls = 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3';
    const cardCls = 'group overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm';
    const imgWrapCls = 'aspect-[4/3] overflow-hidden';
    const imgCls = 'h-full w-full object-cover transition-transform duration-300 group-hover:scale-105';
    const bodyCls = 'p-6';
    const titleCls = 'text-base font-semibold text-gray-900';
    const countCls = 'mt-1 text-sm text-muted-foreground';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'product-collections' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'product-collections-container' }) : '';
    const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'product-collections-grid' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const cardsHtml = items.map((it) => {
      const href = it?.href || '#';
      const image = it?.image || {};
      const imgSrc = image?.src || '';
      const imgAlt = image?.alt || (it?.title || 'Collection image');
      const imgHtml = imgSrc ? `<div class="${imgWrapCls}"><img src="${imgSrc}" alt="${imgAlt}" class="${imgCls}"/></div>` : '';

      const title = it?.title || 'Collection';
      const count = it?.count != null ? String(it.count) : '';

      return `<a href="${href}" class="${cardCls}">${imgHtml}<div class="${bodyCls}">`+
             `<h3 class="${titleCls}">${title}</h3>`+
             `${count ? `<p class="${countCls}">${count} items</p>` : ''}`+
             `</div></a>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}><div ${gridAttr}>${cardsHtml}</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-product-collections">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:product-collections': renderProductCollections,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
