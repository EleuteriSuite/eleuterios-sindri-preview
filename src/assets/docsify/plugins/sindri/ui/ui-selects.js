// Sindri Docsify plugin: ui:selects
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:selects
items:
  - id: "Headline"
    title: "Headliner"
    placeholder: "Please select"
    value: "JH"
    options:
      - { value: "JM", title: "John Mayer" }
      - { value: "SRV", title: "Stevie Ray Vaughn" }
      - { value: "JH", title: "Jimi Hendrix" }
      - { value: "BBK", title: "B.B King" }
      - { value: "AK", title: "Albert King" }
      - { value: "BG", title: "Buddy Guy" }
      - { value: "EC", title: "Eric Clapton" }
```
 */

(function () {
  function renderSelects(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-xs p-6';
    const labelSpanCls = 'text-sm font-medium text-gray-700';
    const selectBaseCls = 'mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'selects' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'selects-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [{}];

    const itemsHtml = items.map((it, idx) => {
      const id = it?.id || `sindri-select-${idx}`;
      const name = it?.name || undefined;
      const title = it?.title || it?.label || '';
      const extraCls = it?.htmltag?.class || '';
      const value = it?.value != null ? String(it.value) : undefined;
      const placeholder = it?.placeholder != null ? String(it.placeholder) : undefined;
      const opts = Array.isArray(it?.options) ? it.options : [];

      const selectAttr = C.attrsToString ? C.attrsToString({
        id, name,
        class: [selectBaseCls, extraCls].filter(Boolean).join(' '),
      }) : '';

      const optsHtml = [
        placeholder != null ? `<option value="">${placeholder}</option>` : '',
        ...opts.map(op => {
          const ov = op?.value != null ? String(op.value) : String(op?.title ?? op?.label ?? '');
          const ot = op?.title || op?.label || ov;
          const selected = value != null && value === ov ? ' selected' : '';
          return `<option value="${ov}"${selected}>${ot}</option>`;
        })
      ].join('');

      const span = title ? `<span class="${labelSpanCls}"> ${title} </span>` : '';
      return `<label for="${id}">${span}<select ${selectAttr}>${optsHtml}</select></label>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${itemsHtml}</div></section>`;
    return `<div class="sindri-ui sindri-ui-selects">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:selects': renderSelects,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
