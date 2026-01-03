import { useEffect } from 'react'
import { useAuthStore } from './auth'

export default function AuthInitializer() {
  const login = useAuthStore(state => state.login)

  useEffect(() => {
    const access = localStorage.getItem('access')
    const refresh = localStorage.getItem('refresh')
    if (access && refresh) login(access, refresh)
  }, [login])

  return null
}