import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;

    // Requisição para o servidor de autenticação
    const response = await fetch('https://sasaki-nature-foundation.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    

    if (response.ok) {
      const result = await response.json();
      console.log('Login bem-sucedido:', result);

      // Armazena o token no localStorage
      localStorage.setItem('authToken', result.token);

      // Redireciona para o dashboard ou página autenticada
      navigate('/');
    } else {
      console.error('Falha no login');
      alert('Usuário ou senha incorretos!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <FormField
          label="Usuário:"
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <FormField
          label="Senha:"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Entrar</button>
      </form>
      
      <div className="register-link">
      <p>Não tem uma conta? <button className="register-button" onClick={() => navigate('/register')}>Registre-se</button></p>
    </div>
    </div>
  );
  
}

// Componente de campo de formulário reutilizável
const FormField = ({ label, type, name, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);
