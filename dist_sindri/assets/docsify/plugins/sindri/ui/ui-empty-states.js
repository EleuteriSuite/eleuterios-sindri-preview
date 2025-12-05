// Sindri Docsify plugin: ui:empty-states

/*
```sindri:ui:empty-states
title: "No items found"
description: "Get started by creating your first item. It only takes a few seconds."
action:
  title: "Create Item"
  href: "#"
links:
  - title: "Learn how"
    href: "#"
  - title: "view examples"
    href: "#"
```
 */

(function () {
    function renderEmptyState(cfg) {
        const C = window.SindriCore || {};

        // 1) Clases Tailwind base
        const containerCls = 'flex items-center justify-center p-6';
        const innerCls = 'max-w-md text-center';
        const iconCls = 'mx-auto size-20 text-gray-400';
        const titleCls = 'mt-6 text-2xl font-bold text-gray-900';
        const descCls = 'mt-4 text-pretty text-gray-700';
        const btnCls = 'mt-6 block w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700';
        const footerCls = 'mt-6 text-sm text-gray-700';
        const linkCls = 'underline hover:text-gray-900';

        // 2) Estilos inline opcionales
        const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';

        // 3) Atributos serializados
        const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, style: stylesInline || undefined, 'data-slot': 'empty-state' }) : '';

        // 4) Contenido
        const title = cfg?.title || 'No items found';
        const description = cfg?.description || 'Get started by creating your first item.';

        // Icon (Default SVG)
        const iconSvg = cfg?.icon || `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${iconCls}">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    `;

        // Action Button
        let actionHtml = '';
        if (cfg?.action) {
            const actionTitle = cfg.action.title || 'Create Item';
            const actionHref = cfg.action.href || '#';
            // If it's a button type
            if (cfg.action.type === 'button') {
                actionHtml = `<button type="button" class="${btnCls}">${actionTitle}</button>`;
            } else {
                actionHtml = `<a href="${actionHref}" class="${btnCls}">${actionTitle}</a>`;
            }
        }

        // Footer Links (optional)
        let footerHtml = '';
        if (cfg?.links && Array.isArray(cfg.links)) {
            const linksHtml = cfg.links.map(l => `<a href="${l.href || '#'}" class="${linkCls}">${l.title}</a>`).join(' or ');
            footerHtml = `<p class="${footerCls}">${linksHtml}</p>`;
        }

        // 5) Ensamblado final
        return `<div class="sindri-ui sindri-ui-empty-states"><div ${containerAttr}><div class="${innerCls}">${iconSvg}<h2 class="${titleCls}">${title}</h2><p class="${descCls}">${description}</p>${actionHtml}${footerHtml}</div></div></div>`;
    }

    function install(hook) {
        hook.beforeEach(function (md) {
            const C = window.SindriCore;
            if (!C || !C.replaceSindriBlocks) return md;
            return C.replaceSindriBlocks(md, {
                'ui:empty-states': renderEmptyState,
            });
        });
    }

    window.$docsify = window.$docsify || {};
    $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
