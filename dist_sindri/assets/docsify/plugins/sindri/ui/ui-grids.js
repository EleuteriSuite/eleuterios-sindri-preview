// Sindri Docsify plugin: ui:grids

/*
```sindri:ui:grids
cols: 4
gap: 4
items:
  - content: "Item 1"
  - content: "Item 2"
  - content: "Item 3"
  - content: "Item 4"
  - content: "Item 5"
```
 */

(function () {
    function renderGrid(cfg) {
        const C = window.SindriCore || {};

        // 1) Clases Tailwind base
        // Default: grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8
        const cols = cfg?.cols || 2;
        const gap = cfg?.gap || 4;

        // Construct grid classes dynamically or use safe list?
        // Tailwind needs full class names to scan.
        // We can map numbers to classes.
        const colsMap = {
            1: 'grid-cols-1',
            2: 'grid-cols-1 lg:grid-cols-2',
            3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        };
        const gapMap = {
            4: 'gap-4',
            8: 'gap-8',
        };

        const gridClsBase = 'grid';
        const colsCls = colsMap[cols] || colsMap[2];
        const gapCls = gapMap[gap] || `gap-${gap}`; // Fallback might not work if not in safelist, but 'gap-4' and 'gap-8' are standard.

        const containerCls = `${gridClsBase} ${colsCls} ${gapCls}`;

        // 2) Estilos inline opcionales
        const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';

        // 3) Atributos serializados
        const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, style: stylesInline || undefined, 'data-slot': 'grid' }) : '';

        // 4) Items
        // Items can be simple content strings or HTML.
        const items = Array.isArray(cfg?.items) ? cfg.items : [];
        const itemsHtml = items.map((it) => {
            const content = it?.content || it?.description || '';
            // If content is empty, maybe render a placeholder like in the example
            if (!content) {
                return `<div class="h-32 rounded bg-gray-300"></div>`;
            }
            return `<div>${content}</div>`;
        }).join('');

        // 5) Ensamblado final
        return `<div class="sindri-ui sindri-ui-grids p-6"><div ${containerAttr}>${itemsHtml}</div></div>`;
    }

    function install(hook) {
        hook.beforeEach(function (md) {
            const C = window.SindriCore;
            if (!C || !C.replaceSindriBlocks) return md;
            return C.replaceSindriBlocks(md, {
                'ui:grids': renderGrid,
            });
        });
    }

    window.$docsify = window.$docsify || {};
    $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
