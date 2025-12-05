// Sindri Docsify plugin: ui:toggles
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:toggles
items:
  - id: "AcceptConditions"
  - id: "Newsletter"
    checked: true
```
 */

(function () {
  function renderToggles(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'flex flex-wrap gap-6 justify-center p-6';
    const labelBaseCls = 'relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:transparent] has-checked:bg-green-500';
    const inputCls = 'peer sr-only';
    const knobCls = 'absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'toggles' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'toggles-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [{}];
    const itemsHtml = items.map((it, idx) => {
      const id = it?.id || `sindri-toggle-${idx}`;
      const name = it?.name || undefined;
      const checked = it?.checked ? true : undefined;
      const extraLabel = it?.htmltag?.class || '';
      const labelAttr = C.attrsToString ? C.attrsToString({
        for: id,
        class: [labelBaseCls, extraLabel].filter(Boolean).join(' '),
      }) : '';
      const inputAttr = C.attrsToString ? C.attrsToString({
        type: 'checkbox', id, name, class: inputCls, checked,
      }) : '';
      return `<label ${labelAttr}><input ${inputAttr} /><span class="${knobCls}"></span></label>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${itemsHtml}</div></section>`;
    return `<div class="sindri-ui sindri-ui-toggles">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:toggles': renderToggles,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
