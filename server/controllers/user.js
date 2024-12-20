import User from "../models/User";

module.exports = {
    async getAll(res) {
        try {
            const users = await User.find().select('id_user tipo password -_id');
            if(users){
                res.status(200).json(users);
            }else{
                res.status(204).json({message:'Sem usuários cadastrados'})
            }
            
        } catch (error) {
            res.status(500).json({message:'Erro interno no servidor'});
        }
    },

    async getById(req, res) {
        const { id } = req.params;
        try{
            const user = await User.findOne({id_user:id});
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(204).json({message:'Usuário não encontrado'})
            }
        }catch(error){
            res.status(500).json({message:'Erro interno no servidor'});
        }
    },

    async Insert(req, res) {
        const { id_user,tipo, password } = req.body;
        try {
            const aux = await User.findOne({id_user:id_user});
            if(aux){
                res.status(208).json({message:'Usuário já existe'})
            }
            else{
                const user = new User ({ id_user,tipo, password });
                await user.save();
                res.status(201).json(user);
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    async Delete(req, res) {
        const { id_user } = req.params;
        try {
            const user_aux = await User.findOne({id_user:id_user})
            if(user_aux){
                const user = await User.findByIdAndDelete(id_user);
                res.status(200).json('Usuário excluido :', user);
            }
            else{
                res.status(204).json({message:'Usuário não encontrado'})
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    async Update(req, res) {
        const { id_user } = req.params
        try{
            const user = await User.findOne({id_user:id_user});
            if (user) {
                const userupdate = await User.findOneAndUpdate({ id_user: id_user }, req.body, { new: true });
                res.status(200).json({message:'Usuário atualizado', userupdate});
            } else {
                res.status(204).json({message:'Usuário não encontrado'})
            }
        }
        catch (error) {
            res.status(500).json({message:'Erro interno no servidor'});
        }
    },
};