// Sindri Docsify plugin: ui:card
// Depende de window.SindriCore (core.js)
// Depende de window.__SindriUtilsUi (utils-ui.js)

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
