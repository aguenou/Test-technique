import expressAsyncHandler from 'express-async-handler'
import User from './model.js'
import * as Jwt from 'jsonwebtoken'



const jwt = Jwt

const asyncHandler = expressAsyncHandler

export const hasToken = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      
      token = req.headers.authorization.split(' ')[1]

      const decoded = Jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User().findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({message: 'Vous n\'etes pas autorisé'})
      throw new Error('Vous n\'etes pas autorisé')
    }
  }

  if (!token) {
    res.status(401).json({message: 'Vous n\'etes pas autorisé.Pas de token!'})
    throw new Error('Vous n\'etes pas autorisé.Pas de token!')
  }
})