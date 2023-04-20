//rotas
const { where } = require("sequelize");
const Pedido = require("../database/pedido");
const Entregador = require("../database/entregador");

const {Router} = require("express");

const router = Router();

//GET
router.get("/pedidos", async (req, res) =>{
    const lista = await Pedido.findAll();
    res.json(lista);
});

router.get("/pedidos/:id", async (req, res) =>{
    const pedido = await Pedido.findOne({where : { id : req.params.id}});

    try {
        if(pedido){
            res.json(pedido);
        }else{
            res.status(404).json({ message: "Pedido não encontrado!"});
        }
    } catch (error) {
        res.status(500).json({ message: "Aconteceu um erro.", error});
    }
});

//POST
router.post("/pedidos", async (req, res)=>{
    const {produto, valor, status, txEntrega, cliente, endereco} = req.body;

    try {
        const novo = await Pedido.create({produto, valor, status, txEntrega, cliente, endereco});
        res.status(201).json(novo);
    } catch (error) {
        res.status(500).json({ message: "Aconteceu um erro.", error});
    }
});

// PUT
router.put("/pedidos/:id", async (req,res) =>{
    const {produto, valor, status, txEntrega, endereco} = req.body;
    const {id} = req.params;
    try {
        const pedido = await Pedido.findOne({where: {id}});
        if(pedido){
            await Pedido.update({produto, valor, status, txEntrega, endereco}, {where: {id}});
            res.status(200).json({ message: "Pedido Atualizado com sucesso!", pedido});
        }else{
            res.status(404).json({ message: "Pedido não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Aconteceu um erro.", error })
    }
});

//DELETE
router.delete("/pedidos/:id", async (req, res) =>{
    const pedido = await Pedido.findByPk(req.params.id);
    
    try {
        if(pedido){
            await pedido.destroy({force: false});
            res.status(200).json({ message: "Pedido excluído com sucesso!", pedido});
        }else{
            res.status(404).json({ message: "Pedido não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Aconteceu um erro.", error })
    }
});

module.exports = router;