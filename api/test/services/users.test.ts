import connect, { MongodHelper } from '../db-helper'
import request from 'supertest'
import app from '../../src/app'

import { user1, user2, user3 } from '../fixtures/users'
import User from '../../src/models/User'
import userService from '../../src/services/user'
import { verifyCredentials } from '../../src/middlewares/userMiddleware'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser() {
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

describe('test user service', () => {
  test('able to get all users', async () => {
    const users = await userService.getAllUsers()
    expect(users.length).toBe(3)
    expect(users[0].firstname).toEqual(user1.firstname)
    expect(users[1].lastname).toEqual(user2.lastname)
  })

  it('should get a user with id', async () => {
    const user = await createUser()
    const found = await userService.findUserById(user._id)
    expect(found.firstname).toEqual(user.firstname)
    expect(found._id).toEqual(user._id)
  })

  it('should create a user', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('firstname', 'johnny')
    expect(user).toHaveProperty('role', 'admin')
  })
  it('should update an existing user', async () => {
    const user = await createUser()
    const update = {
      firstname: 'jaimie',
    }
    const updated = await userService.updateUser(user._id, update)
    expect(updated).toHaveProperty('_id', user._id)
    expect(updated).toHaveProperty('firstname', 'jaimie')
  })

  it('should delete an existing user', async () => {
    expect.assertions(1)
    const user = await createUser()
    await userService.deleteUser(user._id)
    return userService.findUserById(user._id).catch((e) => {
      expect(e.message).toBe(`User ${user._id} not found.`)
    })
  })
  // it('should successfully create jwt token through login', async () => {
  //   const user = await createUser()
  //   const token = await userService.login({
  //     email: user.email,
  //     password: user.password,
  //   })
  //   return token
  //   expect(token).length.toBe(1)
  // })
})
