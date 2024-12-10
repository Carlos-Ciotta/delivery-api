const Entrega = require('../models/entregas');
/*async function excluirPrimeirosRegistros() {
    try {
        // Esperar pela conclusão da operação deleteMany
        const resultado = await Entrega.deleteMany({ id_entrega: { $lt: 8000 } });

        // Exibir o número de documentos excluídos
        console.log(`Número de documentos excluídos: ${resultado.deletedCount}`);
        return resultado;
    } catch (error) {
        // Exibir e lançar o erro para tratamento posterior
        console.error('Erro ao excluir registros:', error);
        throw error;
    }
}*/
module.exports = {
    async getAll(req, res, next) {
        const { tipo } = req.params;
        if (tipo == 'usuario'){
            try {
                const entregas = await Entrega.find({ situacao: { $in: ['Aguardando', 'Em andamento'] }}).sort({ situacao: 1 }).select('id_entrega nome_cliente bairro situacao vendedor observacao hora_entrega data_entrega -_id');
                res.status(200).json(entregas);
            } catch (error) {
                next(error);
            }
        }

        if (tipo =='operador'){
            const { situacao, id_veiculo } = req.params;
            try {
                const entregas = await Entrega.find({ situacao, id_veiculo }).select('id_entrega nome_cliente bairro hora_entrega data_entrega observacao situacao -_id');
                res.status(200).json(entregas);
            } catch (error) {
                next(error);
            }
        }

        if (tipo =='operador2'){
            const { situacao, id_veiculo } = req.params;
            try {
                const entregas = await Entrega.find({ situacao, id_veiculo }).select('id_entrega nome_cliente bairro -_id');
                res.status(200).json(entregas);
            } catch (error) {
                next(error);
            }
        }
    },

    async getLeast(req, res, next) {
        const { quantidade } = req.params;
        if(quantidade <= 0){
            const erro = new Error ("Quantidade de documentos selecionados deve ser maior que 0");
            erro.status = 500;
            return next(erro);
        }
        else{
            try {
                const entregas = await Entrega.find({ situacao: { $in: 'Entregue'}}).limit(quantidade).select('id_entrega nome_cliente bairro situacao vendedor observacao -_id');
                res.status(200).json(entregas);
            } catch (error) {
                next(error);
            }
        }
    },

    async getById(req, res, next) {
        const { id_entrega } = req.params;
        try {
            const entrega = await Entrega.findOne({id_entrega:id_entrega});
            if (entrega) {
                res.status(200).json(entrega);
            } else {
                const erro = new Error("Entrega não encontrada");
                erro.status = 500;
                return next(erro);
            }
        } catch (error) {
            next(error);
        }
    },

    async createNew(req, res, next) {
        const { id_entrega, id_veiculo, nome_cliente, bairro, situacao, data_entrega, hora_entrega, observacao, vendedor } = req.body;
        try {
            const aux = await Entrega.findOne({id_entrega:id_entrega});
            if(aux){
                const erro = new Error ("Entrega já cadastrada");
                return next(erro);
            }
            else{
                const entrega = new Entrega ({ id_entrega, id_veiculo, nome_cliente, bairro, situacao, data_entrega, hora_entrega, observacao, vendedor });
                await entrega.save();
                res.status(201).json(entrega);
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar entrega.' });
        }
    },

    async deleteEntrega(req, res, next) {
        const { id_entrega } = req.params;
        try {
            const entrega_aux = await Entrega.findOne({id_entrega:id_entrega})
            if(entrega_aux){
                const entrega = await Entrega.findByIdAndDelete(id_entrega);
                return res.status(201).json('Entrega excluida :', entrega);
            }
            else{
                const erro = new Error ("Entrega não existe ou já foi excluida");
                erro.status = 500;
                return next(erro);
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir entrega.' });
        }
    },

    async update(req, res, next) {
        try{
            const { tipo } = req.params;
            if(tipo == 'entrega'){
                const { id_entrega } = req.params;
                try {
                    const updatedEntrega = await Entrega.findOneAndUpdate({ id_entrega: id_entrega }, req.body, { new: true });
                    if (updatedEntrega) {
                        res.status(200).json(updatedEntrega);
                    } else {
                        const erro = new Error ("Entrega não existe ou não possui alterações");
                        erro.status = 500;
                        return next(erro);
                    }
                }
                catch (error) {
                    res.status(500).json({ error: 'Erro ao atualizar Entrega.' });
                }
            }
            if(tipo == 'veiculo'){
                const { id_entrega, id_veiculo, situacao } = req.params;
                try {
                    const updatedEntrega = await Entrega.findOneAndUpdate({ id_entrega: id_entrega }, { id_veiculo, situacao }, { new: true });
                    if (updatedEntrega) {
                        res.status(200).json(updatedEntrega);
                    } else {
                        const erro = new Error ("Entrega não existe ou não possui alterações");
                        erro.status = 500;
                        return next(erro);
                    }
                } catch (error) {
                    res.status(500).json({ error: 'Erro ao atualizar Entrega.' });
                }
            }
        }catch(error){
            res.status(500).json({ error: 'Erro ao atualizar Entrega.' });
        }
    },
};
