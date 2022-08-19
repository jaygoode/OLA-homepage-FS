import User from '../../src/models/User'

export const user1 = new User({
  firstname: 'sonny',
  lastname: 'grove',
  email: 'sannsda@gmail.com',
  password: 'asd',
  role: 'admin',
})

export const user2 = new User({
  firstname: 'mike',
  lastname: 'mikey',
  email: 'mikey@gmail.com',
  password: '1234',
  role: 'customer',
})

export const user3 = new User({
  firstname: 'john',
  lastname: 'johnson',
  email: 'johnnyjohn@gmail.com',
  password: 'asd1234',
  role: 'customer',
})
