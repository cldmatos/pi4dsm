# Projeto de Climatização: Áreas Arborizadas vs. Áreas Sem Árvores
Este projeto é uma aplicação web que permite comparar as condições de climatização em áreas arborizadas e áreas sem árvores. O objetivo é conscientizar sobre os benefícios de áreas arborizadas, monitorando e exibindo dados de temperatura e umidade coletados via um dispositivo IoT (Arduino). A aplicação inclui um backend em Node.js para gerenciar a API e um frontend em React para exibir visualmente os dados em gráficos interativos.

## Funcionalidades
- **Visualização de dados de temperatura e umidade**: Gráficos que comparam condições entre áreas arborizadas e áreas sem árvores.
- **API RESTful**: Backend que fornece dados de temperatura e umidade em tempo real do MongoDB.
- **Documentação OpenAPI**: Documentação da API com Swagger para facilitar a compreensão e o teste de endpoints.

## Tecnologias Utilizadas
- **Banco de dados/**: MongoDB Atlas
- **backend/**: Node.js, Express, MongoDB
- **frontend/**: React com React Router, Chart.js
- **Documentação/**: Swagger (OpenAPI)
- **Outros/**: Grafana para visualização avançada dos dados, caso desejado

## Estrutura do Projeto
├── frontend/           # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes dos gráficos (TemperatureChart, HumidityChart, etc.)
│   │   ├── App.js         # Configuração de rotas e componentes principais
│   │   ├── Navbar.js      # Barra de navegação
│   │   └── ...
│   └── ...
├── backend/            # Servidor Express e configuração da API
│   ├── server.js        # Servidor Node.js com rotas para a API
│   ├── .env             # Variáveis de ambiente, incluindo MONGO_URI
│   └── ...
├── README.md           # Documentação do projeto
└── openapi.yaml        # Descrição OpenAPI (Swagger) da API

## Pré-requisitos
Node.js (versão 14 ou superior)
MongoDB Atlas: Banco de dados na nuvem com conexão configurada
NPM ou Yarn: Para instalar pacotes e dependências

### Backend

#### Configuração e Execução

1. Instale as dependências: `backend`:
   ```cd backend
    npm install
   ```

2. Configuração do MongoDB:
   ```
    MONGO_URI= Configure a URL
    PORT=5000
   ```

3. Inicie o servidor
   ```node server.js
   ```

### Frontend

#### Configuração e Execução

1. Instale as dependências necessárias:
   ```cd frontend
    npm install
   ```

2. Navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```

## Endpoints da API

- **GET /api/data/**: Retorna dados de temperatura ou umidade.
Parâmetro: type (temperature ou humidity)
- **GET /api/data/:id**: Retorna dados específicos de um sensor.
- **POST /api/data**: Cadastra novo dado de sensor.
- **PUT /api/data/:id**: Atualiza dado de sensor específico.
- **DELETE /api/data/:id**: Deleta dado de sensor específico.
- **GET /api/sensors**: Retorna lista de todos os sensores.
- **POST /api/sensors**: Cadastra novo sensor.
- **PUT /api/sensors/:id**: Atualiza sensor específico.

-**Exemplo de resposta**:
```[
    {
        "timestamp": "2024-10-29T12:00:00Z",
        "temperature": 22,
        "area_type": "arborizada"
    },
    {
        "timestamp": "2024-10-29T12:00:00Z",
        "temperature": 30,
        "area_type": "sem_arvores"
    }
    ]
```
#### Componentes do Frontend

- **TemperatureChart/**: Gráfico de linha mostrando comparações de temperatura.
- **HumidityChart/**: Gráfico de barras para dados de umidade.
- **ComparisonChart/**: Gráfico radar comparativo para visualização geral dos dados.

#### Anotações sobre o Projeto
**Coleta de Dados/**: Dados de temperatura e umidade são coletados de um dispositivo IoT, com as medições salvas no MongoDB em uma coleção chamada arduino_data.
**MongoDB Compass:/**: Ferramenta recomendada para explorar o banco de dados MongoDB localmente.

# Mobile

Este é um aplicativo Flutter que utiliza autenticação e exibe dados relacionados à *medição de temperaturas, **umidades, e **áreas arbóreas e não arbóreas. Os dados são obtidos via API e apresentados aos usuários autenticados em um **dashboard* interativo.
## ✨ Funcionalidades
- Tela de *login*.
- Tela de *registro* para novos usuários.
- Redirecionamento automático para o *dashboard* após login bem-sucedido.
- Exibição de dados de medição de temperaturas, umidades e áreas.
- Consumo de dados por API externa.

## 🛠️ Pré-requisitos

Antes de começar, você precisa ter o seguinte instalado:
- [Flutter](https://flutter.dev/docs/get-started/install)
- Dart SDK (incluído no Flutter)
- Editor de texto/IDE como [Visual Studio Code](https://code.visualstudio.com/) ou [Android Studio](https://developer.android.com/studio)

Certifique-se de configurar corretamente o ambiente de desenvolvimento Flutter com todos os emuladores ou dispositivos físicos necessários.

## 🚀 Como executar o projeto

1. *Clone este repositório*:
   ```bash
   git clone https://github.com/cldmatos/pi4dsm.git
   cd mobile
   escolha o seu dispositivo android
   flutter run

## 📁 Estrutura do Projeto

- *main.dart*: Ponto de entrada principal do aplicativo.
- *login_screen.dart*: Tela de login para autenticar usuários.
- *register_screen.dart*: Tela de registro para novos usuários.
- *dashboard_screen.dart*: Tela que exibe os dados obtidos da API.

### 📋 Detalhes das Telas

#### 🖥️ Tela de Login (login_screen.dart)
- Permite que usuários façam login fornecendo *email* e *senha*.
- Usa uma API para autenticação.
- Em caso de sucesso:
  - O token é gerenciado via JWT token.
  - O usuário é redirecionado para o *dashboard*.

#### 📊 Tela de Dashboard (dashboard_screen.dart)
- Exibe informações de:
  - *Temperaturas*
  - *Umidades*
  - *Áreas arbóreas e não arbóreas*
- Dados são carregados de uma API externa.
- O layout é amigável, com foco em *gráficos* e *tabelas interativas*.

---

## 🔑 Autenticação

- Gerenciada com a biblioteca shared_preferences, que armazena tokens JWT localmente.
- Após o login bem-sucedido:
  - O token JWT é salvo.
  - O app redireciona automaticamente para o *dashboard* na próxima execução.

---

## 🌟 Rotas

- /: Tela inicial dinâmica com base no estado de autenticação.
- /register: Tela de registro.
- /dashboard: Tela do dashboard.

---

## 🧩 Dependências Utilizadas

- **[flutter/material.dart](https://api.flutter.dev/flutter/material/material-library.html)**: Framework para construção da interface.
- **[shared_preferences](https://pub.dev/packages/shared_preferences)**: Biblioteca para armazenamento local de dados.
- **[http](https://pub.dev/packages/http)**: Biblioteca para consumir APIs REST.

---
## 🔑 API

- API feita em node.js e Express.
- https://github.com/JoaoPedroaac/Sasaki_nature_Foundation
- API com deploy efetuado com sucesso no Render.
- https://sasaki-nature-foundation.onrender.com/

## Contribuição
- Leonardo Victor Pereira Ferreira
- João Pedro Andrade Cintra
- Claudio Matos

## Video Pitch
https://youtu.be/zsnj2vMGuto

