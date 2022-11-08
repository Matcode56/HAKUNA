import { Navigate } from 'react-router-dom'
import { Projects } from '../components/Project/Projects'

export const ProtectedRoute: React.FC<ProtectedRoute> = ({ role, children }) => {
  console.log(children)
  if (role !== 'DEV') {
    return <Projects />
  }
  return <p>Votre rôle ne vous permet pas d'acceder aux projets</p>
}
