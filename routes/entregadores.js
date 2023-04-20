//rotas
const Entregador = require("../database/entregador");

const { Router } = require("express");
const Pedido = require("../database/pedido");

const router = Router();

//GET
router.get("/entregador", async (req, res) => {
    const lista = await Entregador.findAll();
    res.json(lista);
});

router.get("/entregador/:id", async (req, res) => {
    const entregador = await Entregador.findOne({ where: { id: req.params.id } });

    try {
        if (entregador) {
            res.json(entregador);
        } else {
            res.status(404).json({ message: "Entregador não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Aconteceu um erro.", error });
    }
});



//POST
router.post("/entregador", async (req, res) => {
    const { nome, telefone, placa } = req.body;

    try {
        const novo = await Entregador.create({ nome, telefone, placa });
        res.status(201).json(novo);
    } catch (error) {
        res.status(500).json({ message: "Aconteceu um erro.", error });
    }
});

//recupera entregador excluído
router.put('/entregador/:id/restaurar', async (req, res) => {
    const { id } = req.params;
    try {
        // Busca o entregador excluído
        const entregador = await Entregador.findOne({
            where: { id },
            paranoid: false
        });
        if (!entregador) {
            return res.status(404).json({ message: 'Entregador não encontrado.' });
        }
        // Restaura o entregador, definindo deletedAt como null
        await entregador.restore();
        res.json({ message: 'Entregador restaurado com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao restaurar entregador.' });
    }
});

//PUT
router.put("/entregador/:id", async (req, res) => {
    const { nome, telefone, placa } = req.body;
    const { id } = req.params;
    try {
        const entregador = await Entregador.findOne({ where: { id } });
        if (entregador) {
            await entregador.update({ nome, telefone, placa }, { where: { id } });
            res.status(200).json({ message: "Entregador Atualizado com sucesso!", entregador });
        } else {
            res.status(404).json({ message: "Entregador não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Aconteceu um erro.", error })
    }
});


//PUT
router.put("/entregadores/:id/pedidos/:idPedido", async (req, res) => {
    const { id, idPedido } = req.params;
    try {
        const entregador = await Entregador.findOne({ where: { id } });
        const pedido = await Pedido.findOne({ where: { id: idPedido } });
        if (entregador && pedido) {
            await pedido.update({ entregadorId: entregador.id });
            res.status(200).json({ message: "Pedido vinculado ao entregador com sucesso!" });
        } else {
            res.status(404).json({ message: "Entregador ou pedido não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Aconteceu um erro.", error });
    }
});


//DELETE
router.delete("/entregador/:id", async (req, res) => {
    const entregador = await Entregador.findByPk(req.params.id);

    try {
        if (entregador) {
            //force: false - exclui ao invés de destruir
            await entregador.destroy({ force: false });
            res.status(200).json({ message: "Entregador excluído com sucesso!", entregador });
        } else {
            res.status(404).json({ message: "Entregador não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Aconteceu um erro.", error })
    }
});






module.exports = router;