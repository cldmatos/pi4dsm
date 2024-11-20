import React, { useState } from 'react';

function Contato() {
  // Estados para controlar os campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Função para tratar o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode tratar os dados, como enviá-los a uma API
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Mensagem:', message);
    alert('Mensagem enviada com sucesso!');
    // Limpa os campos após o envio
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container">
      <h1>Contato</h1>
      <p>Preencha o formulário abaixo para entrar em contato conosco.</p>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensagem:</label>
          <textarea
            id="message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}

export default Contato;
