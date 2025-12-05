// Sindri Docsify plugin: ui:breadcrumbs
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:breadcrumbs
items:
  - title: "Home"
    href: "#"
  - title: "Category"
    href: "#"
  - title: "Product"
    href: "#"
```
 */

(function () {
  function renderBreadcrumbs(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'flex justify-center p-6';
    const navAttr = C.attrsToString ? C.attrsToString({ 'aria-label': 'Breadcrumb' }) : 'aria-label="Breadcrumb"';
    const listCls = 'flex items-center gap-1 text-sm text-gray-700';
    const linkCls = 'block transition-colors hover:text-gray-900';
    const chevronSvg = (
      '<svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 20 20" fill="currentColor">'
      + '<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />'
      + '</svg>'
    );

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'breadcrumbs' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'breadcrumbs-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const parts = [];
    items.forEach((it, idx) => {
      const title = it?.title || it?.label || '';
      const href = it?.href || '#';
      const extraCls = it?.htmltag?.class || '';
      const aAttr = C.attrsToString ? C.attrsToString({ href, class: [linkCls, extraCls].filter(Boolean).join(' ') }) : '';
      parts.push(`<li><a ${aAttr}>${title}</a></li>`);
      if (idx < items.length - 1) {
        parts.push(`<li class="rtl:rotate-180">${chevronSvg}</li>`);
      }
    });

    const html = `<section ${sectionAttr}><div ${containerAttr}><nav ${navAttr}><ol class="${listCls}">${parts.join('')}</ol></nav></div></section>`;
    return `<div class="sindri-ui sindri-ui-breadcrumbs">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:breadcrumbs': renderBreadcrumbs,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
