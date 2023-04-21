const { connection } = require("./database"); // Importa a conexão com o banco de dados
const Sequelize = require("sequelize"); // Importa a biblioteca Sequelize para criar o modelo da tabela
const Pedido = require("./pedido"); // Importa o modelo da tabela de pedidos

const Entregador = connection.define(
  "entregador", // Define o nome da tabela
  {
    nome: {
      type: Sequelize.STRING(150), // Define o tipo e tamanho da coluna "nome"
      allowNull: false, // Define que essa coluna não pode ser nula
    },
    telefone: {
      type: Sequelize.STRING(50), // Define o tipo e tamanho da coluna "telefone"
      allowNull: false, // Define que essa coluna não pode ser nula
    },
    placa: {
      type: Sequelize.STRING(150), // Define o tipo e tamanho da coluna "placa"
      allowNull: false, // Define que essa coluna não pode ser nula
      unique: true, // Define que essa coluna tem um valor único na tabela
    },
  },
  {
    paranoid: true, // Define que a tabela terá soft delete, ou seja, registros não serão deletados fisicamente
  }
);

Entregador.hasMany(Pedido, { onDelete: "CASCADE" }); // Define que um entregador pode ter vários pedidos
Pedido.belongsTo(Entregador); // Define que um pedido pertence a um entregador

module.exports = Entregador; // Exporta o modelo da tabela de entregadores
