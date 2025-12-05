// Sindri Docsify plugin: marketing:blog-cards
// Lista de artículos del blog en tarjetas simples

/*
```sindri:marketing:cards
title: "Why choose us"
description: "Benefits that help you ship faster"
items:
  - icon: "💡"
    title: "Innovative"
    description: "Modern components and patterns inspired by Tailwind UI."
    href: "#"
    linkText: "Learn more"
  - icon:
      svg: "<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' class='size-6'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'/></svg>"
    title: "Reliable"
    description: "Simple and tested building blocks for your docs."
  - icon: "🚀"
    title: "Fast"
    description: "Drop-in markdown blocks with zero tooling."
```
 */

(function () {
  function renderBlogCards(cfg) {
    const C = window.SindriCore || {};

    // Clases base inspiradas en un layout típico de cards de blog
    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
    const gridCls = 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3';
    const cardCls = 'flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm';
    const imgCls = 'h-48 w-full object-cover';
    const bodyCls = 'flex flex-1 flex-col gap-3 p-6';
    const categoryCls = 'text-xs font-medium text-indigo-600';
    const titleCls = 'text-lg font-semibold hover:underline';
    const excerptCls = 'text-sm text-muted-foreground';
    const metaCls = 'mt-auto text-xs text-gray-500';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'blog-cards' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'blog-cards-container' }) : '';
    const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'blog-cards-grid' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const cardsHtml = items.map((it) => {
      const href = it?.href || '#';
      const image = it?.image || {};
      const imgSrc = image?.src || '';
      const imgAlt = image?.alt || '';
      const imgHtml = imgSrc ? `<img src="${imgSrc}" alt="${imgAlt}" class="${imgCls}"/>` : '';

      const category = it?.category || '';
      const title = it?.title || 'Untitled';
      const excerpt = it?.excerpt || it?.description || '';
      const meta = it?.meta || '';

      const catHtml = category ? `<p class="${categoryCls}">${category}</p>` : '';
      const titleHtml = `<a href="${href}" class="${titleCls}">${title}</a>`;
      const excerptHtml = excerpt ? `<p class="${excerptCls}">${excerpt}</p>` : '';
      const metaHtml = meta ? `<p class="${metaCls}">${meta}</p>` : '';

      return `<article class="${cardCls}">${imgHtml}<div class="${bodyCls}">${catHtml}${titleHtml}${excerptHtml}${metaHtml}</div></article>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}><div ${gridAttr}>${cardsHtml}</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-blog-cards">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:blog-cards': renderBlogCards,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
