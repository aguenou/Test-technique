import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Ajoutez un email'],
        unique: true
    },
    mdp:{
        type: String,
        required: [true, 'Ajoutez un mot de passe']
    },
},
{
    timestamps: true
})

const User = () => mongoose.model('User',userSchema)

export default User