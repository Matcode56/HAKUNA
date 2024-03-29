import { prisma } from '../../database'
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { sendMail } from '../../mail/mailer'

require('dotenv').config()
const { JWT_SECRET } = process.env

export const Mutation = {
  createProject: (
    parent: any,
    args: {
       description: string; name: string; deadline: string; createdAt: string; owner_id: any 
}
  ) => {
    return prisma.projects.create({
      data: {
        description: args.description,
        name: args.name,
        deadline: args.deadline,
        createdAt: args.createdAt,
        owner_id: args.owner_id,
      },
    })
  },

  updateProject: (parent: any, args: { id: String; description: string; name: string; deadline: string; owner_id: number }) => {
    return prisma.projects.update({
      where: { id: Number(args.id) },
      data: {
        description: args.description !== null ? args.description : undefined,
        name: args.name !== null ? args.name : undefined,
        deadline: args.deadline !== null ? args.deadline : undefined,
        owner_id: args.owner_id !== null ? args.owner_id : undefined
      },
    })
  },

  deleteProject: (parent: any, args: { id: String }) => {
    //A FAIRE Supression en cascade
    return prisma.projects.delete({
      where: {
        id: Number(args.id),
      },
    })
  },

  createUser: async (
    parent: any,
    args: { firstname: string; lastname: string; email: string; password: string; tel: string }
  ) => {
    const password: string = await cryptagePassword(args.password)

    async function cryptagePassword(password: string) {
      const salt = await bcrypt.genSalt()
      const passwordHashed = await bcrypt.hash(password, salt)
      return passwordHashed
    }
    return prisma.users.create({
      data: {
        firstname: args.firstname,
        lastname: args.lastname,
        password: password,
        tel: Number(args.tel),
        email: args.email,
      },
    })
  },

  updateUser: async (
    parent: any,
    args: { id: string; firstname: string; lastname: string; email: string; password: string; tel: number },
    decodedToken: any
  ) => {
    const idUser = decodedToken.id
    const idUserToUpdate = args.id
    if (idUser != idUserToUpdate) throw new Error(`You don't have the rights to modify this user.`)

    const user = await prisma.users.findUnique({ where: { id: Number(args.id) } })
    if (!user) throw new Error('id invalid')

    const email = args.email ? await checkEmail(args.email) : user.email
    const firstname = args.firstname ? args.firstname : user.firstname
    const lastname = args.lastname ? args.lastname : user.lastname
    const tel = args.tel ? args.tel : user.tel

    async function checkEmail(emailToCheck: string) {
      if (emailToCheck !== args.email) {
        const email = await prisma.users.findUnique({ where: { email: emailToCheck } })
        if (email) throw new Error('email déja utilisé')
      }
      return args.email
    }

    return prisma.users.update({
      where: { id: Number(args.id) },
      data: {
        firstname,
        lastname,
        email,
        tel,
      },
    })
  },

  deleteUser: (parent: any, args: { id: String }, decodedToken: any) => {
    const idUser = decodedToken.id
    const idUserToDelete = Number(args.id)
    const roleUser = decodedToken.role
    if (idUser !== idUserToDelete && roleUser !== 'ADMIN') throw new Error('UPDATE FORBIDDEN')

    return prisma.users.delete({
      where: {
        id: Number(args.id),
      },
    })
  },

  login: async (parent: any, args: { email: string; password: string }) => {
    try {
      const user = await prisma.users.findUnique({ where: { email: args.email } })
      if (!user) throw new Error('No user with that email')
      const isValidPassword = await bcrypt.compare(args.password, user.password)
      if (!isValidPassword) throw new Error('Incorrect password')

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.roles,
        },
        JWT_SECRET,
        {
          expiresIn: '1d',
        }
      )

      return { token, user }
    } catch (error) {
      throw new Error(error.message)
    }
  },

  forgotPassword: async (parent: any, args: { email: string }) => {
    try {
      const user = await prisma.users.findUnique({ where: { email: args.email } })
      if (!user) throw new Error('No user with that email')

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.roles,
        },
        JWT_SECRET,
        {
          expiresIn: '1d',
        }
      )

      sendMail(args.email, token)

      return { token, user }
    } catch (error) {
      throw new Error(error.message)
    }
  },

  resetPassword: async (parent: any, args: { id: string; password: string }) => {
    const user = await prisma.users.findUnique({ where: { id: Number(args.id) } })
    if (!user) throw new Error('id invalid')

    const password: string = await cryptagePassword(args.password)

    async function cryptagePassword(password: string) {
      const salt = await bcrypt.genSalt()
      const passwordHashed = await bcrypt.hash(password, salt)
      return passwordHashed
    }

    return prisma.users.update({
      where: { id: Number(args.id) },
      data: {
        password: password,
      },
    })
  },
}
