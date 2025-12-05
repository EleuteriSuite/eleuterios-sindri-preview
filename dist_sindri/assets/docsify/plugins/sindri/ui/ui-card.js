// Sindri Docsify plugin: ui:card
// Depende de window.SindriCore (core.js)
// Depende de window.__SindriUtilsUi (utils-ui.js)

/*
```sindri:ui:card
title: "Conoce nuestra tienda"
content: "Descripción de la tienda"
footer: "Acciones en la tienda"
variant: "primary"
size: "lg"
as: "a"
href: "https://tu-tienda.example"
htmltag:
  class: "w-1/3 border-2 border-gray-500"
```
 */


(function () {
  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:card': window.__SindriUtilsUi?.renderCard,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
