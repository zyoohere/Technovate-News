import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#129990", // Teal (dari logo)
                secondary: "#0077b6", // Biru Laut
                accent: "#fbbc04", // Oranye Kuning
                darkText: "#2c3e50", // Abu Gelap
                lightBg: "#f8f9fa", // Background abu muda
            },
        },
    },

    plugins: [
        forms,
        require('@tailwindcss/line-clamp'),
    ],
};
