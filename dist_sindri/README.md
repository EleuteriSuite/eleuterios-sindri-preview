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

```sindri:ui:breadcrumbs
items:
  - title: "Home"
    href: "#"
  - title: "Category"
    href: "#"
  - title: "Product"
    href: "#"
```

```sindri:ui:accordions
items:
  - title: "What are the basic features?"
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt similique..."
    open: true
  - title: "How do I get started?"
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
  - title: "What support options are available?"
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
```

```sindri:ui:range-inputs
items:
  - title: "Max Volume"
    id: "maxVolume"
    min: 0
    max: 100
    value: 20
htmltag:
  styles:
    - background: "linear-gradient(180deg, #fff, #f8fafc)"
```

```sindri:ui:textareas
items:
  - title: "Notes"
    id: "Notes"
    rows: 4
    value: "Texto inicial"
htmltag:
  styles:
    - background: "linear-gradient(180deg, #fff, #f8fafc)"
```

```sindri:ui:checkboxes
legend: "Checkboxes"
items:
  - id: "Option1"
    title: "Option 1"
    checked: true
  - id: "Option2"
    title: "Option 2"
  - id: "Option3"
    title: "Option 3"
```

```sindri:ui:radio-groups
legend: "Delivery"
name: "DeliveryOption"
items:
  - id: "DeliveryStandard"
    title: "Standard"
    right: "Free"
    value: "DeliveryStandard"
    checked: true
  - id: "DeliveryPriority"
    title: "Next Day"
    right: "£9.99"
    value: "DeliveryPriority"
```

```sindri:ui:selects
items:
  - id: "Headline"
    title: "Headliner"
    placeholder: "Please select"
    value: "JH"
    options:
      - { value: "JM", title: "John Mayer" }
      - { value: "SRV", title: "Stevie Ray Vaughn" }
      - { value: "JH", title: "Jimi Hendrix" }
      - { value: "BBK", title: "B.B King" }
      - { value: "AK", title: "Albert King" }
      - { value: "BG", title: "Buddy Guy" }
      - { value: "EC", title: "Eric Clapton" }
```

```sindri:ui:toggles
items:
  - id: "AcceptConditions"
  - id: "Newsletter"
    checked: true
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

```sindri:ui:badges
items:
  - title: "Live"
  - title: "Live"
    htmltag:
      class: "border border-purple-500 text-purple-700 bg-transparent"
```

```sindri:ui:button-groups
items:
  - title: "View"
  - title: "Edit"
  - title: "Delete"
```

```sindri:ui:details-list
items:
  - title: "Title"
    description: "Mr"
  - title: "Name"
    description: "John Frusciante"
  - title: "Occupation"
    description: "Guitarist"
  - title: "Salary"
    description: "$1,000,000+"
  - title: "Bio"
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit..."
```

```sindri:ui:dividers
title: "Title goes here"
```

```sindri:ui:empty-states
title: "No items found"
description: "Get started by creating your first item. It only takes a few seconds."
action:
  title: "Create Item"
  href: "#"
links:
  - title: "Learn how"
    href: "#"
  - title: "view examples"
    href: "#"
```

```sindri:ui:dropdown
title: "Product"
split: true
open: true
items:
  - title: "Storefront"
    href: "#"
  - title: "Warehouse"
    href: "#"
  - title: "Stock"
    href: "#"
  - title: "Delete"
    type: "button"
    variant: "danger"
```

```sindri:ui:file-uploaders
title: "Upload your file(s)"
multiple: true
```

```sindri:ui:filters
items:
  - title: "Color"
    type: "checkbox"
    options:
      - title: "Red"
        checked: false
      - title: "Blue"
        checked: true
      - title: "Green"
        checked: true
  - title: "Size"
    type: "radio"
    options:
      - title: "M"
        checked: false
      - title: "L"
        checked: true
      - title: "XL"
        checked: false
  - title: "Price"
    type: "range"
    min: 5
    max: 2000
```

```sindri:ui:grids
cols: 4
gap: 4
items:
  - content: "Item 1"
  - content: "Item 2"
  - content: "Item 3"
  - content: "Item 4"
  - content: "Item 5"
```
