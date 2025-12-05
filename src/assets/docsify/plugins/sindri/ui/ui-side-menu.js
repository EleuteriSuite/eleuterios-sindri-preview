// Sindri Docsify plugin: ui:side-menu
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:side-menu
title: "Project"
items:
  - title: "Overview"
    href: "#"
    active: true
  - title: "Settings"
    href: "#"
  - title: "Teams"
    href: "#"
```
 */

(function () {
  function renderSideMenu(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-5xl p-6 grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]';
    const asideCls = 'rounded-xl border bg-white p-4 shadow-sm';
    const headingCls = 'px-2 pb-2 text-sm font-semibold text-gray-900';
    const listCls = 'space-y-1';
    const linkBase = 'block rounded-md px-3 py-2 text-sm font-medium transition-colors';
    const linkInactive = 'text-gray-700 hover:bg-gray-50 hover:text-gray-900';
    const linkActive = 'bg-indigo-600 text-white hover:bg-indigo-600';
    const contentPlaceholderCls = 'rounded-xl border bg-card p-6 text-sm text-muted-foreground shadow-sm';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'side-menu' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'side-menu-container' }) : '';

    const heading = cfg?.title || cfg?.label || '';
    const items = Array.isArray(cfg?.items) ? cfg.items : [];

    const itemsHtml = items.map((it) => {
      const href = it?.href || '#';
      const title = it?.title || it?.label || '';
      const active = !!it?.active;
      const extra = it?.htmltag?.class || '';
      const aAttr = C.attrsToString ? C.attrsToString({
        href,
        class: [linkBase, active ? linkActive : linkInactive, extra].filter(Boolean).join(' '),
        'aria-current': active ? 'page' : undefined,
      }) : '';
      return `<li><a ${aAttr}>${title}</a></li>`;
    }).join('');

    const headingHtml = heading ? `<div class="${headingCls}">${heading}</div>` : '';
    const asideHtml = `<aside class="${asideCls}">${headingHtml}<ul class="${listCls}">${itemsHtml}</ul></aside>`;

    // Simple placeholder for content area so layout mirrors reference side-menu layout within Docsify
    const contentHtml = cfg?.content ? String(cfg.content) : 'Contenido del ejemplo (columna principal)';
    const mainHtml = `<div class="${contentPlaceholderCls}">${contentHtml}</div>`;

    const html = `<section ${sectionAttr}><div ${containerAttr}>${asideHtml}${mainHtml}</div></section>`;
    return `<div class="sindri-ui sindri-ui-side-menu">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:side-menu': renderSideMenu,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
