// Sindri Docsify plugin: ui:radio-groups
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:radio-groups
legend: "Delivery"
name: "DeliveryOption"
items:
  - id: "DeliveryStandard"
    title: "Standard"
    right: "Free"
    value: "DeliveryStandard"
    checked: true
  - id: "DeliveryPriority"
    title: "Next Day"
    right: "£9.99"
    value: "DeliveryPriority"
```
 */

(function () {
  function renderRadioGroups(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-lg p-6';
    const fieldsetCls = 'space-y-3';
    const legend = cfg?.legend || 'Options';
    const cardLabelCls = 'flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600';
    const titleCls = 'text-gray-700';
    const rightCls = 'text-gray-900';
    const inputCls = 'sr-only';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'radio-groups' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'radio-groups-container' }) : '';

    const name = cfg?.name || 'RadioOption';
    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it, idx) => {
      const id = it?.id || `${name}-${idx+1}`;
      const value = it?.value != null ? String(it.value) : id;
      const checked = it?.checked ? true : undefined;
      const left = it?.title || it?.label || `Option ${idx+1}`;
      const right = it?.secondary || it?.right || '';
      const extraCls = it?.htmltag?.class || '';

      const inputAttr = C.attrsToString ? C.attrsToString({
        type: 'radio', name, value, id, class: inputCls, checked,
      }) : '';

      const labelAttr = C.attrsToString ? C.attrsToString({
        for: id,
        class: [cardLabelCls, extraCls].filter(Boolean).join(' '),
      }) : '';

      const leftHtml = `<p class="${titleCls}">${left}</p>`;
      const rightHtml = right ? `<p class="${rightCls}">${right}</p>` : '';
      return `<div><label ${labelAttr}>${leftHtml}${rightHtml}<input ${inputAttr} /></label></div>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}><fieldset class="${fieldsetCls}"><legend class="sr-only">${legend}</legend>${itemsHtml}</fieldset></div></section>`;
    return `<div class="sindri-ui sindri-ui-radio-groups">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:radio-groups': renderRadioGroups,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
