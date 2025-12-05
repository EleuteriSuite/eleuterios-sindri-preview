// Sindri Docsify plugin: ui:modals
// Component under construction.
/*
```sindri:ui:modals
title: "Delete project"
description: "This action cannot be undone. Are you sure you want to permanently delete this project?"
actions:
  - description: "Cancel"
    variant: "outline"
  - description: "Add"
    variant: "primary"
```
 */
// Depende de window.SindriCore (core.js) y opcionalmente de window.__SindriUtilsUi
(function () {
  function renderActions(actions) {
    const U = window.__SindriUtilsUi || {};
    const renderButton = U.renderButton || null;
    if (!Array.isArray(actions) || actions.length === 0) return '';
    if (typeof renderButton !== 'function') {
      // Fallback simple si no hay utilidades de botón
      return actions.map((a) => {
        const label = a?.description || a?.title || 'Action';
        return `<button type="button" class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-white">${label}</button>`;
      }).join('');
    }
    return actions.map((a) => renderButton(a)).join('');
  }

  function renderModals(cfg) {
    const C = window.SindriCore || {};

    // Estilos/Clases base para un modal centrado
    const sectionCls = 'py-8';
    const overlayCls = 'fixed inset-0 z-40 bg-black/50' + ' hidden'; // Hidden added. TODO enable component
    const containerWrapCls = 'fixed inset-0 z-50 flex items-center justify-center p-6';
    const panelCls = 'w-full max-w-lg rounded-xl border border-primary bg-white p-6 text-card-foreground shadow-xl';
    const titleCls = 'text-lg font-semibold';
    const descCls = 'mt-2 text-sm text-muted-foreground';
    const footerCls = 'mt-6 flex flex-wrap items-center justify-end gap-3';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'modals' }) : '';

    // Permitimos múltiples modales si llegan en items, si no, uno a partir del cfg raíz
    const items = Array.isArray(cfg?.items) && cfg.items.length ? cfg.items : [cfg || {}];

    const modalsHtml = items.map((it) => {
      const title = it?.title || it?.label || '';
      const description = it?.description || it?.content || '';
      const actionsHtml = renderActions(it?.actions);

      const panelAttr = C.attrsToString ? C.attrsToString({ class: [panelCls, it?.htmltag?.class].filter(Boolean).join(' ') }) : '';
      const tHtml = title ? `<h3 class="${titleCls}">${title}</h3>` : '';
      const dHtml = description ? `<p class="${descCls}">${description}</p>` : '';
      const fHtml = actionsHtml ? `<div class="${footerCls}">${actionsHtml}</div>` : '';

      // Nota: en Docsify render estático, mostramos overlay/panel directamente
      return [
        `<div class="${overlayCls}" aria-hidden="true"></div>`,
        `<div class="${containerWrapCls}" role="dialog" aria-modal="true">` +
          `<div ${panelAttr}>${tHtml}${dHtml}${fHtml}</div>`+
        `</div>`
      ].join('');
    }).join('');

    const html = `<section ${sectionAttr}>${modalsHtml}</section>`;
    return `<div class="sindri-ui sindri-ui-modals">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:modals': renderModals,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
