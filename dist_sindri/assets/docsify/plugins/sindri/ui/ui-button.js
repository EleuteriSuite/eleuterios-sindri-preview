// Sindri Docsify plugin: ui:button
// Depende de window.SindriCore (core.js)
// Depende de window.__SindriUtilsUi (utils-ui.js)

/*
```sindri:ui:button
description: "Visita nuestra tienda"
variant: "primary"
size: "lg"
as: "a"
href: "https://tu-tienda.example"
htmltag:
  class: "relative mx-auto"
  styles:
    - color: "#ffffff"
    - font-size: "12px"
```
 */

(function () {
  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'ui:button': window.__SindriUtilsUi?.renderButton || '',
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
