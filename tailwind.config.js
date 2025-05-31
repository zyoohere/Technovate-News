import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
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
                primary: "#0C5552", // Teal dari logo Technovate
                primaryHover: "#0F766E", // Versi hover yang lebih gelap dari teal
                secondary: "#1BC5B4", // Cyan yang segar sebagai aksen
                background: {
                    DEFAULT: "#FCFCFC",
                    dark: "#111827", 
                },
                surface: {
                    light: "#FCFCFC", // Putih untuk kartu/light mode
                    dark: "#1f2937", // Gray-800 untuk kartu di dark mode
                },
                text: {
                    light: "#0E8388", 
                    dark: "#02C087", 
                },
                success: "#22c55e", // Green-500
                warning: "#facc15", // Amber-400
                danger: "#ef4444", // Red-500
                border: {
                    light: "#0E8388", 
                    dark: "#374151", 
                },
            },
        },
    },

    plugins: [forms, require("@tailwindcss/line-clamp"), require('@tailwindcss/typography')],
};
