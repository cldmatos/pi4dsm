import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'; // Arquivo CSS opcional para estilização

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validação de formulário
    if (!formData.name || !formData.email || formData.password.length < 6) {
      alert('Por favor, preencha todos os campos e certifique-se de que a senha tenha pelo menos 6 caracteres.');
      return;
    }

    // Envia uma requisição para o servidor de autenticação
    const response = await fetch('https://sasaki-nature-foundation.onrender.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Usuário registrado com sucesso!');
      navigate('/login'); // Redireciona para a página de login após o registro
    } else {
      const errorData = await response.json();
      alert(`Erro ao registrar usuário: ${errorData.message || 'Erro desconhecido.'}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <FormField
          label="Nome:"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormField
          label="Email:"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormField
          label="Senha:"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
      </form>
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
