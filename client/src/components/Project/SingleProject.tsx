import { useContext } from "react"
import { ProjectContext } from "../../hooks/projects/context"

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
            Project INFO
          </h1>
          <div className="flex flex-wrap justify-left">
            <div className="w-1/3 p-4">
                <h1 className="text-black text-2xl text-center font-title my-2">
                  Name
                </h1>
                <p className="bg-paleyellow px-10 py-3 rounded-lg border  border-black">{single.name}</p>
                <h1 className="text-black text-2xl text-center font-title my-2">
                  Description
                </h1>
                <p className="bg-paleyellow px-10 py-3 rounded-lg border  border-black">{single.description}</p>
                <h1 className="text-black  text-2xl text-center font-title my-2">
                  Deadline
                </h1>
                <p className="bg-paleyellow px-10 py-3 rounded-lg border  border-black">{single.deadline}</p>
            </div>
          </div>
        </div>
      ))
    }
    </>
  )
}
