// Sindri Docsify plugin: marketing:contact-form
// Formulario de contacto sencillo (nombre, email, mensaje) con botón

/*
```sindri:marketing:contact-form
title: "Contact us"
description: "24 hours a day, 7 days a week. We're here to help you."
name:
  label: "Name"
  placehoder: "Write your name here"
email:
  label: "Email"
  placehoder: "Write your email here"
message:
  label: "Message"
  placehoder: "Write your message here"
button:
  description: "Send message"
  variant: "primary"
```
 */

(function () {
  function renderContactForms(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-2xl px-4 sm:px-6 lg:px-8';
    const titleCls = 'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl';
    const descCls = 'mt-3 text-base text-gray-600';
    const formCls = 'mt-8 grid grid-cols-1 gap-6';
    const labelCls = 'text-sm font-medium text-gray-700';
    const inputCls = 'mt-1 block w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500';
    const textareaCls = 'mt-1 block w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 min-h-32';
    const actionsCls = 'mt-4';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'contact-forms' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'contact-forms-container' }) : '';

    const title = cfg?.title || 'Contact us';
    const description = cfg?.description || '';

    const nameLabel = cfg?.fields?.name?.label || 'Name';
    const emailLabel = cfg?.fields?.email?.label || 'Email';
    const messageLabel = cfg?.fields?.message?.label || 'Message';
    const namePlaceholder = cfg?.fields?.name?.placeholder || '';
    const emailPlaceholder = cfg?.fields?.email?.placeholder || '';
    const messagePlaceholder = cfg?.fields?.message?.placeholder || '';

    let buttonHtml = '';
    const buttonCfg = cfg?.button || { description: 'Send message', variant: 'default' };
    try {
      const renderButton = window.__SindriUtilsUi?.renderButton || null;
      if (renderButton) buttonHtml = renderButton(buttonCfg);
    } catch (e) { /* ignore */ }

    const formHtml = `<form class="${formCls}" onsubmit="return false;">`+
      `<div><label class="${labelCls}">${nameLabel}</label><input type="text" placeholder="${namePlaceholder}" class="${inputCls}"/></div>`+
      `<div><label class="${labelCls}">${emailLabel}</label><input type="email" placeholder="${emailPlaceholder}" class="${inputCls}"/></div>`+
      `<div><label class="${labelCls}">${messageLabel}</label><textarea placeholder="${messagePlaceholder}" class="${textareaCls}"></textarea></div>`+
      `<div class="${actionsCls}">${buttonHtml}</div>`+
    `</form>`;

    const html = `<section ${sectionAttr}><div ${containerAttr}>`+
      `<h2 class="${titleCls}">${title}</h2>`+
      `${description ? `<p class="${descCls}">${description}</p>` : ''}`+
      `${formHtml}`+
      `</div></section>`;

    return `<div class="sindri-marketing sindri-marketing-contact-forms">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:contact-form': renderContactForms,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
