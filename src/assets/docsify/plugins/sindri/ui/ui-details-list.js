// Sindri Docsify plugin: ui:details-list

/*
```sindri:ui:details-list
items:
  - title: "Title"
    description: "Mr"
  - title: "Name"
    description: "John Frusciante"
  - title: "Occupation"
    description: "Guitarist"
  - title: "Salary"
    description: "$1,000,000+"
  - title: "Bio"
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit..."
```
 */

(function () {
    function renderDetailsList(cfg) {
        const C = window.SindriCore || {};

        // 1) Clases Tailwind base
        const wrapperCls = 'flow-root';
        const listCls = '-my-3 divide-y divide-gray-200 text-sm';
        const itemCls = 'grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4';
        const dtCls = 'font-medium text-gray-900';
        const ddCls = 'text-gray-700 sm:col-span-2';

        // 2) Estilos inline opcionales
        const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';

        // 3) Atributos serializados
        const wrapperAttr = C.attrsToString ? C.attrsToString({ class: wrapperCls, style: stylesInline || undefined, 'data-slot': 'details-list-wrapper' }) : '';
        const listAttr = C.attrsToString ? C.attrsToString({ class: listCls, 'data-slot': 'details-list' }) : '';

        // 4) Items
        const items = Array.isArray(cfg?.items) ? cfg.items : [];
        const itemsHtml = items.map((it) => {
            const itemAttr = C.attrsToString ? C.attrsToString({ class: itemCls }) : '';
            const title = it?.title ? `<dt class="${dtCls}">${it.title}</dt>` : '';
            const description = it?.description ? `<dd class="${ddCls}">${it.description}</dd>` : '';

            return `<div ${itemAttr}>${title}${description}</div>`;
        }).join('');

        // 5) Ensamblado final
        return `<div class="sindri-ui sindri-ui-details-list"><div ${wrapperAttr}><dl ${listAttr}>${itemsHtml}</dl></div></div>`;
    }

    function install(hook) {
        hook.beforeEach(function (md) {
            const C = window.SindriCore;
            if (!C || !C.replaceSindriBlocks) return md;
            return C.replaceSindriBlocks(md, {
                'ui:details-list': renderDetailsList,
            });
        });
    }

    window.$docsify = window.$docsify || {};
    $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
