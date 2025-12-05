// Sindri Docsify plugin: marketing:polls
// Tarjeta de encuesta simple con pregunta, opciones y botón

/*
```sindri:marketing:polls
question: "What's your favorite stack?"
options:
  - id: "stack-react"
    label: "React"
    value: "react"
  - id: "stack-vue"
    label: "Vue"
    value: "vue"
  - id: "stack-svelte"
    label: "Svelte"
    value: "svelte"
action:
  description: "Vote"
  variant: "default"
name: "stack"
```
 */

(function () {
  function renderPolls(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-lg px-4 sm:px-6 lg:px-8';
    const cardCls = 'rounded-xl border bg-card p-6 text-card-foreground shadow-sm';
    const qCls = 'text-lg font-semibold text-gray-900';
    const listCls = 'mt-4 space-y-2';
    const rowCls = 'flex items-center gap-2';
    const labelCls = 'text-sm text-gray-800';
    const actionsCls = 'mt-5';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'polls' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'polls-container' }) : '';

    const question = cfg?.question || cfg?.title || 'Question';
    const name = cfg?.name || 'poll';
    const options = Array.isArray(cfg?.options) ? cfg.options : [];

    const optionsHtml = options.map((op, idx) => {
      const id = op?.id || `${name}-${idx + 1}`;
      const val = op?.value != null ? String(op.value) : id;
      const label = op?.label || op?.title || val;
      return `<label class="${rowCls}"><input type="radio" name="${name}" id="${id}" value="${val}" class="size-4"/> <span class="${labelCls}">${label}</span></label>`;
    }).join('');

    let actionHtml = '';
    const actionCfg = cfg?.action;
    if (actionCfg) {
      try {
        const renderButton = window.__SindriUtilsUi?.renderButton || null;
        if (renderButton) actionHtml = `<div class="${actionsCls}">` + renderButton(actionCfg) + `</div>`;
      } catch (e) { /* ignore */ }
    }

    const html = `<section ${sectionAttr}><div ${containerAttr}><div class="${cardCls}">`+
      `<h3 class="${qCls}">${question}</h3>`+
      `<div class="${listCls}">${optionsHtml}</div>`+
      `${actionHtml}`+
      `</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-polls">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:polls': renderPolls,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
