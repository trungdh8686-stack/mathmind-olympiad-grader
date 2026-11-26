import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { systemConfigService } from './services/systemConfigService';

// Pre-fetch global centralized cloud config (ChatGPT Plus & Gemini Pro keys)
systemConfigService.init().catch(console.warn);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
