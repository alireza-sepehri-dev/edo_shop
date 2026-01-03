import { Navigate } from 'react-router-dom'
import { useAuthStore } from './auth'

export default function ProtectedRoute({ children, type }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  if (type === 'protected') {
    // اگر لاگین نیست، بفرست به صفحه لاگین
    if (!isAuthenticated) return <Navigate to="/login" replace />
    return children
  }

  if (type === 'public') {
    // اگر لاگین هست، بفرست به صفحه پروفایل
    if (isAuthenticated) return <Navigate to='/' replace />
    return children
  }

  return children
}