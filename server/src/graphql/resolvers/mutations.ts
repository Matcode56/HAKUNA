import { prisma } from '../../database'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

require('dotenv').config()
const { JWT_SECRET } = process.env

export const Mutation = {
  createProject: (parent: any, args: { description: string; name: string; deadline: string; createdAt: string }) => {
    return prisma.projects.create({
      data: {
        description: args.description,
        name: args.name,
        deadline: args.deadline,
        createdAt: args.createdAt,
      },
    })
  },
  // createProjectNested: (parent: any, args:{id: string, description: string, name: string, deadline: string , createdAt: string, user_project: string}) => {
  //   // A REVOIR LOCAL DATE !!
  //   // const dateInFr = new Date(args.deadline).toISOString();
  //   // const dateInLocal= new Date(dateInFr).toLocaleString("fr-FR");
  //   return prisma.projects.create({
  //     data: {
  //       description: args.description,
  //       name: args.name,
  //       deadline: new Date(args.deadline),
  //       createdAt: new Date(args.createdAt),
  //       // join table
  //       user_project: {
  //         connect: [{id: Number(args.id)}]
  //       }
  //     }
  //   })
  // }

  updateProject: (parent: any, args: { id: String; description: string; name: string; deadline: string }) => {
    return prisma.projects.update({
      where: { id: Number(args.id) },
      data: {
        description: args.description !== null ? args.description : undefined,
        name: args.name !== null ? args.name : undefined,
        deadline: args.deadline !== null ? args.deadline : undefined,
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

  createUser: async (parent: any, args: { firstname: string; lastname: string; email: string; password: string; tel: number }) => {
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
        tel: args.tel,
        email: args.email,
      },
    })
  },

  login: async (parent: any, args: { email: string; password: string }, context: any) => {
    try {
      const user = await prisma.users.findUnique({ where: { email: args.email } })
      if (!user) throw new Error('No user with that email')
      const isValid = await bcrypt.compare(args.password, user.password)
      if (!isValid) throw new Error('Incorrect password')
      /* Return JWT */
      const token = jwt.sign(
        {
          id: user.id,
          email: args.email,
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
}
