// Importando as dependências do sequelize para criar a tabela
const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const { connection } = require("./database");

// Define uma constante com a função que retorna um código aleatório de 6 dígitos
const DEFAULT_CODIGO = () => {
  let codigo = "";
  for (let i = 0; i < 6; i++) {
    codigo += Math.floor(Math.random() * 10);
  }
  return codigo;
};

// Define a tabela "pedido" com suas colunas e tipos de dados utilizando Sequelize e DataTypes
const Pedido = connection.define(
  "pedido",
  {
    cod: {
      type: Sequelize.STRING(6),
      allowNull: false,
      defaultValue: DEFAULT_CODIGO, // Define o valor padrão para a coluna "cod"
      unique: true, // Define a coluna "cod" como única
    },
    produto: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: [1, 150], // Define a quantidade de caracteres permitidos na coluna "produto"
      },
    },
    valor: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: [1, 150], // Define a quantidade de caracteres permitidos na coluna "valor"
      },
    },
    status: {
      type: Sequelize.STRING(150),
      allowNull: false,
      validate: {
        isIn: [["novo", "processando", "enviado", "entregue"]], // Define as opções de valores permitidos para a coluna "status"
      },
    },
    txEntrega: {
      type: DataTypes.STRING(150),
      validate: {
        len: [1, 150], // Define a quantidade de caracteres permitidos na coluna "txEntrega"
      },
    },
    cliente: {
      type: Sequelize.STRING(150),
      allowNull: false,
      validate: {
        len: [1, 150], // Define a quantidade de caracteres permitidos na coluna "cliente"
      },
    },
    endereco: {
      type: Sequelize.STRING(150),
      allowNull: false,
      validate: {
        len: [1, 150], // Define a quantidade de caracteres permitidos na coluna "endereco"
      },
    },
  },
  {
    paranoid: true, // Define a tabela como "paranóica", ou seja, não exclui definitivamente os dados
  }
);

module.exports = Pedido; // Exporta a tabela "pedido"
