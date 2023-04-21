// database.JS - arquivo de conexão com o baco de dados
// ele vai ler as variáveias de ambiente e tentar conectar ao MySQL

const { Sequelize } = require("sequelize");

// Criamos o objeto de conexão
const connection = new Sequelize(
  process.env.DB_NAME, // Nome reservado para o database
  process.env.DB_USER, // Usuário reservado para conexão
  process.env.DB_PASSWORD, // Senha para acesso ao banco

  {
    host: process.env.DB_HOST, // Endereço do banco
    dialect: "mysql", // O Banco que vai ser utilizado
  }
);

// Estabelecer conexão usando o objeto

async function authenticate(connection) {
  try {
    // Tentar estabelecer conexão
    await connection.authenticate();
    console.log("Conexão estabelecida com sucesso!");
  } catch (err) {
    console.log("Um erro inesperado aconteceu:", err);
  }
}

module.exports = { connection, authenticate };
