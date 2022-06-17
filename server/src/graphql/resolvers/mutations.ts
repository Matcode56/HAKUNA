import { prisma } from "../../database"

export const Mutation = {

  createProject: (parent: any, args:{ description: string, name: string, deadline: string , createdAt: string}) => {
    // A REVOIR LOCAL DATE !!
    // const dateInFr = new Date(args.deadline).toISOString();
    // const dateInLocal= new Date(dateInFr).toLocaleString("fr-FR");
    return prisma.projects.create({
      data: {
        description: args.description,
        name: args.name,
        deadline: args.deadline,
        createdAt: args.createdAt
      }
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

  updateProject: (parent: any, args:{ id: String, description: string, name: string, deadline: string}) => {
    return prisma.projects.update({
      where: { id: Number(args.id) },
      data: {
        description: args.description !== null ? args.description : undefined,
        name: args.name !== null ? args.name : undefined,
        deadline: args.deadline !== null ? args.deadline : undefined,
      }
    })
  },

  deleteProject:(parent: any, args:{id: String})=>{
    //A FAIRE Supression en cascade
    return prisma.projects.delete({
      where:{
        id: Number(args.id)
      }
    })
  }
}