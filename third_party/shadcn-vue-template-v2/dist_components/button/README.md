# Demo estático de Button (shadcn-vue)

Este directorio contiene el HTML estático de ejemplo para el componente Button, pensado para integrarlo en Docsify mediante los plugins de Sindri.

Archivos:
- demo.html: muestra varias variantes y tamaños del botón.

Notas:
- Tailwind standalone ya está integrado a nivel de proyecto, por lo que este HTML solo define la estructura y clases. No incluye enlaces a CSS.
- El plugin `sindri:ui:button` genera dinámicamente este mismo patrón de HTML a partir de un bloque de código con configuración YAML.

Ejemplo de bloque en Markdown:

````
```sindri:ui:button
text: "Visita nuestra tienda"
variant: "secondary"
size: "lg"
```
````
