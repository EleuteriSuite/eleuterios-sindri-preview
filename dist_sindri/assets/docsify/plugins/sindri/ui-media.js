// Sindri Docsify plugin: ui:media
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:media
items:
  - src: "https://picsum.photos/seed/1/400/240"
    alt: "Random 1"
    title: "Card title 1"
    description: "Short description here."
  - src: "https://picsum.photos/seed/2/400/240"
    alt: "Random 2"
    title: "Card title 2"
    description: "Another line of text."
```
 */

(function () {
  function renderMedia(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-6xl p-6';
    const gridCls = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3';
    const cardBase = 'overflow-hidden rounded-xl border bg-white shadow-sm';
    const mediaCls = 'aspect-video w-full object-cover';
    const bodyCls = 'p-4';
    const titleCls = 'text-sm font-semibold text-gray-900';
    const descCls = 'mt-1 text-sm text-muted-foreground';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'media' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'media-container' }) : '';
    const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'media-grid' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const cards = items.map(it => {
      const src = it?.src || it?.href || '';
      const alt = it?.alt || it?.title || 'Media';
      const title = it?.title || '';
      const desc = it?.description || it?.content || '';
      const extra = it?.htmltag?.class || '';
      const cardAttr = C.attrsToString ? C.attrsToString({ class: [cardBase, extra].filter(Boolean).join(' ') }) : '';
      const imgAttr = C.attrsToString ? C.attrsToString({ src, alt, class: mediaCls, loading: 'lazy' }) : '';
      const tHtml = title ? `<div class="${titleCls}">${title}</div>` : '';
      const dHtml = desc ? `<div class="${descCls}">${desc}</div>` : '';
      return `<article ${cardAttr}><img ${imgAttr}/><div class="${bodyCls}">${tHtml}${dHtml}</div></article>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}><div ${gridAttr}>${cards}</div></div></section>`;
    return `<div class="sindri-ui sindri-ui-media">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:media': renderMedia,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
