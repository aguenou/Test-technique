const getUser = (req, res)=>{
    res.status(200).json({message: 'Get user'})
}

const setUser = (req, res)=>{
    const {email,mdp} = req.body

    if(!(email && mdp)){
        res.status(400)
        throw new Error('Veuillez remplir tous les champs')
    }
    res.status(200).json({message: 'Set user'})
}

module.exports = {getUser, setUser}