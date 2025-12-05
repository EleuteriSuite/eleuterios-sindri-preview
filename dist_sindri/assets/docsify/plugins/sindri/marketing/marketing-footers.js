// Sindri Docsify plugin: marketing:footers
// Footer con newsletter y columnas de enlaces

/*
```sindri:marketing:footers
newsletter:
  title: "Get the latest news!"
  description: "Join our newsletter to stay up to date."
  placeholder: "john@rhcp.com"
  button:
    description: "Sign Up"
    href: "#"
    variant: "default"
columns:
  - title: "Services"
    links:
      - title: "1on1 Coaching"
        href: "#"
      - title: "Company Review"
        href: "#"
  - title: "Company"
    links:
      - title: "About"
        href: "#"
      - title: "Team"
        href: "#"
```
 */

(function () {
  function renderFooters(cfg) {
    const C = window.SindriCore || {};

    const footerCls = 'bg-white';
    const wrapCls = 'mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8';
    const gridCls = 'mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const footerAttr = C.attrsToString ? C.attrsToString({ class: [footerCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'footers' }) : '';
    const wrapAttr = C.attrsToString ? C.attrsToString({ class: wrapCls, 'data-slot': 'footers-container' }) : '';
    const gridAttr = C.attrsToString ? C.attrsToString({ class: gridCls, 'data-slot': 'footers-grid' }) : '';

    // Newsletter block
    const newsletter = cfg?.newsletter || {};
    const nlTitle = newsletter.title || 'Get the latest news!';
    const nlDesc = newsletter.description || '';
    const nlPlaceholder = newsletter.placeholder || 'you@example.com';
    let renderButton = null;
    try {
        renderButton = window.__SindriUtilsUi?.renderButton || null;
    } catch (e) {
        throw new Error('Sindri: marketing:footers plugin requires Sindri Utils UI');
    }
    const newsletterHtml = (newsletter === false) ? '' : (
      `<div class="col-span-2">`+
      `<div>`+
      (nlTitle ? `<h2 class="text-2xl font-bold text-gray-900">${nlTitle}</h2>` : '')+
      (nlDesc ? `<p class="mt-4 text-gray-500">${nlDesc}</p>` : '')+
      `</div></div>`+
      `<div class="col-span-2 lg:col-span-3 lg:flex lg:items-end">`+
      `<form class="w-full" onsubmit="return false;">`+
      `<label class="sr-only">Email</label>`+
      `<div class="border border-gray-100 p-2 focus-within:ring-3 sm:flex sm:items-center sm:gap-4">`+
      `<input type="email" placeholder="${nlPlaceholder}" class="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm"/>`+
      renderButton(newsletter.button)+
      `</div></form></div>`
    );

    // Columns with links
    const columns = Array.isArray(cfg?.columns) ? cfg.columns : [];
    const colHtml = columns.map((col) => {
      const title = col?.title || col?.label || '';
      const links = Array.isArray(col?.links) ? col.links : [];
      const items = links.map((lnk) => {
        const text = lnk?.title || lnk?.label || 'Link';
        const href = lnk?.href || '#';
        return `<li><a href="${href}" class="text-gray-700 transition hover:opacity-75"> ${text} </a></li>`;
      }).join('');
      return `<div class="col-span-2 sm:col-span-1"><p class="font-medium text-gray-900">${title}</p><ul class="mt-6 space-y-4 text-sm">${items}</ul></div>`;
    }).join('');

    const html = `<footer ${footerAttr}><div ${wrapAttr}><div ${gridAttr}>${newsletterHtml}${colHtml}</div></div></footer>`;
    return `<div class="sindri-marketing sindri-marketing-footers">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:footers': renderFooters,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
