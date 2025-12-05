// Sindri core helpers for Docsify plugins
// - Block detector for ```sindri:ui:<component>
// - Minimal YAML-like parser (subset) for simple config
// - HTML helpers

function trimQuotes(str) {
  if (typeof str !== 'string') return str;
  const s = str.trim();
  const noAngles = s.startsWith('<') && s.endsWith('>') ? s.slice(1, -1) : s;
  if ((noAngles.startsWith('"') && noAngles.endsWith('"')) || (noAngles.startsWith("'") && noAngles.endsWith("'"))) {
    return noAngles.slice(1, -1);
  }
  return noAngles;
}

function parseYamlLite(yaml) {
    const lines = String(yaml || '')
        .replace(/\r\n?/g, '\n')
        .split('\n');

    const result = {};

    function trimQuotes(s) {
        if (!s) return s;
        s = s.trim();
        if (
            (s.startsWith('"') && s.endsWith('"')) ||
            (s.startsWith("'") && s.endsWith("'"))
        ) {
            return s.slice(1, -1);
        }
        return s;
    }

    // Índices de líneas útiles (no vacías ni comentarios)
    const usefulIndices = [];
    for (let i = 0; i < lines.length; i++) {
        const t = lines[i].trim();
        if (t && !t.startsWith('#')) usefulIndices.push(i);
    }
    const usefulSet = new Set(usefulIndices);

    function findNextNonEmpty(idx, minIndent) {
        for (let j = idx + 1; j < lines.length; j++) {
            if (!usefulSet.has(j)) continue;
            const l = lines[j];
            const indent = l.match(/^\s*/)[0].length;
            if (typeof minIndent === 'number' && indent <= minIndent) {
                // Hermano o padre: se acaba el bloque
                return null;
            }
            return { index: j, line: l };
        }
        return null;
    }

    // Pila de contextos según indent
    const stack = [{ indent: -1, container: result, type: 'object' }];

    for (let i = 0; i < lines.length; i++) {
        if (!usefulSet.has(i)) continue;

        let raw = lines[i];
        const line = raw.replace(/\t/g, '  ');
        const indent = line.match(/^\s*/)[0].length;
        const content = line.trim();

        // Sube en la jerarquía hasta encontrar un indent menor
        while (stack.length && stack[stack.length - 1].indent >= indent) {
            stack.pop();
        }
        const parentCtx = stack[stack.length - 1];
        const container = parentCtx.container;

        // ----- ÍTEMS DE ARRAY: "- ..."
        if (content.startsWith('- ')) {
            if (!Array.isArray(container)) {
                // No debería pasar si la detección de arrays funciona
                continue;
            }

            const entry = content.slice(2).trim();
            const mm = entry.match(/^(\S+):\s*(.*)$/);

            if (mm) {
                // "- key: value"
                const prop = mm[1];
                const rest = mm[2];
                const obj = {};
                obj[prop] = trimQuotes(rest);
                container.push(obj);
                // Este item puede tener más claves debajo:
                stack.push({ indent, container: obj, type: 'objectItem' });
            } else {
                // "- valorSimple"
                container.push(trimQuotes(entry));
            }

            continue;
        }

        // ----- LÍNEAS "key: ..." (objeto o inicio de bloque)
        const m = content.match(/^(\S+):\s*(.*)$/);
        if (!m) continue;

        const key = m[1];
        const rest = m[2];

        if (rest === '') {
            // "key:" → puede ser objeto o array
            const nextInfo = findNextNonEmpty(i, indent);
            let isArray = false;

            if (nextInfo) {
                const nextIndent = nextInfo.line.match(/^\s*/)[0].length;
                if (nextIndent > indent && nextInfo.line.trim().startsWith('- ')) {
                    isArray = true;
                }
            }

            if (isArray) {
                const arr = [];
                container[key] = arr;
                stack.push({ indent, container: arr, type: 'array' });
            } else {
                const obj = {};
                container[key] = obj;
                stack.push({ indent, container: obj, type: 'object' });
            }
        } else {
            // "key: value" simple
            container[key] = trimQuotes(rest);
        }
    }

    return result;
}

function unwrapAnglesInString(s) {
  if (typeof s !== 'string') return s;
  // Replace any <...> by its inner content
  return s.replace(/<([^<>]+)>/g, (_, inner) => inner.trim());
}

function normalizeAngleKeysAndValues(input) {
  if (Array.isArray(input)) {
    return input.map(v => normalizeAngleKeysAndValues(v));
  }
  if (input && typeof input === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(input)) {
      const k2 = k.replace(/[<>]/g, '');
      out[k2] = normalizeAngleKeysAndValues(v);
    }
    return out;
  }
  if (typeof input === 'string') {
    return unwrapAnglesInString(input);
  }
  return input;
}

function stylesArrayToInline(arr) {
  if (!Array.isArray(arr)) return '';
  const parts = [];
  for (const item of arr) {
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      for (const k of Object.keys(item)) {
        parts.push(`${k}: ${unwrapAnglesInString(item[k])}`);
      }
    } else if (typeof item === 'string') {
      parts.push(unwrapAnglesInString(item));
    }
  }
  return parts.join('; ');
}

function attrsToString(attrs) {
  const out = [];
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === undefined || v === null || v === false) continue;
    if (v === true) {
      out.push(`${k}`);
    } else {
      out.push(`${k}="${String(v).replace(/"/g, '&quot;')}"`);
    }
  }
  return out.join(' ');
}

function replaceSindriBlocks(markdown, handlers) {
  const re = /```sindri:([\w:-]+)[ \t]*\n([\s\S]*?)```/gi;
  return markdown.replace(re, (full, lang, yaml) => {
    const target = String(lang || '').toLowerCase();
    const handler = handlers && handlers[target];
    if (!handler) return full; // leave untouched if no handler
    let cfg;
    try {
      cfg = normalizeAngleKeysAndValues(parseYamlLite(yaml));
    } catch (e) {
      console.warn('[sindri] YAML parse error:', e);
      return full;
    }
    try {
      return handler(cfg);
    } catch (e) {
      console.error('[sindri] handler error for', target, e);
      return full;
    }
  });
}

// Export into global Docsify runtime context (no modules here)
window.SindriCore = {
  parseYamlLite,
  normalizeAngleKeysAndValues,
  stylesArrayToInline,
  attrsToString,
  replaceSindriBlocks,
  trimQuotes,
  unwrapAnglesInString,
};
