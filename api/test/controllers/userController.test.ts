import connect, { MongodHelper } from '../db-helper'
import { user1, user2, user3 } from '../fixtures/users'
import User from '../../src/models/User'
import userService from '../../src/services/user'
import { verifyCredentials } from '../../src/middlewares/userMiddleware'
import request from 'supertest'
import app from '../../src/app'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  login,
  updateUser,
} from '../../src/controllers/user'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function CreateUser() {
  const user = new User({
    firstname: 'johnny',
    lastname: 'nylund',
    email: 'johnny@gmail.com',
    password: '@Aa123',
    role: 'admin',
  })
  return await userService.createUser(user)
}

let mongoHelper: MongodHelper

beforeAll(async () => {
  mongoHelper = await connect()
})

beforeEach(async () => {
  await User.insertMany([user1, user2, user3])
})

afterEach(async () => {
  await mongoHelper.clearDatabase()
})

afterAll(async () => {
  await mongoHelper.closeDatabase()
})

describe('user controller', () => {
  it('should get all users', async () => {
    const response = await request(app).get('/users')
    expect(response.status).toBe(200)
  })
  it('should get single user by id', async () => {
    const user = await CreateUser()
    const response = await request(app).get(`/users/${user._id}`)
    expect(response.status).toBe(200)
  })
  it('should create user', async () => {
    const response = await request(app).post(`/users/`).send({
      firstname: 'kevin',
      lastname: 'bacon',
      email: 'kevb@gmail.com',
      password: '@Aa123',
      role: 'customer',
    })
    expect(response.status).toBe(200)
  })
  it('should update user', async () => {
    const user = await CreateUser()
    const response = await request(app).patch(`/users/${user._id}`).send({
      firstname: 'kelly',
      lastname: 'johnson',
    })
    expect(response.status).toBe(200)
    expect(response.body.firstname).toBe('kelly')
  })
  it('should delete user', async () => {
    const user = await CreateUser()
    const response = await request(app).delete(`/users/${user._id}`)
    expect(response.status).toBe(200)
    expect(response.text).toBe('User successfully deleted.')
  })
})
