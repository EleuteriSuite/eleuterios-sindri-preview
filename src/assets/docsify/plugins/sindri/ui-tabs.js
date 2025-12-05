// Sindri Docsify plugin: ui:tabs
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:tabs
items:
  - title: "Profile"
    selected: true
    content: "Contenido del perfil de ejemplo."
  - title: "Account"
    content: "Opciones de cuenta."
  - title: "Notifications"
    content: "Preferencias de notificación."
```
 */
(function () {
  function renderTabs(cfg) {
    const C = window.SindriCore || {};

    // Clases base inspiradas en ai_helpers/components/ui/tabs/1.html
    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-3xl p-6';
    const barWrapperCls = '-mb-px border-b border-gray-200';
    const tablistCls = 'flex gap-1';
    const tabActiveCls = 'border-b-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700';
    const tabInactiveCls = 'border-b-2 border-transparent px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-700';
    const panelCls = 'mt-4';
    const panelTextCls = 'text-gray-700';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'tabs' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'tabs-container' }) : '';

    // items: [{ title, selected?, htmltag?, content? }]
    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const selectedIndex = Math.max(0, items.findIndex(it => it && it.selected)) || 0;

    const tabsHtml = items.map((it, idx) => {
      const selected = idx === selectedIndex;
      const label = it?.title || it?.label || `Tab ${idx + 1}`;
      const extra = it?.htmltag?.class || '';
      const btnAttr = C.attrsToString ? C.attrsToString({
        role: 'tab',
        'aria-selected': selected ? 'true' : 'false',
        class: [selected ? tabActiveCls : tabInactiveCls, extra].filter(Boolean).join(' '),
      }) : '';
      return `<button ${btnAttr}>${label}</button>`;
    }).join('');

    // panel content: prefer explicit cfg.content; otherwise selected item's content/description
    let panelContent = '';
    if (cfg && cfg.content != null) panelContent = String(cfg.content);
    else if (items[selectedIndex] && (items[selectedIndex].content != null || items[selectedIndex].description != null)) {
      panelContent = String(items[selectedIndex].content ?? items[selectedIndex].description);
    }
    const panelInner = panelContent ? `<p class="${panelTextCls}">${panelContent}</p>` : '';

    const html = [
      `<section ${sectionAttr}>`,
      `<div ${containerAttr}>`,
      `<div class="${barWrapperCls}">`,
      `<div role="tablist" class="${tablistCls}">${tabsHtml}</div>`,
      `</div>`,
      `<div role="tabpanel" class="${panelCls}">${panelInner}</div>`,
      `</div>`,
      `</section>`
    ].join('');

    return `<div class="sindri-ui sindri-ui-tabs">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:tabs': renderTabs,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
