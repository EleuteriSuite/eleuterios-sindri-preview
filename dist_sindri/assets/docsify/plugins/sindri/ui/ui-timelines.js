// Sindri Docsify plugin: ui:timelines
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:timelines
items:
  - time: "2025-01-01"
    title: "Project created"
    description: "Initial repository setup."
  - time: "2025-02-15"
    title: "First release"
    description: "v0.1.0 shipped"
```
 */

(function () {
  function renderTimelines(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-3xl p-6';
    const listCls = 'relative space-y-6';
    const lineCls = 'absolute left-4 top-0 h-full w-px bg-gray-200';
    const itemCls = 'relative pl-12';
    const dotCls = 'absolute left-2 top-1.5 size-4 -translate-x-1/2 rounded-full bg-indigo-600 ring-4 ring-white';
    const timeCls = 'text-xs font-medium text-gray-500';
    const titleCls = 'text-sm font-semibold text-gray-900';
    const descCls = 'text-sm text-muted-foreground';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'timelines' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'timelines-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it) => {
      const time = it?.time || it?.date || '';
      const title = it?.title || it?.label || '';
      const desc = it?.description || it?.content || '';
      const extra = it?.htmltag?.class || '';
      return `
      <li class="${[itemCls, extra].filter(Boolean).join(' ')}">
        <span class="${dotCls}"></span>
        ${time ? `<div class="${timeCls}">${time}</div>` : ''}
        ${title ? `<div class="${titleCls}">${title}</div>` : ''}
        ${desc ? `<div class="${descCls}">${desc}</div>` : ''}
      </li>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}><ol class="${listCls}"><div class="${lineCls}"></div>${itemsHtml}</ol></div></section>`;
    return `<div class="sindri-ui sindri-ui-timelines">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:timelines': renderTimelines,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
