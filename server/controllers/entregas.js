const Entrega = require('../models/entrega');
module.exports = {
    async getAll(req, res) {
        const { tipo } = req.params;
        if (tipo == 'usuario'){
            try {
                const entregas = await Entrega.find({ situacao: { $in: ['Aguardando', 'Em andamento'] }}).sort({ situacao: 1 }).select('id_entrega nome_cliente bairro situacao vendedor observacao hora_entrega data_entrega');
                return res.status(200).json(entregas);
            } catch{
                return res.status(500).json({message:'Erro interno no servidor'});
            }
        }

        if (tipo =='operador'){
            const { situacao, id_veiculo } = req.params;
            try {
                const entregas = await Entrega.find({ situacao, id_veiculo }).select('id_entrega nome_cliente bairro hora_entrega data_entrega observacao situacao');
                return res.status(200).json(entregas);
            } catch{
                return res.status(500).json({message:'Erro interno no servidor'});
            }
        }

        if (tipo =='caminhao'){
            const { situacao, id_veiculo } = req.params;
            try {
                const entregas = await Entrega.find({ situacao, id_veiculo }).select('id_entrega nome_cliente bairro');
                return res.status(200).json(entregas);
            } catch {
                return res.status(500).json({message:'Erro interno no servidor'});
            }
        }
    },

    async getLeast(req, res) {
        const { quantidade } = req.params;
        if(quantidade <= 0){
            return res.status(500).json('Quantidade de documentos selecionados deve ser maior que 0')
        }
        else{
            try {
                const entregas = await Entrega.find({ situacao: { $in: 'Entregue'}}).limit(quantidade).select('id_entrega nome_cliente bairro situacao vendedor observacao');
                res.status(200).json(entregas);
            } catch  {
                return res.status(500).json({ message: 'Erro interno no servidor' });
            }
        }
    },

    async getById(req, res,) {
        const { id_entrega } = req.params;
        try {
            const entrega = await Entrega.findOne({id_entrega:id_entrega});
            if (entrega) {
                return res.status(200).json(entrega);
            } else {
                return res.status(500).json('Entrega não encontrada');
            }
        } catch{
            return res.status(500).json({ message: 'Erro interno no servidor' });
        }
    },

    async createNew(req, res) {
        const { id_entrega, id_veiculo, nome_cliente, bairro, situacao, data_entrega, hora_entrega, observacao, vendedor } = req.body;
        try {
            const aux = await Entrega.findOne({id_entrega:id_entrega});
            if(aux){
                return res.status(201).json({message:'Entrega ja existe'});
            }
            else{
                const entrega = new Entrega ({ id_entrega, id_veiculo, nome_cliente, bairro, situacao, data_entrega, hora_entrega, observacao, vendedor });
                await entrega.save();
                return res.status(201).json(entrega);
            }
            
        } catch{
            return res.status(500).json({ message: 'Erro interno no servidor' });
        }
    },

    async deleteEntrega(req, res) {
        const { id_entrega } = req.params;
        try {
            const entrega_aux = await Entrega.findOne({id_entrega:id_entrega})
            if(entrega_aux){
                const entrega = await Entrega.findByIdAndDelete(id_entrega);
                return res.status(201).json('Entrega excluida :', entrega);
            }
            else{
                return res.status(500).json({message :'Entrega não existe ou já foi excluida' })
            }
        } catch{
            return res.status(500).json({ message: 'Erro interno no servidor' });
        }
    },

    async update(req, res) {
        try{
            const { tipo } = req.params;
            if(tipo == 'entrega'){
                const { id_entrega } = req.params;
                try {
                    const updatedEntrega = await Entrega.findOneAndUpdate({ id_entrega: id_entrega }, req.body, { new: true });
                    if (updatedEntrega) {
                        return res.status(200).json(updatedEntrega);
                    } else {
                        return res.status(500).json({message: "Entrega naõ existe ou não possui alterações"});
                    }
                }
                catch (error) {
                    return res.status(500).json({ error: 'Erro ao atualizar Entrega.' });
                }
            }
            if(tipo == 'veiculo'){
                const { id_entrega, id_veiculo, situacao } = req.params;
                try {
                    const updatedEntrega = await Entrega.findOneAndUpdate({ id_entrega: id_entrega }, { id_veiculo, situacao }, { new: true });
                    if (updatedEntrega) {
                        return res.status(200).json(updatedEntrega);
                    } else {
                        return res.status(500).json({message: "Entrega naõ existe ou não possui alterações"});
                    }
                } catch {
                    return res.status(500).json({ message: 'Erro interno no servidor' });
                }
            }
        }catch{
            return res.status(500).json({ message: 'Erro interno no servidor' });
        }
    },
};
