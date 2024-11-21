import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove o token do localStorage
    localStorage.removeItem('authToken');
    console.log('Token removido. Redirecionando para o login.');

    // Redireciona para a página de login
    navigate('/login');
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Saindo...</h2>
    </div>
  );
}
