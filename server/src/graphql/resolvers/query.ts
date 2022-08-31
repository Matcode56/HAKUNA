import { prisma } from '../../database'
import { checkToken } from '../middlewares/resolversMiddlewares'

export const Query = {
  getProject: (parent: any, args: { id: string }) => {
    return prisma.projects.findUnique({
      where: { id: Number(args.id) },
    })
  },

  getProjects: () => {
    return prisma.projects.findMany()
  },

  getProjectsUser: async (args: { user_id: string }) => {
    // const searchUserProjects= await prisma.user_project.findMany({
    //     where: {user_id: Number(args.user_id)}
    // })
    // const idUserProject= searchUserProjects.map((e)=>{
    //     return e.project_id
    // })
    return prisma.projects.findMany({
      where: { id: 3 },
    })
  },

  getUsers: () => {
    return prisma.users.findMany()
  },

  getUser: (parents: any, args: { email: string }, decodedToken: any) => {
    checkToken(decodedToken)
    return prisma.users.findUnique({
      where: { email: args.email },
      select: {
        email: true,
        firstname: true,
        lastname: true,
        roles: true,
        id: true,
      },
    })
  },
}
