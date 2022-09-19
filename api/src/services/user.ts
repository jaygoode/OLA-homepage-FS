import { NotFoundError } from '../helpers/apiError'
import User, { UserDocument } from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

const login = async (credentials: Partial<UserDocument>) => {
  const token = jwt.sign(JSON.stringify(credentials), JWT_SECRET, {
    algorithm: 'HS256',
  })
  const user = await User.find({ email: credentials.email })
  return user[0]
}

const getAllUsers = async (): Promise<UserDocument[]> => {
  return User.find()
}

const findUserById = async (userId: string): Promise<UserDocument> => {
  const user = await User.findById(userId)
  if (!user) {
    throw new NotFoundError(`User ${userId} not found.`)
  }
  return user
}

const createUser = async (newUser: UserDocument): Promise<UserDocument> => {
  return newUser.save()
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const user = User.findByIdAndDelete(userId)
  if (!user) {
    throw new NotFoundError(`User ${userId} not found.`)
  }
  return user
}

const updateUser = async (
  userId: string,
  userUpdate: Partial<UserDocument>
): Promise<UserDocument | null> => {
  if (userUpdate.password) {
    userUpdate.password = await bcrypt.hash(userUpdate.password, 10)
  }
  const user = await User.findById(userId)
  console.log('dbuser-' + user?.goingToEvent)
  console.log('updateuser-' + userUpdate.goingToEvent)
  if (user && user.goingToEvent == userUpdate.goingToEvent) {
    userUpdate.goingToEvent = null
    console.log('dbuserafterupdatenull-' + userUpdate?.goingToEvent)
    // return userUpdate
    const updatedUser = await User.findByIdAndUpdate(userId, userUpdate, {
      new: true,
    })
  }
  const updatedUser = await User.findByIdAndUpdate(userId, userUpdate, {
    new: true,
  })
  if (!user) {
    throw new NotFoundError(`User ${userId} not found.`)
  }
  console.log('userupdateupdated-' + userUpdate.goingToEvent)
  console.log(updatedUser)
  return updatedUser
}

export default {
  getAllUsers,
  findUserById,
  createUser,
  updateUser,
  login,
  deleteUser,
}
