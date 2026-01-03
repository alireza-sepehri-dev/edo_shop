import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'
import ProfilePage from './pages/ProfilePage'
import AuthInitializer from './services/AuthInitializer'
import NotFound from './pages/NotFound'
import ProtectedRoute from './services/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthInitializer />
      <Routes>
        <Route path="/register" element={
          <ProtectedRoute type="public">
            <RegisterForm />
          </ProtectedRoute>
        } />
        <Route path="/login" element={
          <ProtectedRoute type="public">
            <LoginForm />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute type="protected">
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App