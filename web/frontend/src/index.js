import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css'; // Se tiver estilos globais

// Renderiza o componente App na div com id 'root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);