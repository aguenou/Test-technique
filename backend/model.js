const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Ajoutez un email']
    },
    mdp:{
        type: String,
        required: [true, 'Ajoutez un mot de passe']
    }
})

module.exports = mongoose.model('User',userSchema)