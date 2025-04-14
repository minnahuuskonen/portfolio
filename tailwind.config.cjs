const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			sm: "576px",
			md: "768px",
			lg: "960px",
		},
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				serif: ["Acme", ...defaultTheme.fontFamily.serif],
			},
			colors: {
				primary: {
					DEFAULT: "#327D6C",
					light: "#62AE9C",
					lightest: "#A0DBCB",
					dark: "#307162"
				},

			}
		},
	},
	plugins: [],
}
