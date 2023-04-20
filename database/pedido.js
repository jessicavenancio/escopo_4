//tabela
const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const { connection } = require("./database");

// Use constantes para valores padrão
const DEFAULT_CODIGO = () => {
    let codigo = "";
    for (let i = 0; i < 6; i++) {
        codigo += Math.floor(Math.random() * 10);
    }
    return codigo;
};

const Pedido = connection.define("pedido", {
    //num = id
    cod: {
        type: Sequelize.STRING(6),
        allowNull: false,
        defaultValue: DEFAULT_CODIGO,
        unique: true,
    },
    produto: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            len: [1, 150],
        },
    }, valor: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            len: [1, 150],
        },
    },
    status: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            isIn: [["novo", "processando", "enviado", "entregue"]],
        },
    },
    txEntrega: {
        type: DataTypes.STRING(150),
        validate: {
            len: [1, 150],
        },
    },
    cliente: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            len: [1, 150],
        },
    },
    endereco: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            len: [1, 150],
        },
    },
},
    {
        paranoid: true
    }
);

module.exports = Pedido;