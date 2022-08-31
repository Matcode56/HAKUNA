import { prisma } from "../../database"
import { checkToken } from "../middlewares/resolversMiddlewares"

export const Query = {
  getProject: (parent: any, args:{id: string, token: string})=>{
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

  getUsers: (parents: any, args:any, decodedToken: any)=>{
    checkToken(decodedToken); 
    return prisma.users.findMany({select:{
        email: true,
        firstname: true,
        lastname: true,
        roles: true,
        id: true
    }})
  },

  getUser: (parents: any, args:{id: string}, decodedToken: any)=>{
    checkToken(decodedToken);  
    return prisma.users.findUnique({where: {id: Number(args.id)}, select:{
      email: true,
      firstname: true,
      lastname: true,
      roles: true,
      id: true
  }})
  }

  

}
