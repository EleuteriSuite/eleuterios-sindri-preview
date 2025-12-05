# Sindri previewer v0.1.0

Testing...

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

```sindri:ui:inputs
items:
  - title: "Email"
    type: "email"
    placeholder: "tu@correo.com"
    description: "Nunca compartiremos tu correo."
  - title: "Nombre"
    type: "text"
    placeholder: "Tu nombre"
htmltag:
  styles:
    - background: "linear-gradient(180deg, #fff, #f8fafc)"
```

```sindri:ui:quantity-inputs
items:
  - title: "Cantidad"
    value: 2
    min: 1
    max: 10
  - title: "Unidades"
    value: 1
    min: 0
    max: 99
htmltag:
  styles:
    - background: "linear-gradient(180deg, #ffffff, #f1f5f9)"
```

```sindri:marketing:feature
items:
  - title: "Sin comisión"
    description: "Sin tarifas ocultas ni sorpresas."
  - title: "Rápido de implementar"
    description: "Plantillas listas y componentes reutilizables."
  - title: "Escalable"
    description: "Añade más bloques y páginas según creces."
htmltag:
  styles:
    - background: "linear-gradient(180deg, #fff, #f8fafc)"
```

```sindri:marketing:hero
title:
  description: "Ecosistema digital Open Source"
subtitle:
  description: "Tu página web, tienda virtual, correos electrónicos, newsletter, etc por 15€/mes o 150€/año"
action:
  description: "Ser mecenas"
  variant: "primary"
  size: "lg"
  as: "a"
  href: "#mecenas"
htmltag:
  class: "testclass"
```
