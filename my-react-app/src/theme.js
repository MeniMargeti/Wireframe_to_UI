import { createTheme } from "@mui/material";

import { adjustColors, colorSuggestions } from "./utils/index.js";

import "./index.scss";
import colors from "./_colors.scss";

const theme = createTheme({
	palette: {
		primary: {
			main: colors.primary,
			light: adjustColors(colors.primary, 100),
			dark: adjustColors(colors.primary, -30),
		},
		secondary: {
			main: colors.secondary || colorSuggestions.secondary,
			light: adjustColors(colors.secondary || colorSuggestions.secondary, 100),
			dark: adjustColors(colors.secondary || colorSuggestions.secondary, -30),
		},
		third: {
			main: colors.third || colorSuggestions.third,
			light: adjustColors(colors.third || colorSuggestions.third, 100),
			dark: adjustColors(colors.third || colorSuggestions.third, -30),
		},

		success: { main: colors.success },
		error: { main: colors.error },
		warning: { main: colors.warning },
		info: { main: colors.info },

		dark: { main: colors.dark },
		light: { main: colors.light },
		grey: { main: colors.grey, light: colors.greyLight, dark: colors.greyDark },
		green: { main: colors.green },
		white: { main: "#ffffff" },
	},
	typography: {
		fontFamily: "Commissioner, serif",
	},
	shape: {
		borderRadius: "5px",
	}
});

export default theme;
