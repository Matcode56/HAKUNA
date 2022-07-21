import { prisma } from "../../database"

export const Query = {
  getProject: (parent: any, args:{id: string})=>{
    return prisma.projects.findUnique({
        where:{id: Number(args.id)}
    })
  },
  
  getProjects: ()=>{
    return prisma.projects.findMany()
  },

  getProjectsUser: async(parents: any, args:{user_id: string})=>{
    // const searchUserProjects= await prisma.user_project.findMany({
    //     where: {user_id: Number(args.user_id)}
    // })
    // const idUserProject= searchUserProjects.map((e)=>{
    //     return e.project_id
    // })
    return prisma.projects.findMany({
        where: { id: 3 } 
    })
  },

  getUsers: ()=>{
    return prisma.users.findMany()
  },

  getUser: (parents: any, args:{id: string})=>{
    console.log(args.id);
    
    return prisma.users.findUnique({where: {id: Number(args.id)}})
  }

}