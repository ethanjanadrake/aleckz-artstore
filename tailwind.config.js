module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: {
					100: "#FFEAAA",
					200: "#D4BA6A",
					300: "#AA8E39",
					400: "#806516",
					500: "#554000",
				},
				secondary: {
					100: "#8F78AD",
					200: "#6B4E90",
					300: "#4B2D73",
					400: "#311557",
					500: "#1C053A",
				},
				tertiary: {
					100: "#718EA4",
					200: "#496D89",
					300: "#294F6D",
					400: "#123752",
					500: "#042137",
				},
			},
			fontFamily: {
				title: ["Josefin Sans", "sans-serif"],
				normal: ["Roboto", "sans-serif"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
