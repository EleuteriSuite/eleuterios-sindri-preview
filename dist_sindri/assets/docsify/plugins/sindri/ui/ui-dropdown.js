// Sindri Docsify plugin: ui:dropdown

/*
```sindri:ui:dropdown
title: "Product"
split: true
open: true
items:
  - title: "Storefront"
    href: "#"
  - title: "Warehouse"
    href: "#"
  - title: "Stock"
    href: "#"
  - title: "Delete"
    type: "button"
    variant: "danger"
```
 */

(function () {
    function renderDropdown(cfg) {
        const C = window.SindriCore || {};

        // 1) Clases Tailwind base
        const containerCls = 'relative inline-flex';
        const splitWrapperCls = 'inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm';
        const mainBtnCls = 'px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative';
        const triggerBtnCls = 'px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative';

        // Menu classes
        // Note: 'group-focus-within:block' or similar could be used for CSS-only interaction, 
        // but for now we'll just render the structure. 
        // We'll add 'hidden' by default unless 'open: true' is set, to avoid cluttering the preview.
        // But wait, if it's hidden, the user can't see it. 
        // For preview purposes, maybe we want it visible or hoverable.
        // The example HTML doesn't have 'hidden', so it would be always visible if we just copy it.
        // But it is 'absolute', so it floats.
        const menuCls = 'absolute top-9 z-10 overflow-hidden rounded border border-gray-300 bg-white shadow-sm';

        const menuItemCls = 'block px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-50 hover:text-primary';
        const menuDangerItemCls = 'block w-full px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 ltr:text-left rtl:text-right';

        // 2) Estilos inline opcionales
        const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';

        // 3) Atributos serializados
        const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, style: stylesInline || undefined, 'data-slot': 'dropdown' }) : '';

        // 4) Contenido
        const title = cfg?.title || 'Menu';
        const isSplit = cfg?.split !== false; // Default to split as per example? Or maybe optional. Example is split.

        // Trigger Button(s)
        let triggerHtml = '';
        const chevronSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>`;

        if (isSplit) {
            triggerHtml = `
        <span class="${splitWrapperCls}">
            <button type="button" class="${mainBtnCls}">
                ${title}
            </button>
            <button type="button" class="${triggerBtnCls}" aria-label="Menu">
                ${chevronSvg}
            </button>
        </span>
        `;
        } else {
            // Single button implementation (not in example but good to have)
            triggerHtml = `
        <button type="button" class="${mainBtnCls} inline-flex items-center gap-2 rounded border border-gray-300 bg-white">
            ${title} ${chevronSvg}
        </button>
        `;
        }

        // Menu Items
        const items = Array.isArray(cfg?.items) ? cfg.items : [];
        const itemsHtml = items.map((it) => {
            const isDanger = it?.variant === 'danger' || it?.style === 'danger';
            const cls = isDanger ? menuDangerItemCls : menuItemCls;
            const label = it?.title || it?.label || '';
            const href = it?.href || '#';
            const type = it?.type || 'a'; // 'a' or 'button'

            if (type === 'button') {
                return `<button type="button" class="${cls}">${label}</button>`;
            } else {
                return `<a href="${href}" class="${cls}" role="menuitem">${label}</a>`;
            }
        }).join('');

        const isOpen = cfg?.open === true;
        // If not open, we hide it. But to make it interactive with CSS, we might need a 'group' on container and 'group-hover:block' on menu.
        // Let's add 'hidden' if not open, and 'block' if open.
        // Also add 'group-hover:block' to container?
        // For now, let's just respect 'open' config.
        const visibilityCls = isOpen ? 'block' : 'hidden group-hover:block';

        // Note: Added 'group' to container for hover effect
        const finalContainerCls = `${containerCls} group`;
        const finalContainerAttr = C.attrsToString ? C.attrsToString({ class: finalContainerCls, style: stylesInline || undefined, 'data-slot': 'dropdown' }) : '';

        const menuHtml = `<div role="menu" class="${menuCls} ${visibilityCls}">${itemsHtml}</div>`;

        // 5) Ensamblado final
        // Need to ensure the container has space if absolute menu is shown? No, absolute floats.
        // But for the preview, we might want some margin bottom if open.
        return `<div class="sindri-ui sindri-ui-dropdown pb-20"><div ${finalContainerAttr}>${triggerHtml}${menuHtml}</div></div>`;
    }

    function install(hook) {
        hook.beforeEach(function (md) {
            const C = window.SindriCore;
            if (!C || !C.replaceSindriBlocks) return md;
            return C.replaceSindriBlocks(md, {
                'ui:dropdown': renderDropdown,
            });
        });
    }

    window.$docsify = window.$docsify || {};
    $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
