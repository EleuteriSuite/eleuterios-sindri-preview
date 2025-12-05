// Sindri Docsify plugin: ui:steps
// Depende de window.SindriCore (core.js)

/*
```sindri:ui:steps
items:
  - title: "Account"
    description: "Create your account"
    status: "complete"
  - title: "Profile"
    description: "Add personal info"
    status: "current"
  - title: "Confirm"
    description: "Review and finish"
    status: "pending"
```
 */

(function () {
  function renderSteps(cfg) {
    const C = window.SindriCore || {};

    // Clases base para pasos horizontales
    const sectionCls = 'py-8';
    const containerCls = 'mx-auto max-w-4xl p-6';
    const listCls = 'grid grid-cols-1 gap-4 sm:grid-cols-3';
    const itemBase = 'flex items-center gap-3 rounded-lg border bg-white p-3 text-sm shadow-sm transition-colors';
    const itemComplete = 'border-green-600 ring-1 ring-green-600/30';
    const itemCurrent = 'border-indigo-600 ring-1 ring-indigo-600/30';
    const itemPending = 'border-gray-200';
    const badgeBase = 'grid size-6 place-content-center rounded-full text-xs font-medium text-white';
    const badgeComplete = 'bg-green-600';
    const badgeCurrent = 'bg-indigo-600';
    const badgePending = 'bg-gray-400';
    const titleCls = 'font-medium text-gray-900';
    const descCls = 'text-xs text-muted-foreground';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: sectionCls, style: stylesInline || undefined, 'data-slot': 'steps' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'steps-container' }) : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const itemsHtml = items.map((it, idx) => {
      const status = String(it?.status || it?.state || (it?.complete ? 'complete' : it?.current ? 'current' : 'pending')).toLowerCase();
      const isComplete = status === 'complete';
      const isCurrent = status === 'current';
      const itCls = [itemBase, isComplete ? itemComplete : isCurrent ? itemCurrent : itemPending, it?.htmltag?.class].filter(Boolean).join(' ');
      const badgeCls = [badgeBase, isComplete ? badgeComplete : isCurrent ? badgeCurrent : badgePending].join(' ');
      const title = it?.title || it?.label || `Step ${idx + 1}`;
      const desc = it?.description || it?.caption || '';
      const num = it?.number != null ? String(it.number) : String(idx + 1);
      return `<li class="${itCls}"><span class="${badgeCls}">${num}</span><div><div class="${titleCls}">${title}</div>${desc ? `<div class="${descCls}">${desc}</div>` : ''}</div></li>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}><ol class="${listCls}">${itemsHtml}</ol></div></section>`;
    return `<div class="sindri-ui sindri-ui-steps">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:steps': renderSteps,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
