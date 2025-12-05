// Sindri Docsify plugin: ui:pagination
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:pagination
total: 5
current: 2
hrefBase: "#"
```
 */

(function () {
  function renderPagination(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'flex justify-center p-6';
    const listCls = 'flex justify-center gap-1 text-gray-900';
    const pageLinkCls = 'block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50';
    const pageActiveCls = 'block size-8 rounded border border-indigo-600 bg-indigo-600 text-center text-sm/8 font-medium text-white';
    const arrowLinkCls = 'grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'pagination' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'pagination-container' }) : '';

    // Config
    const total = Math.max(1, Number(cfg?.total || cfg?.pages || 5));
    const current = Math.min(Math.max(1, Number(cfg?.current || 1)), total);
    const hrefBase = cfg?.hrefBase || '#';

    function pageHref(n) {
      if (typeof cfg?.hrefFn === 'function') return cfg.hrefFn(n);
      const sep = hrefBase.includes('?') ? '&' : '?';
      return `${hrefBase}${hrefBase === '#' ? '' : sep + 'page=' + n}`;
    }

    const parts = [];

    // Prev
    const prevHref = pageHref(Math.max(1, current - 1));
    const prevAttr = C.attrsToString ? C.attrsToString({ href: prevHref, class: arrowLinkCls, 'aria-label': 'Previous page' }) : '';
    const prevSvg = '<svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
    parts.push(`<li><a ${prevAttr}>${prevSvg}</a></li>`);

    // Pages
    const pages = Array.from({ length: total }, (_, i) => i + 1);
    pages.forEach(n => {
      if (n === current) {
        parts.push(`<li class="${pageActiveCls}">${n}</li>`);
      } else {
        const attr = C.attrsToString ? C.attrsToString({ href: pageHref(n), class: pageLinkCls }) : '';
        parts.push(`<li><a ${attr}>${n}</a></li>`);
      }
    });

    // Next
    const nextHref = pageHref(Math.min(total, current + 1));
    const nextAttr = C.attrsToString ? C.attrsToString({ href: nextHref, class: arrowLinkCls, 'aria-label': 'Next page' }) : '';
    const nextSvg = '<svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>';
    parts.push(`<li><a ${nextAttr}>${nextSvg}</a></li>`);

    const html = `<section ${sectionAttr}><div ${containerAttr}><ul class="${listCls}">${parts.join('')}</ul></div></section>`;
    return `<div class="sindri-ui sindri-ui-pagination">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:pagination': renderPagination,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
