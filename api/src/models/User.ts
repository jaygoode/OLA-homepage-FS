import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export type UserRole = 'customer' | 'admin'

export interface UserDocument extends Document {
  firstname: string
  lastname: string
  email: string
  password: string
  role: UserRole
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<UserDocument>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (value: string) => {
    //     return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    //   },
    //   message: (props: any) => `${props.value} is not a valid email`,
    // },
  },
  password: {
    type: String,
    required: true,
    // validate: {
    //   validator: (value: string) => {
    //     return /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)
    //   },
    //   message: (props: any) => `${props.value} is not a valid password`,
    // },
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
  },
})

userSchema.pre<UserDocument>(
  'save',
  { document: true, query: false },
  async function (next) {
    if (this.isModified('password') || this.isNew) {
      try {
        this.password = await bcrypt.hash(this.password, 10)
        return next()
      } catch (error) {
        console.log(error)
      }
    }
  }
)

// userSchema.pre<UserDocument>('findOneAndUpdate', function (next) {
//   this.password = bcrypt.hashSync(this.password, 10)
//   next();
// })
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const User = mongoose.model<UserDocument>('User', userSchema)
export default User
