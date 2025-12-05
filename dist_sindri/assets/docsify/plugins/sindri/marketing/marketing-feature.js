// Sindri Docsify plugin: marketing:feature
// Depende de window.SindriCore (core.js) y opcionalmente de window.__SindriUtilsUi

/*
```sindri:marketing:feature
items:
  - title: "Sin comisión"
    description: "Sin tarifas ocultas ni sorpresas."
  - title: "Rápido de implementar"
    description: "Plantillas listas y componentes reutilizables."
  - title: "Escalable"
    description: "Añade más bloques y páginas según creces."
htmltag:
  styles:
    - background: "linear-gradient(180deg, #fff, #f8fafc)"
```
 */

(function () {
    function renderFeature(cfg) {
        const C = window.SindriCore || {};

        // 1) Clases Tailwind base
        const sectionCls = 'py-16 bg-background';
        const containerCls = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
        const gridCls = 'grid grid-cols-1 gap-8 md:grid-cols-3';
        const itemCls = 'rounded-xl border p-6 shadow-sm bg-card text-card-foreground';
        const titleCls = 'text-lg font-semibold';
        const descCls = 'mt-2 text-sm text-muted-foreground';

        // 2) Estilos inline opcionales
        const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';

        // 3) Atributos serializados
        const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'feature' }) : '';
        const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'feature-container' }) : '';
        const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'feature-grid' }) : '';

        // 4) Items desde cfg.items (array de { title, description, class?, htmltag? })
        const items = Array.isArray(cfg?.items) ? cfg.items : [];
        const itemsHtml = items.map((it) => {
            const itemAttr = C.attrsToString ? C.attrsToString({ class: [itemCls, it?.htmltag?.class].filter(Boolean).join(' ') }) : '';
            const t = it?.title ? `<h3 class="${titleCls}">${it.title}</h3>` : '';
            const d = it?.description ? `<p class="${descCls}">${it.description}</p>` : '';
            return `<div ${itemAttr}>${t}${d}</div>`;
        }).join('');

        // 5) Ensamblado final
        const html = `<section ${sectionAttr}><div ${containerAttr}><div ${gridAttr}>${itemsHtml}</div></div></section>`;
        return `<div class="sindri-marketing sindri-marketing-feature">${html}</div>`;
    }

    function install(hook) {
        hook.beforeEach(function (md) {
            const C = window.SindriCore;
            if (!C || !C.replaceSindriBlocks) return md;
            return C.replaceSindriBlocks(md, {
                'marketing:feature': renderFeature,
            });
        });
    }

    window.$docsify = window.$docsify || {};
    $docsify.plugins = [install, ...($docsify.plugins || [])];
})();