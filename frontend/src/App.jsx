import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'
import ProfilePage from './pages/ProfilePage'
import AuthInitializer from './services/AuthInitializer'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import ProtectedRoute from './services/ProtectedRoute'

// Layout با Header و Footer
function MainLayout() {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthInitializer />
      <Routes>
        <Route path="/register" element={<ProtectedRoute type="public">
          <RegisterForm />
        </ProtectedRoute>
        } />
        <Route path="/login" element={<ProtectedRoute type="public">
          <LoginForm />
        </ProtectedRoute>
        } />

        {/* صفحات با Header و Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProtectedRoute type="protected">
            <ProfilePage />
          </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App