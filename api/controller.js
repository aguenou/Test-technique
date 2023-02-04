import expressAsyncHandler from 'express-async-handler'
import User from './model.js'
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
const {sign} = Jwt


const asyncHandler = expressAsyncHandler

export const loginUser = asyncHandler(async (req, res)=>{
    const {email,mdp} = req.body

    //Vérifier si l'email et le mot de passe sont renseignés
    if(!(email && mdp)){
        res.status(400).json({message:'Veuillez remplir tous les champs' })
        throw new Error('Veuillez remplir tous les champs')
    }else{

        
        const userExist = await User().findOne({email})

        if(userExist && (await bcrypt.compare(mdp, userExist.mdp))){
            res.status(200).json({
                _id: userExist.id,
                email:userExist.email,
                token: generateToken(userExist._id)
            }) 
        }else{
            res.status(400).json({message: 'Veuillez vérifier les données entrées'}) 
            throw new Error("Veuillez vérifier les données entrées ") 
        }
    }

    

    
})


export const registerUser = asyncHandler(async (req, res)=>{
    console.log(User)
    const {email,mdp} = req.body

    if(!(email && mdp)){
        res.status(400).json({message:'Veuillez remplir tous les champs' })
        throw new Error('Veuillez remplir tous les champs')
    }
    
    const userExist = await User().findOne({email})

    if (userExist){
        res.status(400).json({message: 'Email déjà utilisé'})
        throw new Error('Email déjà utilisé')
    }

    //Hasher le mot de passe
    const salt = await bcrypt.genSalt(10)
    const hashMdp = await bcrypt.hash(mdp, salt)

    const user = await User().create({
        email,
        mdp:hashMdp
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            email:user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400).json({message: "Veuillez vérifier les données entrées "})
        //throw new Error("Veuillez vérifier les données entrées ")
    }

    res.status(200).json({message: 'Utilisateur enrégistré'})
})

export const listUsers = asyncHandler(async(req, res)=>{
    const users = await User().find({},{mdp:0})
    res.status(200).json({users})    
})

const generateToken = (id) =>{
    return sign({id}, process.env.JWT_SECRET,{
        expiresIn:'1d',
    })
}
