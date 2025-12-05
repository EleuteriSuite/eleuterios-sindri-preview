// Sindri Docsify plugin: ui:button-groups

/*
```sindri:ui:button-groups
items:
  - title: "View"
  - title: "Edit"
  - title: "Delete"
```
 */

(function () {
    function renderButtonGroups(cfg) {
        const C = window.SindriCore || {};

        // 1) Clases Tailwind base
        const containerCls = 'inline-flex';

        // Base button class (common for all)
        const btnBaseCls = 'border border-gray-200 px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-auto disabled:opacity-50';

        // 2) Estilos inline opcionales
        const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';

        // 3) Atributos serializados
        const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, style: stylesInline || undefined, 'data-slot': 'button-group' }) : '';

        // 4) Items
        const items = Array.isArray(cfg?.items) ? cfg.items : [];
        const itemsHtml = items.map((it, index) => {
            let positionCls = '';
            if (index === 0) {
                positionCls = 'rounded-l-sm';
            } else if (index === items.length - 1) {
                positionCls = '-ml-px rounded-r-sm';
            } else {
                positionCls = '-ml-px';
            }

            const itemExtraCls = it?.htmltag?.class || '';
            const itemCls = `${btnBaseCls} ${positionCls} ${itemExtraCls}`;

            const itemAttr = C.attrsToString ? C.attrsToString({ class: itemCls }) : '';
            const content = it?.title || it?.description || '';

            return `<button ${itemAttr}>${content}</button>`;
        }).join('');

        // 5) Ensamblado final
        return `<div class="sindri-ui sindri-ui-button-groups"><div ${containerAttr}>${itemsHtml}</div></div>`;
    }

    function install(hook) {
        hook.beforeEach(function (md) {
            const C = window.SindriCore;
            if (!C || !C.replaceSindriBlocks) return md;
            return C.replaceSindriBlocks(md, {
                'ui:button-groups': renderButtonGroups,
            });
        });
    }

    window.$docsify = window.$docsify || {};
    $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
