// index -> listagem de sessões + 1
// show -> listar somente 1 sessão
//store -> criar uma sessão
//update -> criar uma sessão
// destroy -> deletar uma sessão
const User = require('../Models/User');

module.exports = {
    
    async store(req , res){
        const {email} = req.body;

        let user = await User.findOne({email});

        if(!user){
            user = await User.create({email});
        }
        
        return res.json(user);
    }
}