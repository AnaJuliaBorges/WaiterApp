# WaiterApp 🍽️

**WaiterApp** é uma aplicação para restaurantes que permite aos atendentes visualizar pedidos feitos por clientes em tempo real, controlar seu status e melhorar a comunicação com a cozinha.

---

## 🚀 Tecnologias Utilizadas

* **Backend**: Node.js + Express
* **Banco de Dados**: MongoDB (via Docker)
* **Comunicação em tempo real**: Socket.IO
* **Frontend Web**: React (com Vite)
* **Frontend Mobile**: React Native + Expo
* **Estilização**: Styled-components

---

## 📁 Estrutura do Projeto

```
WaiterApp/
├── api/         # Backend com Node e Express
├── frontend/    # Aplicativo Web com React
└── mobile/      # Aplicativo Mobile com React Native
```

---

## ⚙️ Instalação e Execução

### 1. Subir o MongoDB com Docker

```bash
docker run --name mongo-waiter -p 27017:27017 -d mongo
```

### 2. Iniciar o Backend

```bash
cd api
yarn install
yarn dev
```

O servidor ficará disponível em `http://localhost:3001`

### 3. Iniciar o Frontend Web

```bash
cd frontend
yarn install
yarn dev
```

Acesse `http://localhost:5173`

### 4. Iniciar o App Mobile (Expo)

```bash
cd mobile
yarn install
yarn start
```

Escaneie o QR code com o aplicativo Expo Go.

---

## 🔹 Funcionalidades

* Envio de pedidos pelos clientes
* Visualização de pedidos em tempo real pelo garçom
* Atualização de status dos pedidos (pendente, em preparo, finalizado)
* Notificações visuais e sonoras
* Integração com cozinha e setor de atendimento

---

## 🛠️ Variáveis de Ambiente

Crie um arquivo `.env` na pasta `api/` com:

```
PORT=3001
MONGO_URL=mongodb://localhost:27017
```

## 📢 Contato

Desenvolvido por [Ana Julia Borges](https://github.com/AnaJuliaBorges). Para dúvidas ou sugestões, abra uma issue.
