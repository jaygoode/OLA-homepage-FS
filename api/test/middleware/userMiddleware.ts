import connect, { MongodHelper } from '../db-helper'
import request from 'supertest'
import app from '../../src/app'

import { user1, user2, user3 } from '../fixtures/users'
import User from '../../src/models/User'
import userService from '../../src/services/user'
import { verifyCredentials } from '../../src/middlewares/userMiddleware'
import { hasUncaughtExceptionCaptureCallback } from 'process'

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


describe("testing verifyCredentials", async () => {
    test('wrong email should return error', async () => {
        const user = await createUser()
        const response = await request(app).post('/login').send(
            {
                email: "wrongemail@gmail.com",
                password: user.password
            }
        )
        expect(response.status).toBe(401)
        expect(response.text).toBe("Incorrect credentials.")
    })
    test('wrong password should return error', async () => {
        const user = await createUser()
        const response = await request(app).post('/login').send(
            {
                email: user.password,
                password: "wrongpassword123!"
            }
        )
        expect(response.status).toBe(401)
        expect(response.text).toBe("Incorrect credentials.")
    })
}