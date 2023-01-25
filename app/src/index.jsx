import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomRouter } from './components/menu/CustomRouter';
import { historyNavigate } from './constants/HistoryConfigure';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CustomRouter history={historyNavigate}>
    <App />
  </CustomRouter>
);
