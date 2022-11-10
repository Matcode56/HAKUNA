import { useQuery, useMutation } from "@apollo/client";
import {
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useContext,
  useState,
  useEffect,
} from "react";
import { GET_PROJECTS } from "../../Graphql/Queries";
import { DELETE_PROJECT } from "../../Graphql/Mutations";
import { ProjectContext } from "../../hooks/projects/context";
import Select from "react-select";

export const ListOfProjects = () => {
  const { projectDispatch } = useContext(ProjectContext);

  /* Query and Mutation */
  const { data, error, loading } = useQuery(GET_PROJECTS)
  const [deleteProject] = useMutation(DELETE_PROJECT, {

    refetchQueries: [{ query: GET_PROJECTS }, "getProjects"],
  });

  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sortProperty, setSortProperty] = useState("");
  const [baseData, setBaseData] = useState<any[]>([]);

  const options = [
    { value: "deadline", label: "Date" },
    { value: "name", label: "Name" },
  ];

  useEffect(() => {
    if (loading === false && data && baseData) {
      setBaseData(data.getProjects);
    }
    const sorted = [...baseData].sort((a, b) =>
      a[sortProperty] > b[sortProperty] ? 1 : -1
    );
    setSortedData(sorted);
  }, [baseData, data, loading, sortProperty]);

  const selectStyle = {
    control: (styles: any) => {
      return {
        ...styles,
        backgroundColor: "#8188FE",
        color: "white",
        borderRadius: "15px",
        "&:hover": {
          borderColor: "#676ccb",
        },
      };
    },
    placeholder: (styles: any) => ({
      ...styles,
      backgroundColor: "",
      color: "white",
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      color: "white",
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: "white",
    }),
    option: (styles: any) => {
      return {
        ...styles,
        backgroundColor: "#8188FE",
        color: "white",
        "&:hover": {
          backgroundColor: "#676ccb",
        },
      };
    },
  };
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <p>Error : {error?.message}</p>
      ) : (
        <div className='projects-list mx-auto w-full'>
          {data.getProjects.map(
            (project: {
              project_owner: any;
              id: Key | null | undefined
              name: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined
              deadline: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined
            }) => (
              <div
                className='flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative bg-paleyellow rounded-xl shadow-md pt-2 mt-2'
                key={project.id}
              >
                <button
                  type='button'
                  className='single-project cursor-pointer'
                  onClick={() => {
                    document.querySelector('.modal-single-project')?.classList.add('is-active')
                    projectDispatch({ type: 'GET_ID', payload: data.getProjects, payloadId: project.id })
                  }}
                ></button>
                <div className='w-6 flex flex-col items-center'></div>
                <div className='mx-2 -mt-1 text-fontgray w-1/4'>
                  {project.name}
                  <div className='text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500'>{`Project owner: ${project.project_owner.firstname} ${project.project_owner.lastname}`}</div>
                </div>
                <div className=' w-full text-right text-sm'>
                  <div className='mx-2 -mt-1 text-fontgray'>Due for:</div>
                  <div className='text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500'>
                    {new Date((project.deadline as number) * 1).toLocaleDateString()}
                  </div>
                </div>
                <button
                  className=' font-bold py-2 px-4 rounded w-12 h-12 '
                  onClick={() => {
                    document.querySelector('.modal-update-project')!.classList.add('is-active')
                    projectDispatch({ type: 'GET_ID', payload: data.getProjects, payloadId: project.id })
                  }}
                >
                  <img src='/icons/edit.svg' alt='edit' />
                </button>
                <button
                  className=' font-bold py-2 px-4 rounded w-12 h-12 '
                  data-id={project.id}
                  onClick={() => document.querySelector(`button[data-id='${project.id}'] ~ .modal-delete`)?.classList.toggle('is-active')}
                >
                  <img src='/icons/delete.svg' alt='delete' />
                </button>
                <div className='modal-delete'>
                  <h2 className='font-semibold uppercase'>Are you sure ?</h2>
                  <div className='flex justify-around'>
                    <button
                      className='text-red-700 font-bold'
                      type='button'
                      onClick={() => deleteProject({ variables: { deleteProjectId: project.id } })}
                    >
                      Yes
                    </button>
                    <button type='button' onClick={() => document.querySelector('.modal-delete')?.classList.remove('is-active')}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  )
}
