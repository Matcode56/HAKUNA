export const projectInitialState: Project[] = [{
  id: '',
  name: '',
  description: '',
  deadline: '',
  createdAt: ''
}]

export const projectsReducer = (projectState: Project[], action: ProjectAction): Project[] => {
  const { type, payload, payloadId, payloadUpdate, payloadCreate } = action

  switch (type) {
    case 'GET_ID':
      console.log(payloadId);
      
      projectState = payload.filter(el => el.id === payloadId)
      let copyDeadlineFormat = {...projectState[0]}
      /* Convert TimeStamp to Date and reverse to match input date format (yyyy-mm-dd) */
      copyDeadlineFormat.deadline = new Date((projectState[0].deadline) as number * 1).toLocaleDateString().split('/').reverse().join('-')
      projectState[0] = copyDeadlineFormat
      
      return [...projectState]
  
    case 'UPDATE_NAME':
      let copyNameUpdate = {...projectState[0]}
      copyNameUpdate.name = payloadUpdate
      projectState[0] = copyNameUpdate

      return [...projectState]

    case 'UPDATE_DESC':
      let copyDescUpdate = {...projectState[0]}
      copyDescUpdate.description = payloadUpdate
      projectState[0] = copyDescUpdate

      return [...projectState]

    case 'UPDATE_DATE':      
      let copyDeadlineUpdate = {...projectState[0]}
      copyDeadlineUpdate.deadline = payloadUpdate
      projectState[0] = copyDeadlineUpdate
      console.log(projectState[0].deadline);
      console.log(new Date(`${projectState[0].deadline}`).toISOString());
      console.log(new Date(`${(projectState[0].deadline as string).split('-').reverse()}`).getTime());
      
      

      return [...projectState]
  
    case 'CREATE_NAME':
      let copyNameCreate = {...projectState[0]}
      copyNameCreate.name = payloadCreate
      projectState[0] = copyNameCreate

      return [...projectState]

    case 'CREATE_DESC':
      let copyDescCreate = {...projectState[0]}
      copyDescCreate.description = payloadCreate
      projectState[0] = copyDescCreate

      return [...projectState]

    case 'CREATE_DATE':      
      let copyDeadlineCreate = {...projectState[0]}
      copyDeadlineCreate.deadline = payloadCreate
      projectState[0] = copyDeadlineCreate 

      return [...projectState]

    default:
      return projectState
  }
}