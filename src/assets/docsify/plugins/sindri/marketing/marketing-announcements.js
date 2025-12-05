// Sindri Docsify plugin: marketing:announcements
// Avisos/announcements simples con variantes

/*
```sindri:marketing:announcements
items:
  - title: "We launched v2.0"
    description: "Faster, smaller bundle and tons of new blocks."
    variant: "info"
    action:
      description: "Read more"
      href: "#"
      variant: "link"
```
 */

(function () {
  function classesForVariant(v) {
    const map = {
      info: 'bg-blue-50 text-blue-900 border-blue-200',
      success: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      warning: 'bg-amber-50 text-amber-900 border-amber-200',
      error: 'bg-red-50 text-red-900 border-red-200',
      default: 'bg-gray-50 text-gray-900 border-gray-200',
    };
    return map[String(v || 'default').toLowerCase()] || map.default;
  }

  function renderAnnouncements(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-5xl px-4 sm:px-6 lg:px-8';
    const listCls = 'space-y-3';
    const itemBaseCls = 'flex items-start gap-3 rounded-lg border p-4';
    const titleCls = 'font-medium';
    const descCls = 'text-sm text-muted-foreground';
    const actionWrapCls = 'ml-auto shrink-0';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'announcements' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'announcements-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it) => {
      const variant = it?.variant || it?.type || 'default';
      const itemCls = [itemBaseCls, classesForVariant(variant), it?.htmltag?.class].filter(Boolean).join(' ');
      const t = it?.title || it?.label || '';
      const d = it?.description || it?.content || '';
      let actionHtml = '';
      if (it?.action) {
        try {
          const renderButton = window.__SindriUtilsUi?.renderButton || null;
          if (renderButton) actionHtml = `<div class="${actionWrapCls}">` + renderButton(it.action) + `</div>`;
        } catch (e) { /* ignore */ }
      }
      return `<div class="${itemCls}"><div><p class="${titleCls}">${t}</p>${d ? `<p class="${descCls}">${d}</p>` : ''}</div>${actionHtml}</div>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}><div class="${listCls}">${itemsHtml}</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-announcements">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:announcements': renderAnnouncements,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
