import { Request, Response, NextFunction } from 'express'
import User, { UserRole, UserDocument } from '../models/User'
import { UnauthorizedError } from '../helpers/apiError'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

export const verifyCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body
  const foundUser = await User.findOne({ email: email })
  if (foundUser) {
    const checkPassword = await foundUser.comparePassword(password)
    if (checkPassword) {
      next()
    } else {
      res.status(401).send('Incorrect credentials.')
    }
  } else {
    res.status(401).send('Incorrect credentials.')
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const authHeader = req.headers['authorization']
  // const token = authHeader && authHeader.split(' ')[1]
  // if (token == null) return res.sendStatus(401)
  const token = req.body

  jwt.verify(token, JWT_SECRET, (error: any, credentials: any) => {
    if (error) return res.sendStatus(403)
    req.user = credentials
    next()
  })
}

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body.user
  if (user?.role === 'admin') {
    next()
  } else {
    throw new UnauthorizedError('401', 'You do not have right to access')
  }
}
