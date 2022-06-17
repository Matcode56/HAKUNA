import { useContext } from "react"
import { ProjectContext } from "../../hooks/context"

export const SingleProject = () => {
  const { projectState } = useContext(ProjectContext)

  return (
    <>
    {
      projectState.map(single => (
        <div 
          className="modal-single-project mt-10"
          key={single.id}
        >
          <button 
            type="button" 
            className="close-buttons"
            onClick={() => {
              document.querySelector('.modal-single-project')?.classList.remove('is-active')
              document.querySelector('.modal-create-project')?.classList.remove('is-active')
              document.querySelector('.modal-update-project')?.classList.remove('is-active')
            }}
          >
            <img src="/icons/close.svg" alt="close" />
          </button>
          <h1 className="text-black-300 text-3xl tracking-wider text-center font-title">
            INFO PROJECT
          </h1>
          <div className="flex flex-wrap justify-center">
            <div className="w-1/3 p-4">
              <div className=" bis shadow-lg rounded p-4 bg-paleyellow">
                <h1 className="text-black text-2xl text-center font-title my-2">
                  Name
                </h1>
                <p>{single.name}</p>
                <h1 className="text-black text-2xl text-center font-title my-2">
                  Description
                </h1>
                <p>{single.description}</p>
                <h1 className="text-black  text-2xl text-center font-title my-2">
                  Deadline
                </h1>
                <p>{single.deadline}</p>
              </div>
            </div>
          </div>
        </div>
      ))
    }
    </>
  )
}
