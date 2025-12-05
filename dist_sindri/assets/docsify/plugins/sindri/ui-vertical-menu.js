// Sindri Docsify plugin: ui:vertical-menu
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:vertical-menu
title: "Settings"
items:
  - title: "Profile"
    href: "#"
  - title: "Billing"
    href: "#"
    active: true
  - title: "Security"
    href: "#"
```
 */

(function () {
  function renderVerticalMenu(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-xs p-6';
    const navCls = 'rounded-xl border bg-white p-3 shadow-sm';
    const headingCls = 'px-1 pb-2 text-sm font-semibold text-gray-900';
    const listCls = 'space-y-1';
    const itemBase = 'block rounded-md px-3 py-2 text-sm font-medium transition-colors';
    const itemInactive = 'text-gray-700 hover:bg-gray-50 hover:text-gray-900';
    const itemActive = 'bg-indigo-600 text-white hover:bg-indigo-600';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'vertical-menu' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'vertical-menu-container' }) : '';

    const heading = cfg?.title || cfg?.label || '';
    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map(it => {
      const href = it?.href || '#';
      const title = it?.title || it?.label || '';
      const active = !!it?.active;
      const extra = it?.htmltag?.class || '';
      const aAttr = C.attrsToString ? C.attrsToString({
        href,
        class: [itemBase, active ? itemActive : itemInactive, extra].filter(Boolean).join(' '),
        'aria-current': active ? 'page' : undefined,
      }) : '';
      return `<li><a ${aAttr}>${title}</a></li>`;
    }).join('');

    const headHtml = heading ? `<div class="${headingCls}">${heading}</div>` : '';
    const navHtml = `<nav class="${navCls}">${headHtml}<ul class="${listCls}">${itemsHtml}</ul></nav>`;
    const html = `<section ${sectionAttr}><div ${containerAttr}>${navHtml}</div></section>`;
    return `<div class="sindri-ui sindri-ui-vertical-menu">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:vertical-menu': renderVerticalMenu,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
