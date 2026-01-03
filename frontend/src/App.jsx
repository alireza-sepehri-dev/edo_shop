import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import ProfilePage from './pages/ProfilePage'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App