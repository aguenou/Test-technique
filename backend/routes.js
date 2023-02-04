import express from 'express'
import { hasToken } from './middleware.js'
import {loginUser, registerUser, listUsers} from "./controller.js"

const router = express.Router()

router.post('/login',loginUser)
router.post('/register',registerUser)
router.get('/users',hasToken, listUsers) 

export default router