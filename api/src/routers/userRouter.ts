import express from 'express'
import user from '../controllers/user'
import {
  verifyCredentials,
  verifyAdmin,
  verifyToken,
} from '../middlewares/userMiddleware'
import passport from 'passport'

const userRouter = express.Router()

// userRouter.get('',passport.authenticate('jwt'),verifyAdmin, user.getAllUsers)
userRouter.get('/', user.getAllUsers)
userRouter.post('/', user.createUser)
userRouter.post('/login', verifyCredentials, user.login)
userRouter.get('/:userId', user.getSingleUser)
userRouter.patch('/', user.updateUser)
userRouter.delete('/:userId', user.deleteUser)

export default userRouter
