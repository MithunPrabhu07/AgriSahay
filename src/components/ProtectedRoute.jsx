import { Navigate, useLocation } from 'react-router-dom'
import { authService } from '../services/authService'

function ProtectedRoute({ children }) {
  const location = useLocation()

  if (!authService.isAuthenticated()) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />
  }

  return children
}

export default ProtectedRoute
