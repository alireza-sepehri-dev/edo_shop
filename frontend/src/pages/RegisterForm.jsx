import { useState, useEffect } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { LoadingDots } from '../components/Loading'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [cooldown, setCooldown] = useState(0) // زمان باقی‌مانده برحسب ثانیه
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // کنترل نمایش رمز

  const isSuccessMessage = message => message.includes('✅')
  const timecooldown = 120 // مهلت زمان ثبت نام بر حسب ثانیه

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(''), 6000) // ۶ ثانیه
      return () => clearTimeout(timeout) // پاک‌سازی در صورت تغییر سریع پیام
    }
  }, [message])

  // بازیابی زمان cooldown از localStorage
  useEffect(() => {
    const sentAt = localStorage.getItem('codeSentAt')
    if (sentAt) {
      const elapsed = Math.floor((Date.now() - parseInt(sentAt)) / 1000)
      const remaining = timecooldown - elapsed
      if (remaining > 0) {
        setCooldown(remaining)
        const id = setInterval(() => {
          setCooldown(prev => {
            if (prev <= 1) {
              clearInterval(id)
              localStorage.removeItem('codeSentAt')
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    }
  }, [])


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const handleEmailSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post("users/request-verification-code/", {
        email: formData.email,
      })
      setMessage('کد تأیید ارسال شد ✅')

      // شروع شمارنده
      localStorage.setItem('codeSentAt', Date.now().toString())
      setCooldown(timecooldown)
      const id = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            clearInterval(id)
            localStorage.removeItem('codeSentAt')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      const backendMessage = err.response?.data.error || 'ارسال کد ناموفق بود ❌'
      setMessage(backendMessage)
    } finally {
      setLoading(false)
    }
  }

  // اعتبارسنجی رمز عبور
  const isPasswordValid = password => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    return regex.test(password)
  }

  return (
    <>
      <div className="bg-amber-700">
        header
      </div>
      <div className="container mx-auto flex flex-col flex-1">
        <div className="main-rounded-page flex-1 mt-10 rounded-t-[50px]">

          <h2 className="text-xl font-light text-center my-12 text-lime-600 dark:text-lime-800">ایجاد حساب در یک دقیقه</h2>
          <div className='box-style pt-12 px-6 max-w-87.5 mx-auto border-2 rounded-md relative'>

            <form onSubmit={handleEmailSubmit}>
              {cooldown === 0 ? (
                <input
                  type="email"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ایمیل"
                  required
                  className="w-full p-2 border-b-2 border-b-stone-200 dark:border-b-stone-400 mb-12 placeholder:text-sm placeholder:text-stone-300 focus:outline-none focus:ring-0 autofill:bg-transparent focus:bg-transparent active:bg-transparent"
                />
              ) : (
                <>
                  <div className='flex justify-between items-end gap-3 mb-16'>
                    <input
                      type="text"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      placeholder="کد تأیید" required
                      className="w-1/2 p-2 border-b-2 border-b-stone-200 dark:border-b-stone-400 placeholder:text-sm placeholder:text-stone-300 focus:outline-none focus:ring-0 autofill:bg-transparent focus:bg-transparent active:bg-transparent"
                    />
                    <p className='w-1/2 text-xs text-center text-gray-400'>
                      {cooldown > 0 && (`زمان باقیمانده : ${cooldown} ثانیه`)}
                    </p>
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="نام کاربری"
                    className="w-full p-2 border-b-2 border-b-stone-200  dark:border-b-stone-400 mb-16 placeholder:text-sm placeholder:text-stone-300 focus:outline-none focus:ring-0 autofill:bg-transparent focus:bg-transparent active:bg-transparent"
                    required />
                  <div className='relative mb-16'>
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-2 top-2 cursor-pointer text-gray-500 z-10"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="رمز عبور"
                      className="w-full p-2 pl-10 border-b-2 border-b-stone-200  dark:border-b-stone-400 placeholder:text-sm placeholder:text-stone-300 focus:outline-none focus:ring-0 autofill:bg-transparent focus:bg-transparent active:bg-transparent"
                      required />
                  </div>
                </>
              )}
              <div className='flex justify-between items-center mb-4'>
                <Link to="/" className='text-sm text-lime-500 dark:text-sky-300 self-end cursor-pointer'>حساب کاربری دارم</Link>
                {cooldown === 0 ? (
                  <button type="submit"
                    className='bg-neutral-400 w-30 text-white py-1.5 mb-2 rounded'>
                    {loading ? (
                      <span className="flex items-center justify-center">
                        در حال ارسال <LoadingDots />
                      </span>
                    ) : 'ارسال کد'}
                  </button>
                ) : (
                  <button type="submit"
                    className="bg-neutral-400 w-30 text-white py-1.5 rounded">
                    {loading ? (
                      <span className="flex items-center justify-center">
                        در حال ثبت نام <LoadingDots />
                      </span>
                    ) : 'ثبت نام'}
                  </button>
                )}
              </div>
            </form>

          </div>

          {message && (
            <p className={`mt-3 text-center text-sm ${isSuccessMessage(message) ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

        </div>
      </div>
      <div className="bg-amber-300 h-6">
        footer
      </div>
    </>
  )
}