import User from "../models/User";

module.exports = {
    async getAll(_,res) {
        try {
            const users = await User.find().select('id_user tipo password -_id');
            if(users){
                return res.status(200).json(users);
            }else{
                return res.status(204).json({message:'Sem usuários cadastrados'})
            }
            
        } catch{
            return res.status(500).json({message:'Erro interno no servidor'});
        }
    },

    async getById(req, res) {
        const { id } = req.params;
        try{
            const user = await User.findOne({id_user:id});
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(204).json({message:'Usuário não encontrado'})
            }
        }catch{
            return res.status(500).json({message:'Erro interno no servidor'});
        }
    },

    async Insert(req, res) {
        const { id_user,tipo, password } = req.body;
        try {
            const aux = await User.findOne({id_user:id_user});
            if(aux){
                return res.status(208).json({message:'Usuário já existe'})
            }
            else{
                const user = new User ({ id_user,tipo, password });
                await user.save();
                return res.status(201).json(user);
            }
            
        } catch{
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    async Delete(req, res) {
        const { id_user } = req.params;
        try {
            const user_aux = await User.findOne({id_user:id_user})
            if(user_aux){
                const user = await User.findByIdAndDelete(id_user);
                return res.status(200).json('Usuário excluido :', user);
            }
            else{
                return res.status(204).json({message:'Usuário não encontrado'})
            }
        } catch{
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    async Update(req, res) {
        const { id_user } = req.params
        try{
            const user = await User.findOne({id_user:id_user});
            if (user) {
                const userupdate = await User.findOneAndUpdate({ id_user: id_user }, req.body, { new: true });
                return res.status(200).json({message:'Usuário atualizado', userupdate});
            } else {
                return res.status(204).json({message:'Usuário não encontrado'})
            }
        }
        catch {
            return res.status(500).json({message:'Erro interno no servidor'});
        }
    },
    async Login(req,res){
        require('dotenv-safe').config();
        const jwt = require('jsonwebtoken');
        const { id_user, password } = req.body

        try{
            const user_db = await User.findOne({id_user:id_user});
            if (user_db) {
                if(id_user === user_db.id_user && password === user_db.password){

                    const id = user_db.id_user;
                    const token = jwt.sign({ id }, process.env.SECRET, {expiresIn: '5h'});

                    return res.status(200).json({ auth: true, token: token });
                }
                
                return res.status(500).json({message: 'Login inválido!'});
            } else {
                return res.status(204).json({message:'Usuário não encontrado'})
            }
        }catch(error){
            return res.status(500).json({message:'Erro interno no servidor'});
        }
    }
};