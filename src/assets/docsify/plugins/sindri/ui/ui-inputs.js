// Sindri Docsify plugin: ui:inputs
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:inputs
items:
  - title: "Email"
    type: "email"
    placeholder: "tu@correo.com"
    description: "Nunca compartiremos tu correo."
  - title: "Nombre"
    type: "text"
    placeholder: "Tu nombre"
htmltag:
  styles:
    - background: "linear-gradient(180deg, #fff, #f8fafc)"
```
 */

(function () {
  function renderInputs(cfg) {
    const C = window.SindriCore || {};

    // Clases base inspiradas en ai_helpers/components/ui/inputs/1.html
    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-sm p-6';
    const itemLabelSpanCls = 'text-sm font-medium text-gray-700';
    const inputBaseCls = 'mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';

    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'inputs' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'inputs-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it, idx) => {
      const labelText = it?.title || it?.label || 'Label';
      const inputId = it?.id || `sindri-input-${idx}`;
      const type = (it?.type || 'text').toLowerCase();
      const placeholder = it?.placeholder != null ? String(it.placeholder) : '';
      const value = it?.value != null ? String(it.value) : undefined;
      const inputExtraCls = it?.htmltag?.class || '';
      const inputCls = [inputBaseCls, inputExtraCls].filter(Boolean).join(' ');
      const inputAttrs = {
        type,
        id: inputId,
        class: inputCls,
        placeholder: placeholder || undefined,
        value,
        name: it?.name || undefined,
        min: it?.min != null ? String(it.min) : undefined,
        max: it?.max != null ? String(it.max) : undefined,
        step: it?.step != null ? String(it.step) : undefined,
      };
      const inputAttrStr = C.attrsToString ? C.attrsToString(inputAttrs) : '';
      const help = it?.description ? `<p class="mt-1 text-xs text-muted-foreground">${it.description}</p>` : '';
      return `<label for="${inputId}" class="block">`+
             `<span class="${itemLabelSpanCls}"> ${labelText} </span>`+
             `<input ${inputAttrStr} />${help}`+
             `</label>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${itemsHtml}</div></section>`;
    return `<div class="sindri-ui sindri-ui-inputs">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:inputs': renderInputs,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
