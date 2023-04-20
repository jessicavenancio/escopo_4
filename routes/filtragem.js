const Entregador = require("../database/entregador");
const { Op } = require("sequelize");

const { Router } = require("express");
const Pedido = require("../database/pedido");

const router = Router();

//filtragem placa pois é única
router.get('/entregadores/placa', async (req, res) => {
    const { placa } = req.query;
    const where = placa ? { placa: { [Op.like]: `%${placa}%` } } : {};
    
    try {
        const entregadores = await Entregador.findAll({ where }); 
        res.json(entregadores);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar entregadores.' });
    }
});

//filtra pedido por código
router.get('/pedido/cod', async (req, res) => { 
    const { cod } = req.query;
    const where = cod ? { cod: { [Op.like]: `%${cod}%` } } : {};
    
    try {
        const pedidos = await Pedido.findAll({ where }); 
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar pedidos.' });
    }
});


module.exports = router;