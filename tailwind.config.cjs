/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.html",
        "./src/**/*.md",
    ],
    theme: {
        extend: {},
    },
    corePlugins: {
        // Importantísimo para no romper el CSS de Docsify:
        preflight: false,
    },
    plugins: [
        require("flyonui"),
        require("flyonui/plugin"), // para los componentes con JS de FlyonUI
    ],
};