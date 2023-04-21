const { Op } = require("sequelize"); // importa o operador de comparação 'Op' do Sequelize
const { Router } = require("express"); // importa a classe Router do Express
const Pedido = require("../database/pedido"); // importa o modelo Pedido do banco de dados
const Entregador = require("../database/entregador"); // importa o modelo Entregador do banco de dados

const router = Router(); // cria uma instância do Router

// define uma rota para buscar entregadores por placa
router.get("/entregadores/placa", async (req, res) => {
  const { placa } = req.query; // extrai o valor da query string 'placa'
  const where = placa ? { placa: { [Op.like]: `%${placa}%` } } : {}; // define a condição de busca com base no valor de 'placa'
  try {
    const entregadores = await Entregador.findAll({ where }); // busca os entregadores no banco de dados
    res.json(entregadores); // retorna a lista de entregadores como uma resposta JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar entregadores." }); // retorna uma mensagem de erro caso haja falha na consulta
  }
});

// define uma rota para buscar pedidos por código
router.get("/pedido/cod", async (req, res) => {
  const { cod } = req.query; // extrai o valor da query string 'cod'
  const where = cod ? { cod: { [Op.like]: `%${cod}%` } } : {}; // define a condição de busca com base no valor de 'cod'
  try {
    const pedidos = await Pedido.findAll({ where }); // busca os pedidos no banco de dados
    res.json(pedidos); // retorna a lista de pedidos como uma resposta JSON
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar pedidos." }); // retorna uma mensagem de erro caso haja falha na consulta
  }
});

module.exports = router; // exporta o Router para uso em outros módulos da aplicação
