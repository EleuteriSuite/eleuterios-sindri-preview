// Sindri Docsify plugin: ui:accordions
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:accordions
items:
  - title: "What are the basic features?"
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique..."
    open: true
  - title: "How do I get started?"
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
  - title: "What support options are available?"
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
```
 */

(function () {
  function renderAccordions(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-3xl p-6';
    const listCls = 'space-y-2';
    const detailsCls = 'group [&_summary::-webkit-details-marker]:hidden';
    const summaryCls = 'flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50';
    const iconSvg = (
      '<svg class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">'
      + '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />'
      + '</svg>'
    );
    const contentCls = 'p-4';
    const paragraphCls = 'text-gray-700';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'accordions' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'accordions-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it, idx) => {
      const title = it?.title || it?.label || `Item ${idx+1}`;
      const description = it?.description || it?.content || '';
      const open = it?.open ? true : undefined;
      const extraCls = it?.htmltag?.class || '';
      const detailsAttr = C.attrsToString ? C.attrsToString({ class: [detailsCls, extraCls].filter(Boolean).join(' '), open }) : '';
      const contentHtml = description ? `<div class="${contentCls}"><p class="${paragraphCls}">${description}</p></div>` : '';
      return `<details ${detailsAttr}><summary class="${summaryCls}"><span>${title}</span>${iconSvg}</summary>${contentHtml}</details>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}><div class="${listCls}">${itemsHtml}</div></div></section>`;
    return `<div class="sindri-ui sindri-ui-accordions">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:accordions': renderAccordions,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
