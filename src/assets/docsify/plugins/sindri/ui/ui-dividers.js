// Sindri Docsify plugin: ui:dividers

/*
```sindri:ui:dividers
title: "Title goes here"
```
 */

(function () {
    function renderDividers(cfg) {
        const C = window.SindriCore || {};

        // 1) Clases Tailwind base
        const containerCls = 'flex items-center';
        const lineCls = 'h-px flex-1 bg-gray-300';
        const textCls = 'shrink-0 px-4 text-gray-900';

        // 2) Estilos inline opcionales
        const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';

        // 3) Atributos serializados
        const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, style: stylesInline || undefined, 'data-slot': 'divider' }) : '';

        // 4) Contenido
        const title = cfg?.title || '';
        const textHtml = title ? `<span class="${textCls}">${title}</span>` : '';

        // 5) Ensamblado final
        return `<div class="sindri-ui sindri-ui-dividers"><span ${containerAttr}><span class="${lineCls}"></span>${textHtml}<span class="${lineCls}"></span></span></div>`;
    }

    function install(hook) {
        hook.beforeEach(function (md) {
            const C = window.SindriCore;
            if (!C || !C.replaceSindriBlocks) return md;
            return C.replaceSindriBlocks(md, {
                'ui:dividers': renderDividers,
            });
        });
    }

    window.$docsify = window.$docsify || {};
    $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
