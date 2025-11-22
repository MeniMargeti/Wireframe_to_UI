// my-react-app/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Βεβαιώσου ότι αυτό το αρχείο υπάρχει και είναι άδειο ή έχει βασικά resets

// Import Material-UI ThemeProvider and createTheme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Για βασικά CSS resets του Material-UI

// Import BrowserRouter for routing (το Header.js το χρησιμοποιεί)
import { BrowserRouter } from 'react-router-dom';

// *Προαιρετικά*: Αν χρησιμοποιείς Auth0 για authentication στο Header.js
// import { Auth0Provider } from '@auth0/auth0-react';

// Ορισμός ενός βασικού Material-UI θέματος
// Αυτό το θέμα ορίζει τα χρώματα, την τυπογραφία κ.λπ. που χρησιμοποιούν τα Material-UI components.

import colors from "./colors.module.scss";
import { adjustColors, colorSuggestions } from "./utils/index.js";

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
});

export default theme;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter: Απαραίτητο για τα links και το routing (χρησιμοποιείται από το Header.js) */}
    <BrowserRouter>
      {/* ThemeProvider: Παρέχει το θέμα του Material-UI σε όλα τα components της εφαρμογής */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline: Επαναφέρει τα CSS style του browser για να ταιριάζουν με το Material-UI design */}
        <CssBaseline />

        {/* Auth0Provider: Ξεσχολίασέ το ΚΑΙ ΣΥΜΠΛΗΡΩΣΕ ΤΑ ΔΙΚΑ ΣΟΥ ΣΤΟΙΧΕΙΑ Auth0
            Μόνο αν το Header.js σου χρησιμοποιεί ενεργά το useAuth0 hook.
            Αλλιώς, άφησέ το σχολιασμένο ή αφαίρεσέ το.
        */}
        {/*
        <Auth0Provider
          domain="YOUR_AUTH0_DOMAIN" // <--- ΑΝΤΙΚΑΤΑΣΤΗΣΕ ΜΕ ΤΟ ΔΙΚΟ ΣΟΥ Auth0 DOMAIN
          clientId="YOUR_AUTH0_CLIENT_ID" // <--- ΑΝΤΙΚΑΤΑΣΤΗΣΕ ΜΕ ΤΟ ΔΙΚΟ ΣΟΥ Auth0 CLIENT ID
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <App />
        </Auth0Provider>
        */}
        
        {/* Render App component (το οποίο πλέον περιέχει το GeneratedUI) */}
        <App />
        
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);