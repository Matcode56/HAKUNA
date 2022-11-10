import { useMutation, useQuery } from '@apollo/client'
import { useContext } from 'react'
import { CREATE_PROJECT } from '../../Graphql/Mutations'
import { GET_PROJECTS } from '../../Graphql/Queries'
import { GET_USERS } from '../../Graphql/Queries'
import { ProjectContext } from '../../hooks/projects/context'

export const CreateProjects = () => {
  const { projectState, projectDispatch } = useContext(ProjectContext)
  let dateNow = new Date()
  let dd = String(dateNow.getDate()).padStart(2, '0')
  let mm = String(dateNow.getMonth() + 1).padStart(2, '0') //January is 0!
  let yyyy = dateNow.getFullYear()
  let createdAt = new Date(`${yyyy}-${mm}-${dd}`).toISOString()
  const { data: dataUsers, error: errorUsers, loading: loadingUsers } = useQuery(GET_USERS)
  const [createProject, { error, loading }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }, 'getProjects'],
  })

  return (
    <>
      {projectState.map(create => (
        <div className='modal-create-project mt-10' key={'1'}>
          <button
            type='button'
            className='close-buttons'
            onClick={() => {
              document.querySelector('.modal-create-project')?.classList.remove('is-active')
              document.querySelector('.modal-update-project')?.classList.remove('is-active')
            }}
          >
            <img src='/icons/close.svg' alt='close' />
          </button>
          <h1 className='text-black-300 text-3xl tracking-wider text-center font-title'>CREATE PROJECT</h1>
          <div className='flex flex-wrap justify-center'>
            <div className='w-1/3 p-4'>
              <div className=' bis shadow-lg rounded p-4 bg-paleyellow '>
                <h1 className='text-black text-2xl text-center font-title my-2'>Name</h1>
                <input
                  className='border text-gray font-bold py-2 px-4 rounded w-full bg-white'
                  type='text'
                  placeholder='Name'
                  value={create.name}
                  onChange={e =>
                    projectDispatch({ type: 'CREATE_PROJECT', payloadCreate: e.target.value, payloadInput: 'name' })
                  }
                />
                <h1 className='text-black text-2xl text-center font-title my-2'>Description</h1>
                <input
                  className='border text-gray font-bold py-2 px-4 rounded w-full bg-white'
                  type='text'
                  value={create.description}
                  placeholder='Description'
                  onChange={e =>
                    projectDispatch({ type: 'CREATE_PROJECT', payloadCreate: e.target.value, payloadInput: 'desc' })
                  }
                />
                <h1 className='text-black  text-2xl text-center font-title my-2'>Deadline</h1>
                <input
                  className='border  text-gray font-bold py-2 px-4 rounded w-full bg-white'
                  type='date'
                  value={create.deadline}
                  onChange={e =>
                    projectDispatch({ type: 'CREATE_PROJECT', payloadCreate: e.target.value, payloadInput: 'deadline' })
                  }
                />
                <h1 className='text-black  text-2xl text-center font-title my-2'>Project Owner</h1>
                <input
                  className='border  text-gray font-bold py-2 px-4 rounded w-full bg-white'
                  type='text'
                  list='Users'
                  placeholder='Théodule Petiprez'
                  onChange={(e: { target: { value: any } }) =>
                    // projectDispatch({ type: 'CREATE_PROJECT', payloadCreate: e.target.value, payloadUser: dataUsers.getUsers.filter((user: { firstname: any; id: any }) => user.firstname === (e.target.value).split(' ')[0]), payloadInput: 'owner' })
                    projectDispatch({
                      type: 'CREATE_PROJECT',
                      payloadCreate: e.target.value,
                      payloadUser: dataUsers.getUsers.filter(
                        (user: Users) => user.firstname === e.target.value.split(' ')[0]
                      )[0].id,
                      payloadInput: 'owner',
                    })
                  }
                />
                <datalist id='Users'>
                  {loadingUsers ? (
                    <p>Loading..</p>
                  ) : (
                    dataUsers.getUsers.map((user: { firstname: string; lastname: string; id: Number }, i: number) => {
                      return (
                        <option key={i}>
                          {user.firstname} {user.lastname}
                        </option>
                      )
                    })
                  )}
                </datalist>
                <div className='text-center'>
                  <button
                    className=' text-white shadow-lg font-bold py-2 px-4 rounded mt-5 mb-2 hover:bg-fontgray bg-lavender'
                    onClick={() => {
                      createProject({
                        variables: {
                          name: create.name,
                          description: create.description,
                          deadline: new Date(`${create.deadline}`).toISOString(),
                          createdAt,
                          owner_id: create.owner_id,
                        },
                      })
                      create.name = ''
                      create.description = ''
                      create.deadline = ''
                      create.owner_id = 0
                      document.querySelector('.modal-create-project')?.classList.remove('is-active')
                    }}
                  >
                    Create
                  </button>
                  {loading ? <p>Submitting...</p> : error ? <p>Submission error! {error.message}</p> : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
