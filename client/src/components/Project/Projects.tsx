import { CreateProjects } from "./CreateProjects";
import { ListOfProjects } from "./ListOfProjects";
import { SingleProject } from "./SingleProject";
import { UpdateProject } from './UpdateProject';


export const Projects = () => {
    return(
        <div className="flex justify-center ml-8">
        <div className="container bg-white  py-20 mt-32 rounded-3xl shadow-xl w-4/5 px-12 grid">
          <ListOfProjects />
          <SingleProject />
          <CreateProjects />
          <UpdateProject />
          <button 
            className="custom-buttons justify-self-end" 
            type="button"
            onClick={() => {
              document.querySelector('.modal-create-project')?.classList.add('is-active')
            }}
          >New Project</button>
        </div>
      </div>
    )
}