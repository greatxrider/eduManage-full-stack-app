import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './context/UserContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

import App from './App.jsx';

import './styles/reset.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider >
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
