// Sindri Docsify plugin: ui:button
// Depende de window.SindriCore (core.js)
// Depende de window.__SindriUtilsUi (utils-ui.js)

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
