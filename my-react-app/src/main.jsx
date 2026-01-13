// my-react-app/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Βεβαιώσου ότι αυτό το αρχείο υπάρχει και είναι άδειο ή έχει βασικά resets
import CssBaseline from '@mui/material/CssBaseline'; // Για βασικά CSS resets του Material-UI
import { BrowserRouter } from 'react-router-dom';
import colors from "./colors.module.scss";
import { adjustColors, colorSuggestions } from "./utils/index.js";
import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter: Απαραίτητο για τα links και το routing (χρησιμοποιείται από το Header.js) */}
    <BrowserRouter>
      {/* ThemeProvider: Παρέχει το θέμα του Material-UI σε όλα τα components της εφαρμογής */}
      <ThemeProvider theme={theme}>
        {}
        <CssBaseline />

        {}
        {}
        
        {}
        <App />
        
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
