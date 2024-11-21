import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import './css/App.css';
import MainLayout from './layouts/MainLayout';
import NoNavbarLayout from './layouts/NoNavbarLayout';
import Contato from './Contato';
import Login from './components/login';
import Logout from './components/Logout';
import Register from './components/register';
import ProtectedRoute from './components/ProtectedRoute';
import { TemperatureChart, HumidityChart} from './ChartComponent';

function Home() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Climatização: Áreas Arborizadas vs. Áreas Sem Árvores</h1>
        <p>
          Bem-vindo ao nosso projeto que compara as condições de climatização em áreas arborizadas e áreas sem árvores.
          Explore os gráficos para entender as diferenças de temperatura, umidade e muito mais.
        </p>
        <a href="/grafico">Ver Gráficos</a>
      </header>
    </div>
  );
}

function Grafico() {
  return (
    <div>
      <h1>Gráficos Climatização</h1>
      <TemperatureChart />
      <HumidityChart />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route
          path="/login"
          element={
            <NoNavbarLayout>
              <Login />
            </NoNavbarLayout>
          }
        />
        <Route
          path="/register"
          element={
            <NoNavbarLayout>
              <Register />
            </NoNavbarLayout>
          }
        />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/grafico"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Grafico />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contato"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Contato />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Logout />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
