// Sindri Docsify plugin: marketing:hero | title, subtitle, action
// Depende de window.SindriCore (core.js)
// Depende de window.__SindriUtilsUi (utils-ui.js)

(function () {
    function renderHero(cfg) {
        const C = window.SindriCore || {};

        const heroClassSection =
            'lg:grid lg:h-[70vh] lg:place-content-center';
        const heroClassContainer =
            'mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28';
        const heroClassSubContainer =
            'mx-auto text-center';
        const heroClassTitle =
            "text-4xl font-bold sm:text-5xl";
        const heroClassSubTitle =
            "mt-4 text-base text-pretty sm:text-lg/relaxed";
        const heroClassAction =
            'mt-4 flex justify-center gap-4 sm:mt-6';
        const footerClassBase = 'flex items-center px-6 [.border-t]:pt-6';

        const stylesInline = C.stylesArrayToInline
            ? C.stylesArrayToInline(cfg && cfg.htmltag && cfg.htmltag.styles? cfg.htmltag.styles : [])
            : '';
        const heroSectionAttrs = {
            class: [heroClassSection]
                .filter(Boolean)
                .join(' '),
            style: stylesInline || undefined,
            'data-slot': 'hero',
        };
        const heroSectionAttrStr = C.attrsToString ? C.attrsToString(heroSectionAttrs) : '';

        const heroContainerAttrs = {
            class: [heroClassContainer]
                .filter(Boolean)
                .join(' '),
            style: stylesInline || undefined,
            'data-slot': 'hero-container',
        };
        const heroContainerAttrStr = C.attrsToString ? C.attrsToString(heroContainerAttrs) : '';

        const heroSubContainerAttrs = {
            class: [heroClassSubContainer]
                .filter(Boolean)
                .join(' '),
            style: stylesInline || undefined,
            'data-slot': 'hero-subcontainer',
        };
        const heroSubContainerAttrStr = C.attrsToString ? C.attrsToString(heroSubContainerAttrs) : '';

        const hasTitle = cfg && cfg.title && cfg.title.description;
        const hasSubTitle = cfg && cfg.subtitle && cfg.subtitle.description;
        const hasAction = cfg && cfg.action && cfg.action.description;

        // Hero HTML
        let heroHtml = '';
        const heroParts = [];

        if (hasTitle) {
            const titleAttrs = {
                class: [
                    heroClassTitle,
                    cfg.title.class? cfg.title.class : '',
                ]
                    .filter(Boolean)
                    .join(' '),
                'data-slot': 'hero-title',
            };
            const titleAttrStr = C.attrsToString ? C.attrsToString(titleAttrs) : '';
            heroParts.push(
                `<h1 ${titleAttrStr}>${cfg.title.description}</h1>`
            );
        }


        if (hasSubTitle) {
            const subtitleAttrs = {
                class: [
                    heroClassSubTitle,
                    cfg.subtitle.class? cfg.subtitle.class : '',
                ]
                    .filter(Boolean)
                    .join(' '),
                'data-slot': 'hero-subtitle',
            };
            const subtitleAttrStr = C.attrsToString ? C.attrsToString(subtitleAttrs) : '';
            heroParts.push(
                `<p ${subtitleAttrStr}>${cfg.subtitle.description}</p>`
            );
        }

        // Action button/link
        if (hasAction) {
            let renderButton = null;
            try {
                renderButton = window.__SindriUtilsUi?.renderButton || null;
            } catch (e) {
                throw new Error('Sindri: marketing:hero plugin requires Sindri Utils UI');
            }
            const heroAction = renderButton(cfg.action)?? ''

            if (heroAction) {
                heroParts.push(
                    heroAction
                );
            }
        }

        heroHtml = `<section ${heroSectionAttrStr}><div ${heroContainerAttrStr}><div ${heroSubContainerAttrStr}>${heroParts.join('')}</div></div></section>`;

        return `<div class="sindri-marketing sindri-marketing-hero">${heroHtml}</div>`;
    }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:hero': renderHero,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
