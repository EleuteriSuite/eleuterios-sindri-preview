// Sindri Docsify plugin: marketing:headers
// Header con marca, navegación y acciones

/*
```sindri:marketing:headers
brand:
  text: "Acme"
  href: "#"
nav:
  items:
    - title: "About"
      href: "#"
    - title: "Careers"
      href: "#"
    - title: "Blog"
      href: "#"
actions:
  - description: "Login"
    href: "#"
    variant: "default"
  - description: "Register"
    href: "#"
    variant: "outline"
```
 */

(function () {
  function renderHeaders(cfg) {
    const C = window.SindriCore || {};
    const U = window.__SindriUtilsUi || {};

    const headerCls = 'bg-white';
    const containerCls = 'mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8';
    const navUlCls = 'flex items-center gap-6 text-sm';
    const navACls = 'text-gray-500 transition hover:text-gray-500/75';
    const actionsWrapCls = 'flex items-center gap-4';
    const actionsInnerCls = 'sm:flex sm:gap-4';
    const mobileBtnCls = 'block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const headerAttr = C.attrsToString ? C.attrsToString({ class: [headerCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'headers' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'headers-container' }) : '';

    const brand = cfg?.brand || {};
    const brandHtml = (function(){
      const text = brand.text || 'Brand';
      const href = brand.href || '#';
      const cls = brand.class ? ` ${brand.class}` : '';
      return `<a class="block text-teal-600${cls}" href="${href}"><span class="sr-only">Home</span>${brand.html || text}</a>`;
    })();

    const navItems = Array.isArray(cfg?.nav?.items) ? cfg.nav.items : (Array.isArray(cfg?.items) ? cfg.items : []);
    const navHtml = navItems.length ? `<nav aria-label="Global" class="hidden md:block"><ul class="${navUlCls}">` + navItems.map((it)=>{
      const t = it.title || it.label || 'Link';
      const href = it.href || '#';
      return `<li><a class="${navACls}" href="${href}">${t}</a></li>`;
    }).join('') + `</ul></nav>` : '';

    const actions = Array.isArray(cfg?.actions) ? cfg.actions : [];
    const actionsHtml = actions.length ? `<div class="${actionsInnerCls}">` + actions.map((a)=>{
      let renderButton = null;
      try {
          renderButton = window.__SindriUtilsUi?.renderButton || null;
      } catch (e) {
          throw new Error('Sindri: marketing:headers plugin requires Sindri Utils UI');
      }
      return renderButton(a);
    }).join('') + `</div>` : '';

    const mobileBtn = cfg?.showMenuButton !== false ? (
      `<button class="${mobileBtnCls}"><span class="sr-only">Toggle menu</span>`+
      `<svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">`+
      `<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg></button>`
    ) : '';

    const rightHtml = `<div class="flex flex-1 items-center justify-end md:justify-between">${navHtml}<div class="${actionsWrapCls}">${actionsHtml}${mobileBtn}</div></div>`;
    const html = `<header ${headerAttr}><div ${containerAttr}>${brandHtml}${rightHtml}</div></header>`;
    return `<div class="sindri-marketing sindri-marketing-headers">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:headers': renderHeaders,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
