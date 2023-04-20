//tabela
const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Sequelize = require("sequelize");

const Pedido = require("./pedido");

const Entregador = connection.define("entregador", {
    //num = id
    nome: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            len: [1, 150],
        },
    },
    telefone: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 15],
        },
    },
    placa: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            len: [7],
            isUppercase: true,
        },
    },
},
    {
        //passa o paranoid como atributo
        paranoid: true
    }
);

Entregador.hasMany(Pedido, { onDelete: "CASCADE" });
Pedido.belongsTo(Entregador);

module.exports = Entregador;