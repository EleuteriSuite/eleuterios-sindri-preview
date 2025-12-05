// Sindri Docsify plugin: marketing:cards
// Rejilla de tarjetas de contenido genéricas (icono + título + descripción + enlace opcional)

/*
```sindri:marketing:blog-cards
items:
  - image:
      src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop"
      alt: "Laptop on desk"
    category: "Product"
    title: "Introducing v2.0"
    excerpt: "All the new features and improvements shipped in v2.0."
    href: "#"
    meta: "5 min read · Dec 2025"
  - image:
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
      alt: "Code editor"
    category: "Engineering"
    title: "How we built our plugin system"
    excerpt: "A deep dive into the architecture powering Sindri blocks."
    href: "#"
    meta: "8 min read"
```
 */

(function () {
  function renderCards(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
    const headCls = 'mx-auto max-w-2xl text-center';
    const titleCls = 'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl';
    const descCls = 'mt-4 text-base text-gray-600';
    const gridCls = 'mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3';
    const cardCls = 'h-full rounded-xl border bg-card p-6 text-card-foreground shadow-sm';
    const iconWrapCls = 'mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600';
    const iconImgCls = 'size-6';
    const itemTitleCls = 'text-lg font-semibold text-gray-900';
    const itemDescCls = 'mt-2 text-sm text-muted-foreground';
    const linkCls = 'mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'cards' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'cards-container' }) : '';
    const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'cards-grid' }) : '';

    const title = cfg?.title || '';
    const description = cfg?.description || '';
    const headHtml = (title || description)
      ? `<div class="${headCls}">${title ? `<h2 class="${titleCls}">${title}</h2>` : ''}${description ? `<p class="${descCls}">${description}</p>` : ''}</div>`
      : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it) => {
      const icon = it?.icon || {};
      let iconHtml = '';
      if (typeof icon === 'string') {
        // Puede ser emoji o SVG
        iconHtml = icon.trim().startsWith('<') ? icon : `<span>${icon}</span>`;
      } else if (icon && (icon.src || icon.svg)) {
        if (icon.src) iconHtml = `<img src="${icon.src}" alt="${icon.alt || ''}" class="${iconImgCls}"/>`;
        if (icon.svg) iconHtml = icon.svg;
      }
      iconHtml = iconHtml ? `<div class="${iconWrapCls}">${iconHtml}</div>` : '';

      const t = it?.title || it?.label || 'Card title';
      const d = it?.description || it?.content || '';
      const href = it?.href || it?.link || '';
      const linkText = it?.linkText || 'Learn more';

      const titleHtml = `<h3 class="${itemTitleCls}">${t}</h3>`;
      const descHtml = d ? `<p class="${itemDescCls}">${d}</p>` : '';
      const linkHtml = href ? `<a href="${href}" class="${linkCls}">${linkText}
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>` : '';

      return `<div class="${cardCls}">${iconHtml}${titleHtml}${descHtml}${linkHtml}</div>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${headHtml}<div ${gridAttr}>${itemsHtml}</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-cards">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:cards': renderCards,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
