// Sindri Docsify plugin: marketing:team-sections
// Sección de equipo con tarjetas de miembros

/*
```sindri:marketing:team-sections
title: "Meet the team"
description: "People who make the magic happen"
items:
  - name: "Alice Smith"
    role: "CEO"
    image:
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
      alt: "Alice portrait"
    links:
      - label: "Twitter"
        href: "#"
      - label: "LinkedIn"
        href: "#"
  - name: "Bob Johnson"
    role: "CTO"
    image:
      src: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop"
      alt: "Bob portrait"
```
 */

(function () {
  function renderTeamSections(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
    const headCls = 'mx-auto max-w-2xl text-center';
    const titleCls = 'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl';
    const descCls = 'mt-4 text-base text-gray-600';
    const gridCls = 'mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3';
    const cardCls = 'flex h-full flex-col items-center gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm';
    const avatarCls = 'size-24 rounded-full object-cover';
    const nameCls = 'text-base font-semibold text-gray-900';
    const roleCls = 'text-sm text-gray-500';
    const bioCls = 'text-sm text-muted-foreground text-center';
    const linksCls = 'mt-2 flex gap-3';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'team-sections' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'team-sections-container' }) : '';
    const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'team-sections-grid' }) : '';

    const title = cfg?.title || cfg?.heading || '';
    const description = cfg?.description || cfg?.intro || '';
    const headHtml = (title || description)
      ? `<div class="${headCls}">${title ? `<h2 class="${titleCls}">${title}</h2>` : ''}${description ? `<p class="${descCls}">${description}</p>` : ''}</div>`
      : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const cardsHtml = items.map((it) => {
      const img = it?.image || {};
      const imgSrc = img?.src || it?.avatar || '';
      const imgAlt = img?.alt || it?.name || 'Member photo';
      const imgHtml = imgSrc ? `<img src="${imgSrc}" alt="${imgAlt}" class="${avatarCls}"/>` : '';

      const name = it?.name || it?.title || 'Unnamed';
      const role = it?.role || it?.position || '';
      const bio = it?.bio || it?.description || '';

      const links = Array.isArray(it?.links) ? it.links : [];
      const linksHtml = links.length ? `<div class="${linksCls}">` + links.map((lnk)=>{
        const href = lnk?.href || '#';
        const label = lnk?.label || lnk?.title || 'Link';
        return `<a href="${href}" class="text-sm text-indigo-600 hover:underline">${label}</a>`;
      }).join('') + `</div>` : '';

      return `<div class="${cardCls}">${imgHtml}<div class="text-center">`+
        `<p class="${nameCls}">${name}</p>`+
        `${role ? `<p class="${roleCls}">${role}</p>` : ''}`+
        `${bio ? `<p class="${bioCls}">${bio}</p>` : ''}`+
        `${linksHtml}</div></div>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${headHtml}<div ${gridAttr}>${cardsHtml}</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-team-sections">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:team-sections': renderTeamSections,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
