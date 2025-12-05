// Sindri Docsify plugin: ui:tables
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:tables
columns: ["Name", "Title", "Email"]
rows:
  - ["Alice", "Engineer", "alice@example.com"]
  - ["Bob", "Manager", "bob@example.com"]
```
 */

(function () {
  function renderTables(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-5xl p-6';
    const wrapperCls = 'overflow-x-auto rounded-xl border bg-white shadow-sm';
    const tableCls = 'min-w-full divide-y divide-gray-200';
    const theadCls = 'bg-gray-50';
    const thCls = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600';
    const tdCls = 'px-4 py-3 text-sm text-gray-900';
    const trAltCls = 'odd:bg-white even:bg-gray-50';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'tables' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'tables-container' }) : '';

    const columns = JSON.parse(cfg?.columns);
    const rows = Array.isArray(cfg?.rows) ? cfg.rows : [];

    const headHtml = columns.length
      ? `<thead class="${theadCls}"><tr>${columns.map(c => `<th scope="col" class="${thCls}">${c}</th>`).join('')}</tr></thead>`
      : '';

    const bodyRows = rows.map((r) => {
      const cells = JSON.parse(r);
      const cellsHtml = cells.map(v => `<td class="${tdCls}">${v}</td>`).join('');
      return `<tr class="${trAltCls}">${cellsHtml}</tr>`;
    }).join('');

    const tbodyHtml = `<tbody class="divide-y divide-gray-200">${bodyRows}</tbody>`;

    const tableHtml = `<div class="${wrapperCls}"><table class="${tableCls}">${headHtml}${tbodyHtml}</table></div>`;
    const html = `<section ${sectionAttr}><div ${containerAttr}>${tableHtml}</div></section>`;
    return `<div class="sindri-ui sindri-ui-tables">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:tables': renderTables,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
