// Sindri Docsify plugin: ui:skip-links
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:skip-links
items:
  - title: "Skip to content"
    href: "#main"
  - title: "Skip to navigation"
    href: "#nav"
```
 */

(function () {
  function renderSkipLinks(cfg) {
    const C = window.SindriCore || {};

    const wrapCls = 'focus-within:not-sr-only top-2 left-2 z-50 flex flex-col gap-2';
    const linkBase = 'inline-block rounded bg-indigo-600 px-3 py-1 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const wrapAttr = C.attrsToString ? C.attrsToString({ class: wrapCls, style: stylesInline || undefined, 'data-slot': 'skip-links' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const linksHtml = items.map(it => {
      const href = it?.href || '#main';
      const title = it?.title || it?.label || 'Skip';
      const extra = it?.htmltag?.class || '';
      const aAttr = C.attrsToString ? C.attrsToString({ href, class: [linkBase, extra].filter(Boolean).join(' ') }) : '';
      return `<a ${aAttr}>${title}</a>`;
    }).join('');

    const html = `<div ${wrapAttr}>${linksHtml}</div>`;
    return `<div class="sindri-ui sindri-ui-skip-links">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:skip-links': renderSkipLinks,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
