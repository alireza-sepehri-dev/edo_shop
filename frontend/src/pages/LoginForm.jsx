import { useState, useEffect } from 'react'
import api from '../services/api'
import { useAuthStore } from '../services/auth'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { LoadingDots } from '../components/Loading'


export default function LoginForm() {
  const login = useAuthStore(state => state.login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setshowPass] = useState(false) // کنترل نمایش رمز  
  const navigate = useNavigate()

  const isSuccessMessage = message => message.includes('✅')

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(''), 6000) // ۶ ثانیه
      return () => clearTimeout(timeout) // پاک‌سازی در صورت تغییر سریع پیام
    }
  }, [message])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post("users/login/", { username, password })
      const backendMessage = res.data.message || 'ورود با موفقیت انجام شد. خوش آمدید ✅'
      setMessage(backendMessage)

      // ذخیره در store
      login(res.data.access, res.data.refresh)

      // ذخیره برای پایداری
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)

      navigate('/')
    } catch (err) {
      const data = err.response?.data
      let backendMessage = 'خطا در ورود ❌'

      if (data) {
        if (data.error) backendMessage = data.error  // پیغام خطاهای ویو
        else {
          const firstError = data[Object.keys(data)[0]]?.[0] // پیغام خطاهای سریالایزر
          backendMessage = firstError || backendMessage
        }
      }
      setMessage(backendMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="bg-amber-700">
        header
      </div>
      <div className="container mx-auto flex flex-col flex-1">
        <div className="main-rounded-page flex-1 mt-10 rounded-t-[50px]">

          <h2 className="text-xl font-light text-center my-12 text-lime-600 dark:text-[#88a760]">ورود به حساب کاربری</h2>
          <div className='box-style pt-12 px-6 max-w-87.5 mx-auto border-2 rounded-md relative z-10'>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="نام کاربری/ایمیل"
                className="w-full p-2 border-b-2 border-b-stone-200 dark:border-b-stone-400 mb-12 placeholder:text-sm placeholder:text-stone-300 focus:outline-none focus:ring-0 autofill:bg-transparent focus:bg-transparent active:bg-transparent"
              />
              <div className="relative mb-16">
                <span
                  onClick={() => setshowPass(!showPass)}
                  className="absolute left-2 top-2 cursor-pointer text-stone-400"
                >
                  {showPass ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="رمز ورود"
                  className="w-full p-2 border-b-2 border-b-stone-200 dark:border-b-stone-400 mb-5 placeholder:text-sm placeholder:text-stone-300 focus:outline-none focus:ring-0 autofill:bg-transparent focus:bg-transparent active:bg-transparent"
                />
              </div>
              <div className='flex justify-between items-center mb-4'>
                <div className='text-[#c6dfa1] dark:text-gray-400'>
                  <Link to="/register" className='text-sm self-end cursor-pointer hover:text-lime-500 dark:hover:text-gray-300 block'>ثبت نام نکرده ام</Link>
                  <Link to="/" className='text-sm self-end cursor-pointer hover:text-lime-500 dark:hover:text-gray-300'>رمز ورود را فراموش کرده ام</Link>
                </div>
                <button type="submit"
                  disabled={loading}
                  className={`w-30 text-white py-1.5 rounded ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-neutral-400 cursor-pointer'}`}>
                  {loading ? (
                    <span className="flex items-center justify-center">
                      در حال ورود <LoadingDots />
                    </span>
                  ) : 'ورود'}
                </button>
              </div>
            </form>

          </div>

          {message && (
            <p className={`mt-3 text-center text-sm ${isSuccessMessage(message) ? 'text-green-600' : 'text-red-600 dark:text-red-400'}`}>
              {message}
            </p>
          )}

          <div className='absolute bottom-2 right-2 lg:w-62.5'>
            <img className='w-full' src="./static/cheragh.png" alt="" />
          </div>
        </div>
      </div >
      <div className="bg-amber-300 h-6">
        footer
      </div>
    </>
  )
}