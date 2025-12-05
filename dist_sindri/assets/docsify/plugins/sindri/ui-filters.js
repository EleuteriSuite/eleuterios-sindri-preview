// Sindri Docsify plugin: ui:filters

/*
```sindri:ui:filters
items:
  - title: "Color"
    type: "checkbox"
    options:
      - title: "Red"
        checked: false
      - title: "Blue"
        checked: true
      - title: "Green"
        checked: true
  - title: "Size"
    type: "radio"
    options:
      - title: "M"
        checked: false
      - title: "L"
        checked: true
      - title: "XL"
        checked: false
  - title: "Price"
    type: "range"
    min: 5
    max: 2000
```
 */

(function () {
    function renderFilters(cfg) {
        const C = window.SindriCore || {};

        // 1) Clases Tailwind base
        const containerCls = 'flex gap-4 sm:gap-6 p-6'; // Added p-6 for spacing in preview

        // Details/Summary classes
        const detailsCls = 'group relative';
        const summaryCls = 'flex cursor-pointer items-center gap-2 border-b border-gray-300 pb-1 text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 [&::-webkit-details-marker]:hidden';
        const summaryTextCls = 'text-sm font-medium';
        const iconWrapperCls = 'transition-transform group-open:-rotate-180';
        const iconSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    `;

        // Dropdown content classes
        const dropdownCls = 'z-10 w-64 divide-y divide-gray-300 rounded border border-gray-300 bg-white shadow-sm group-open:absolute group-open:start-0 group-open:top-8';
        const headerCls = 'flex items-center justify-between px-3 py-2';
        const headerTextCls = 'text-sm text-gray-700';
        const resetBtnCls = 'text-sm text-gray-700 underline transition-colors hover:text-gray-900';

        // Checkbox list classes
        const fieldsetCls = 'p-3';
        const checkboxListCls = 'flex flex-col items-start gap-3';
        const labelCls = 'inline-flex items-center gap-3';
        const checkboxInputCls = 'size-5 rounded border-gray-300 shadow-sm';
        const checkboxTextCls = 'text-sm font-medium text-gray-700';

        // Range inputs classes
        const rangeContainerCls = 'flex items-center gap-3 p-3';
        const rangeLabelCls = '';
        const rangeTextCls = 'text-sm text-gray-700';
        const rangeInputCls = 'mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm';

        // 2) Estilos inline opcionales
        const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';

        // 3) Atributos serializados
        const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, style: stylesInline || undefined, 'data-slot': 'filters' }) : '';

        // 4) Items iteration
        const items = Array.isArray(cfg?.items) ? cfg.items : [];

        const itemsHtml = items.map((it, idx) => {
            const title = it?.title || 'Filter';
            const type = it?.type || 'checkbox'; // checkbox | range
            const headerText = it?.headerText || (type === 'checkbox' ? '0 Selected' : 'Range');

            let contentHtml = '';

            if (type === 'checkbox' || type === 'radio') {
                const options = Array.isArray(it?.options) ? it.options : [];
                const optionsHtml = options.map((opt, optIdx) => {
                    const optId = `Filter-${idx}-Opt-${optIdx}`;
                    return `<label for="${optId}" class="${labelCls}"><input type="${type}" class="${checkboxInputCls}" id="${optId}" ${opt.checked && opt.checked !== 'false' ? 'checked' : ''} ${type === 'radio' ? 'name="filter-' + idx + '"' : ''} /><span class="${checkboxTextCls}"> ${opt.title || opt.label} </span></label>`;
                }).join('');

                contentHtml = `<fieldset class="${fieldsetCls}"><legend class="sr-only">${title}</legend><div class="${checkboxListCls}">${optionsHtml}</div></fieldset>`;
            } else if (type === 'range') {
                const minVal = it?.min ?? 0;
                const maxVal = it?.max ?? 100;
                const minId = `Filter-${idx}-Min`;
                const maxId = `Filter-${idx}-Max`;

                contentHtml = `<div class="${rangeContainerCls}"><label for="${minId}" class="${rangeLabelCls}"><span class="${rangeTextCls}"> Min </span><input type="number" id="${minId}" value="${minVal}" class="${rangeInputCls}" /></label><label for="${maxId}" class="${rangeLabelCls}"><span class="${rangeTextCls}"> Max </span><input type="number" id="${maxId}" value="${maxVal}" class="${rangeInputCls}" /></label></div>`;
            }

            return `<details class="${detailsCls}"><summary class="${summaryCls}"><span class="${summaryTextCls}"> ${title} </span><span class="${iconWrapperCls}"> ${iconSvg} </span></summary><div class="${dropdownCls}"><div class="${headerCls}"><span class="${headerTextCls}"> ${headerText} </span><button type="button" class="${resetBtnCls}"> Reset </button></div>${contentHtml}</div></details>`;
        }).join('');

        // 5) Ensamblado final
        // Added pb-40 to container wrapper to allow space for absolute dropdowns in preview
        return `<div class="sindri-ui sindri-ui-filters pb-40"><div ${containerAttr}>${itemsHtml}</div></div>`;
    }

    function install(hook) {
        hook.beforeEach(function (md) {
            const C = window.SindriCore;
            if (!C || !C.replaceSindriBlocks) return md;
            return C.replaceSindriBlocks(md, {
                'ui:filters': renderFilters,
            });
        });
    }

    window.$docsify = window.$docsify || {};
    $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
