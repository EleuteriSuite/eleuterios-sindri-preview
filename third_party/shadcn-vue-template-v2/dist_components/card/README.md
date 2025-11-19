Este directorio contiene el HTML estático de ejemplo para el componente Card, pensado para integrarse en Docsify mediante los plugins "sindri:ui".

Estructura:
- demo.html: una tarjeta simple con Header (título y descripción), Content y Footer opcional.

Notas:
- Tailwind standalone ya está integrado a nivel de proyecto, por lo que este HTML solo define la estructura y clases utilitarias.
- El plugin `sindri:ui:card` inyecta HTML equivalente al de esta demo con el contenido que se le pasa por YAML.
