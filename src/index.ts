import express from 'express';

const app = express();
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
