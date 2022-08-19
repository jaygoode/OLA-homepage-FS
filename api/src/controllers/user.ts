import { Request, Response, NextFunction } from 'express'
import User, { UserRole } from '../models/User'
import userService from '../services/user'

export const login = async (req: Request, res: Response) => {
  try {
    const token = await userService.login(req.body)
    res.status(200).json(token)
  } catch (e) {
    res.status(401).json('error creating token.')
  }
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await userService.getAllUsers())
  } catch (e) {
    return next(e)
  }
}

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userService.findUserById(req.params.userId))
  } catch (e) {
    return next(e)
  }
}

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstname, lastname, email, password, role } = req.body
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      role,
    })
    res.status(200).json(await userService.createUser(newUser))
  } catch (e) {
    res.status(401).send('unsuccessful ' + e)
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.userId
    const userUpdate = req.body
    res.status(200).send(await userService.updateUser(id, userUpdate))
  } catch (e) {
    return next(e)
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(req.params.userId)
    res.status(200).send('User successfully deleted.').end()
  } catch (e) {
    return next(e)
  }
}

export default {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  login,
  updateUser,
}
