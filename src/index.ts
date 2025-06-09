import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

mongoose.connect("mongodb://localhost:27017")
  .then(() => {
    const app = express();
    const PORT = 3001;

    app.use(express.json());
    app.use(router)

    app.listen(PORT, () => {
      console.log(`Servidor está rodando em http://localhost:${PORT}`);
    });
  })
  .catch(() => console.error("Erro ao conectar ao MongoDB"));


