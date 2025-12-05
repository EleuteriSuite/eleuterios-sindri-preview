// Sindri Docsify plugin: ui:quantity-inputs
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:quantity-inputs
items:
  - title: "Cantidad"
    value: 2
    min: 1
    max: 10
  - title: "Unidades"
    value: 1
    min: 0
    max: 99
htmltag:
  styles:
    - background: "linear-gradient(180deg, #ffffff, #f1f5f9)"
```
 */

(function () {
  function renderQuantityInputs(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'flex justify-center p-6';
    const wrapperCls = '';
    const groupCls = 'flex items-center gap-1';
    const btnCls = 'size-10 leading-10 text-gray-600 transition hover:opacity-75';
    const inputCls = 'h-10 w-24 rounded-sm border-gray-200 sm:text-sm text-center';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'quantity-inputs' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'quantity-inputs-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [{}];
    const itemsHtml = items.map((it, idx) => {
      const id = it?.id || `sindri-qty-${idx}`;
      const value = it?.value != null ? String(it.value) : '1';
      const min = it?.min != null ? String(it.min) : undefined;
      const max = it?.max != null ? String(it.max) : undefined;
      const step = it?.step != null ? String(it.step) : undefined;
      const inputExtraCls = it?.htmltag?.class || '';
      const inputAttrStr = C.attrsToString ? C.attrsToString({
        type: 'number',
        id,
        value,
        class: [inputCls, inputExtraCls].filter(Boolean).join(' '),
        min,
        max,
        step,
      }) : '';

      const labelHtml = it?.title ? `<label for="${id}" class="sr-only"> ${it.title} </label>` : '';
      return `<div class="${wrapperCls}">`+
             `${labelHtml}`+
             `<div class="${groupCls}">`+
             `<button type="button" class="${btnCls}" aria-label="Decrease">&minus;</button>`+
             `<input ${inputAttrStr} />`+
             `<button type="button" class="${btnCls}" aria-label="Increase">&plus;</button>`+
             `</div>`+
             `</div>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${itemsHtml}</div></section>`;
    return `<div class="sindri-ui sindri-ui-quantity-inputs">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:quantity-inputs': renderQuantityInputs,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
