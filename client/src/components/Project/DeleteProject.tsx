import { useMutation } from "@apollo/client"
import { DELETE_PROJECT } from "../../Graphql/Mutations"

export const DeleteProject: React.FC<Project> = ({ id }) => {

  const [deleteProject, { data, error, loading }] = useMutation(DELETE_PROJECT)

  console.log(id);
  
  return (
    <>
    {/* {
      loading ? (
        <p>Deleting...</p>
      ) : error ? (
        <p>Deleting error! {error.message}</p>
      ) : (
      <button
        className=" font-bold py-2 px-4 rounded w-12 h-12 "
        onClick={() => {
          deleteProject({
            variables: {
              id: id
            }
          })
          
        }}
      >
        <img src="/icons/delete.svg" alt="delete"></img>
      </button>
      )
    } */}
    </>
  )
}
