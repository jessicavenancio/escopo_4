// Importação dos módulos
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

// Criação da aplicação
const app = express();

// Configurações de middleware
app.use(express.json()); // Middleware para tratar requisições com conteúdo em JSON
app.use(morgan("dev")); // Middleware para exibir logs das requisições no console

// Configuração do Swagger UI
const swagger = require("swagger-ui-express");
const swaggerDoc = require("./swagger/swagger.json"); // Carrega o arquivo JSON do Swagger
app.use("/api", swagger.serve, swagger.setup(swaggerDoc)); // Configura a rota /api para exibir a documentação do Swagger

// Configuração do Banco de Dados
const { connection, authenticate } = require("./database/database");
authenticate(connection); // Autentica a conexão com o banco de dados

// Configuração das rotas
const rotaPedidos = require("./routes/pedidos.js");
const rotaEntregadores = require("./routes/entregadores.js");
const rotaFiltragem = require("./routes/filtragem"); //

app.use(rotaPedidos); // Adiciona a rota de pedidos à aplicação
app.use(rotaEntregadores); // Adiciona a rota de entregadores à aplicação
app.use(rotaFiltragem); //

// Inicialização do servidor
app.listen(3000, () => {
  connection.sync({ force: true }); // Sincroniza o modelo de dados com o banco de dados, criando as tabelas se necessário 
  console.log("Servidor rodando em http://localhost:3000");
});
