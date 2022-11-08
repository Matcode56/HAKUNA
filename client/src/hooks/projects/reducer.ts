export const projectInitialState: Project[] = [
  {
    id: '',
    name: '',
    description: '',
    deadline: '',
    createdAt: '',
    project_owner: {},
    owner_name: ''
  },
]

export const projectsReducer = (projectState: Project[], action: ProjectAction): Project[] => {
  const { type, payload, payloadId, payloadUpdate, payloadCreate, payloadInput, payloadUser } = action

  switch (type) {
    case 'GET_ID':

      projectState = payload.filter((el) => el.id === payloadId)
      let copyDeadlineFormat = { ...projectState[0] }
      /* Convert TimeStamp to Date and reverse to match input date format (yyyy-mm-dd) */
      copyDeadlineFormat.deadline = new Date((projectState[0].deadline as number) * 1).toLocaleDateString().split('/').reverse().join('-')
      projectState[0] = copyDeadlineFormat

      return [...projectState]

    case 'UPDATE_PROJECT':
      let copyUpdate = { ...projectState[0] }

      if (payloadInput === 'name') {
        copyUpdate.name = payloadUpdate
      } else if (payloadInput === 'desc') {
        copyUpdate.description = payloadUpdate
      } else if (payloadInput === 'deadline') {
        copyUpdate.deadline = payloadUpdate
      }

      projectState[0] = copyUpdate
      return [...projectState]

    case 'CREATE_PROJECT':
      let copyCreate = { ...projectState[0] }

      if (payloadInput === 'name') {
        copyCreate.name = payloadCreate
      } else if (payloadInput === 'desc') {
        copyCreate.description = payloadCreate
      } else if (payloadInput === 'deadline') {
        copyCreate.deadline = payloadCreate
      } else if (payloadInput === 'owner') {
        copyCreate.owner_name = payloadCreate
        const Int = setInterval(() => {
          if(payloadUser[0] !== undefined) copyCreate.project_owner = payloadUser[0]
          console.log(copyCreate.project_owner)
          clearInterval(Int)
        }, 100)
      }



      projectState[0] = copyCreate
      return [...projectState]

    default:
      return projectState
  }
}
