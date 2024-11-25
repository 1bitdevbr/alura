// Importa o framework Express para criar a aplicação web
import express from "express";

// Importa a biblioteca Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa a biblioteca Cors
import cors from "cors";

// Importa as funções controladoras do arquivo postsController.js
import {listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento para o Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define 'uploads/' como o diretório para uploads
  },

  // Define o nome do arquivo salvo
  filename: function (req, file, cb) {
    // Utiliza o nome original do arquivo por simplicidade (opcional: gerar nome único)
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {

  // Permite que o servidor interprete requisições com corpo no formato JSON
  app.use(express.json()); // Habilita o parseamento de dados JSON na requisição

  app.use(cors(corsOptions));

  // Rota para buscar todos os posts
  app.get("/posts", listarPosts); // Chama a função `listarPosts` para recuperar posts

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost); // Chama a função `postarNovoPost` para criar um post

  // Rota para upload de imagem única
  app.post("/upload", upload.single("imagem"), uploadImagem); // Utiliza `upload.single` para um arquivo e chama a função `uploadImagem`

  // Rota para atualizar novo Post
  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função `routes` para ser utilizada em outro lugar do código
export default routes;