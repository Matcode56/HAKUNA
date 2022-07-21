import { prisma } from "../../database"
import * as bcrypt from 'bcrypt';

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

  createUser: async (parent: any, args:{firstname: string, lastname: string, email: string, password: string, tel: number})=>{

    const password: string= await cryptagePassword(args.password)

    async function cryptagePassword(password: string){
        const salt = await bcrypt.genSalt();
        const passwordHashed= await bcrypt.hash(password, salt);
        return passwordHashed;
        
    }
    return prisma.users.create({
      data: {
        firstname: args.firstname,
        lastname: args.lastname,
        password: password,
        tel: args.tel,
        email: args.email,
        
      }
    })
  },

  updateUser: async(parent: any, args:{id: String, firstname: string, lastname: string, email: string, password: string, tel: number})=>{
  
      console.log(args);
      const user= await prisma.users.findUnique({where: {id: Number(args.id)}});
      
      if(!user){
        throw new Error('id invalid')
      }
      const email= args.email? await checkEmail(args.email): null;
      const firstname= args.firstname;
      const lastname= args.lastname;
      const tel= args.tel;
      const password= args.password;
      
      async function checkEmail(emailToCheck: string){
        const email= await prisma.users.findUnique({where: {email : emailToCheck}})
        if(email) throw new Error("email déja utilisé")
        return args.email;
      }
   
    return prisma.users.update({
      where: { id: Number(args.id)},
      data: {
        firstname,
        lastname,
        password,
        email,
        tel
      }
    })
  },

  deleteUser:(parent: any, args:{id: String})=>{
    return prisma.users.delete({
      where:{
        id: Number(args.id)
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