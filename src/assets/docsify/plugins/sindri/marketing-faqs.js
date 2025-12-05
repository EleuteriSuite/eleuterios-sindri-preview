// Sindri Docsify plugin: marketing:faqs
// Lista de preguntas frecuentes en formato acordeón (details/summary)

/*
```sindri:marketing:faqs
title: "FAQs"
description: "Common questions answered"
items:
  - question: "What is Sindri?"
    answer: "A set of markdown-driven UI blocks for Docsify."
  - question: "How do I install?"
    answer: "Just include the bundle and write sindri blocks in your README."
```
 */

(function () {
  function renderFaqs(cfg) {
    const C = window.SindriCore || {};

    const sectionCls = 'bg-white py-16';
    const containerCls = 'mx-auto max-w-3xl px-4 sm:px-6 lg:px-8';
    const headCls = 'mx-auto max-w-2xl text-center';
    const titleCls = 'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl';
    const descCls = 'mt-3 text-base text-gray-600';
    const listCls = 'mt-8 space-y-3';
    const detailsCls = 'group rounded-xl border bg-card p-4 text-card-foreground shadow-sm';
    const summaryCls = 'flex cursor-pointer items-center justify-between gap-3';
    const qCls = 'font-medium';
    const aCls = 'mt-2 text-sm text-muted-foreground';

    const stylesInline = C.stylesArrayToInline ? C.stylesArrayToInline(cfg?.htmltag?.styles || []) : '';
    const sectionAttr = C.attrsToString ? C.attrsToString({ class: [sectionCls, cfg?.htmltag?.class].filter(Boolean).join(' '), style: stylesInline || undefined, 'data-slot': 'faqs' }) : '';
    const containerAttr = C.attrsToString ? C.attrsToString({ class: containerCls, 'data-slot': 'faqs-container' }) : '';

    const title = cfg?.title || '';
    const description = cfg?.description || '';
    const headHtml = (title || description)
      ? `<div class="${headCls}">${title ? `<h2 class="${titleCls}">${title}</h2>` : ''}${description ? `<p class="${descCls}">${description}</p>` : ''}</div>`
      : '';

    const items = Array.isArray(cfg?.items) ? cfg.items : [];
    const listHtml = items.map((it) => {
      const q = it?.question || it?.q || it?.title || 'Question';
      const a = it?.answer || it?.a || it?.description || '';
      return `<details class="${detailsCls}"><summary class="${summaryCls}"><span class="${qCls}">${q}</span>`+
        `<svg xmlns="http://www.w3.org/2000/svg" class="size-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg></summary>`+
        `${a ? `<div class="${aCls}">${a}</div>` : ''}</details>`;
    }).join('');

    const html = `<section ${sectionAttr}><div ${containerAttr}>${headHtml}<div class="${listCls}">${listHtml}</div></div></section>`;
    return `<div class="sindri-marketing sindri-marketing-faqs">${html}</div>`;
  }

  function install(hook) {
    hook.beforeEach(function (md) {
      const C = window.SindriCore;
      if (!C || !C.replaceSindriBlocks) return md;
      return C.replaceSindriBlocks(md, {
        'marketing:faqs': renderFaqs,
      });
    });
  }

  window.$docsify = window.$docsify || {};
  $docsify.plugins = [install, ...($docsify.plugins || [])];
})();
