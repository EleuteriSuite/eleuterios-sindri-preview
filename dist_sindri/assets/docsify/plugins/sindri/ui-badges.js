// Sindri Docsify plugin: ui:badges

/*
```sindri:ui:badges
items:
  - title: "Live"
  - title: "Live"
    htmltag:
      class: "border border-purple-500 text-purple-700 bg-transparent"
```
 */

(function () {
  function renderBadges(cfg) {
    const C = window.SindriCore || {};

    // 1) Clases Tailwind base
    const containerCls = 'flex flex-wrap justify-center gap-4 p-6';
    const badgeBaseCls = 'rounded-full px-2.5 py-0.5 text-sm whitespace-nowrap';
    const defaultBadgeCls = 'bg-purple-100 text-purple-700';

    // 2) Estilos inline opcionales
    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';

    // 3) Atributos serializados
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, style: stylesInline || undefined, 'data-slot': 'badges-container' }) : '';

    // 4) Items
    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it) => {
      // Allow overriding classes per item
      const itemExtraCls = it?.htmltag?.class || defaultBadgeCls;
      const itemCls = `${badgeBaseCls} ${itemExtraCls}`;
      
      const itemAttr = C.attrsToString ? C.attrsToString({ class: itemCls }) : '';
      const content = it?.title || it?.description || '';
      
      return `<span ${itemAttr}>${content}</span>`;
    }).join('');

    // 5) Ensamblado final
    return `<div class="sindri-ui sindri-ui-badges"><div ${containerAttr}>${itemsHtml}</div></div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:badges': renderBadges,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
