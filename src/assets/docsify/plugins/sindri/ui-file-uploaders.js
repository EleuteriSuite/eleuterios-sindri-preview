// Sindri Docsify plugin: ui:file-uploaders

/*
```sindri:ui:file-uploaders
title: "Upload your file(s)"
multiple: true
```
 */

(function () {
    function renderFileUploader(cfg) {
        const C = window.SindriCore || {};

        // 1) Clases Tailwind base
        const containerCls = 'mx-auto max-w-md p-6';
        const labelCls = 'block rounded border border-gray-300 p-4 text-gray-900 shadow-sm sm:p-6 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors';
        const innerCls = 'flex items-center justify-center gap-4';
        const textCls = 'font-medium';
        const iconCls = 'size-6';

        // 2) Estilos inline opcionales
        const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';

        // 3) Atributos serializados
        const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, style: stylesInline || undefined, 'data-slot': 'file-uploader' }) : '';

        // 4) Contenido
        const title = cfg?.title || 'Upload your file(s)';
        const multiple = cfg?.multiple !== false; // Default true as per example 'multiple' attr
        const inputId = cfg?.id || 'File';

        const iconSvg = cfg?.icon || `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${iconCls}">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
      </svg>
    `;

        // 5) Ensamblado final
        return `<div class="sindri-ui sindri-ui-file-uploaders"><div ${containerAttr}><label for="${inputId}" class="${labelCls}"><div class="${innerCls}"><span class="${textCls}">${title}</span>${iconSvg}</div><input ${multiple ? 'multiple' : ''} type="file" id="${inputId}" class="sr-only" /></label></div></div>`;
    }

    function install(hook) {
        hook.beforeEach(function (md) {
            const C = window.SindriCore;
            if (!C || !C.replaceSindriBlocks) return md;
            return C.replaceSindriBlocks(md, {
                'ui:file-uploaders': renderFileUploader,
            });
        });
    }

    window.$docsify = window.$docsify || {};
    $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
