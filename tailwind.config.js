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
                primary: "#009990", // Teal dari logo Technovate
                primaryHover: "#007f7a", // Versi hover yang lebih gelap dari teal
                secondary: "#06b6d4", // Cyan yang segar sebagai aksen
                background: {
                    DEFAULT: "#f9fafb", // Gray-50 (background umum light mode)
                    dark: "#111827", // Gray-900 (dark mode)
                },
                surface: {
                    light: "#ffffff", // Putih untuk kartu/light mode
                    dark: "#1f2937", // Gray-800 untuk kartu di dark mode
                },
                text: {
                    DEFAULT: "#1f2937", // Gray-800 (teks utama light mode)
                    light: "#6b7280", // Gray-500 (teks sekunder light mode)
                    dark: "#f3f4f6", // Gray-100 (teks utama dark mode)
                    soft: "#9ca3af", // Gray-400 (teks sekunder dark mode)
                },
                success: "#22c55e", // Green-500
                warning: "#facc15", // Amber-400
                danger: "#ef4444", // Red-500
                border: {
                    light: "#e5e7eb", // Gray-200
                    dark: "#374151", // Gray-700
                },
            },
        },
    },

    plugins: [forms, require("@tailwindcss/line-clamp")],
};
