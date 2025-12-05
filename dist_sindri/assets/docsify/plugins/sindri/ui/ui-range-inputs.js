// Sindri Docsify plugin: ui:range-inputs
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:range-inputs
items:
  - title: "Max Volume"
    id: "maxVolume"
    min: 0
    max: 100
    value: 20
htmltag:
  styles:
    - background: "linear-gradient(180deg, #fff, #f8fafc)"
```
 */

(function () {
  function renderRangeInputs(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-sm p-6';
    const labelSpanCls = 'block text-sm font-medium text-gray-900';
    const inputBaseCls = 'mt-3 h-3.5 w-full appearance-none rounded-full bg-gray-300 [&::-webkit-slider-thumb]:size-7 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-gray-500 [&::-webkit-slider-thumb]:bg-gray-200';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'range-inputs' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'range-inputs-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [{}];
    const itemsHtml = items.map((it, idx) => {
      const id = it?.id || `sindri-range-${idx}`;
      const title = it?.title || it?.label || '';
      const min = it?.min != null ? String(it.min) : '0';
      const max = it?.max != null ? String(it.max) : '100';
      const step = it?.step != null ? String(it.step) : undefined;
      const value = it?.value != null ? String(it.value) : String(Math.floor((Number(min) + Number(max)) / 2) || 50);
      const name = it?.name || undefined;
      const extraCls = it?.htmltag?.class || '';
      const inputAttr = C.attrsToString ? C.attrsToString({
        type: 'range',
        id,
        name,
        min,
        max,
        value,
        step,
        class: [inputBaseCls, extraCls].filter(Boolean).join(' '),
      }) : '';

      const labelOpen = `<label for="${id}">`;
      const span = title ? `<span class="${labelSpanCls}">${title}</span>` : '';
      const input = `<input ${inputAttr} />`;
      return `${labelOpen}${span}${input}</label>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${itemsHtml}</div></section>`;
    return `<div class="sindri-ui sindri-ui-range-inputs">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:range-inputs': renderRangeInputs,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
