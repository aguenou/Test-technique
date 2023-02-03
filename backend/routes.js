const express = require("express")
const router = express.Router()
const {getUser, setUser} = require("./controller")

router.get('/',getUser)

router.post('/',setUser)
module.exports=router