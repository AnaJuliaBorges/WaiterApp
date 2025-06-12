# WaiterApp 🍽️

**WaiterApp**  is an app for restaurants that allows the kitchen to view orders placed by waiters in real time, monitor their status, and improve communication with the kitchen.

---

## 🚀 Technologies Used

* **Backend**: Node.js + Express + Typescript
* **Database**: MongoDB (via Docker)
* **Real-time communication**: Socket.IO
* **Web Frontend**: React (com Vite) + Typescript
* **Mobile Frontend**: React Native + Expo + Typescript
* **Stylization**: Styled-components

## 📁 Project Structure

```
WaiterApp/
├── api/  # Backend with Node and Express
├── web/  # Web application with React
└── app/  # Mobile Application with React Native
```

## ⚙️ Installation and Execution

### 1. Getting MongoDB up and running with Docker

```bash
docker run --name mongo-waiter -p 27017:27017 -d mongo
```

### 2. Start the Backend

```bash
cd api
yarn install
yarn dev
```

The server will be available at `http://localhost:3001`

### 3. Start the Web Frontend

```bash
cd web
yarn install
yarn dev
```

Access `http://localhost:5173`

### 4. Start the Mobile App (Expo)

```bash
cd app
yarn install
yarn start
```

Scan the QR code with the Expo Go app

## 🔹 Features

* Order submission by waiters
* Real-time order viewing by the kitchen
* Order status updates (pending, in preparation, completed)
* Visual and audible notifications
* Integration with the kitchen and service sector

## 📢 Contact

Developed by Ana Julia Borges [Linkedin](https://www.linkedin.com/in/anajuliaborges/) and [GitHub](https://github.com/AnaJuliaBorges).
