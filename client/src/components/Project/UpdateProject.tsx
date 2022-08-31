import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { UPDATE_PROJECT } from "../../Graphql/Mutations";
import { GET_PROJECTS } from "../../Graphql/Queries";
import { ProjectContext } from "../../hooks/projects/context";

export const UpdateProject = () => {
  const { projectState, projectDispatch } = useContext(ProjectContext)
  const [updateProject, { data, error, loading }] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [
      {query: GET_PROJECTS},
      'getProjects'
    ]
  })
  

  return (
    <>
    {
      projectState.map(update => (
        <div 
          className="modal-update-project mt-10"
          key={update.id}
        >
          <button 
            type="button" 
            className="close-buttons"
            onClick={() => {
              document.querySelector('.modal-create-project')?.classList.remove('is-active')
              document.querySelector('.modal-update-project')?.classList.remove('is-active')
            }}
          >
            <img src="/icons/close.svg" alt="close" />
          </button>
          <h1 className="text-black-300 text-3xl tracking-wider text-center font-title">
            UPDATE PROJECT
          </h1>
          <div className="flex flex-wrap justify-center">
            <div className="w-1/3 p-4">
              <div className=" bis shadow-lg rounded p-4 bg-paleyellow">
                <h1 className="text-black text-2xl text-center font-title my-2">
                  Name
                </h1>
                <input
                  className="border text-gray font-bold py-2 px-4 rounded w-full bg-white"
                  type="text"
                  placeholder="Name"
                  value={update.name}
                  onChange={(e) => projectDispatch({type: 'UPDATE_PROJECT', payloadUpdate: e.target.value, payloadInput: 'name'})}
                />
                <h1 className="text-black text-2xl text-center font-title my-2">
                  Description
                </h1>
                <input
                  className="border text-gray font-bold py-2 px-4 rounded w-full bg-white"
                  type="text"
                  value={update.description}
                  placeholder="Description"
                  onChange={(e) => projectDispatch({type: 'UPDATE_PROJECT', payloadUpdate: e.target.value, payloadInput: 'desc'})}
                />
                <h1 className="text-black  text-2xl text-center font-title my-2">
                  Deadline
                </h1>
                <input
                  className="border  text-gray font-bold py-2 px-4 rounded w-full bg-white"
                  type="date"
                  value={update.deadline} // value want onChange
                  onChange={(e) => projectDispatch({type: 'UPDATE_PROJECT', payloadUpdate: e.target.value, payloadInput: 'deadline'})}
                />
                <div className="text-center">
                <button
                  className=" text-white shadow-lg font-bold py-2 px-4 rounded mt-5 mb-2 hover:bg-fontgray bg-lavender"
                  onClick={() => {
                    updateProject({
                      variables: {
                        updateProjectId: update.id,
                        description: update.description,
                        name: update.name,
                        deadline: new Date(`${update.deadline}`).toISOString(),
                      }
                    })
                  }}
                > 
                  Update Project
                </button>
                {
                  loading ? (
                    <p>Updating...</p>
                  ) : error ? (
                    <p>Update error! {error.message}</p>
                  ) : ''
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    }
    </>
  
  );
}

