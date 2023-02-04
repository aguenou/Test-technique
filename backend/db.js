const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log(`Connexion à la base de donnée réussie!: ${conn.connection.host}`.red)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB