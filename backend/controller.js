const User = require("./model")

const getUser = async (req, res)=>{
    const users = await User.find()
    res.status(200).json(users)
}

const setUser = async (req, res)=>{
    const {email,mdp} = req.body

    if(!(email && mdp)){
        res.status(400)
        throw new Error('Veuillez remplir tous les champs')
    }
    
    const users = await User.create({
        email:email,
        mdp:mdp
    })
    res.status(200).json(users)
}

module.exports = {getUser, setUser}