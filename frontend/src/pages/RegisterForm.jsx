import { useState, useEffect } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { LoadingDots } from '../components/Loading'

export default function RegisterForm() {
  const [formPass, setformPass] = useState({
    password: '',
    password_confirm: '',
  })
  const [emailValue, setEmailValue] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [cooldown, setCooldown] = useState(0) // زمان باقی‌مانده برحسب ثانیه
  const [loading, setLoading] = useState(false)
  const [showPass, setshowPass] = useState(false) // کنترل نمایش رمز  
  const [showPass2, setshowPass2] = useState(false) // کنترل نمایش تکرار رمز


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


  const handlePass = e => {
    setformPass({ ...formPass, [e.target.name]: e.target.value })
  }


  const handleEmailSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post("users/request-verification-code/", {
        email: emailValue,
      })
      const backendMessage = res.data.message || 'کد تأیید به ایمیل شما ارسال شد ✅'
      setMessage(backendMessage)

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
      const backendMessage = err.response?.data?.error || 'ارسال کد ناموفق بود لطفا دوباره تلاش کنید ❌'
      setMessage(backendMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post("users/register/", {
        email: emailValue,
        code: code,
        password: formPass.password,
        password_confirm: formPass.password_confirm,
      })
      const backendMessage = res.data.message || 'ثبت‌نام با موفقیت انجام شد ✅'
      setMessage(backendMessage)
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      const data = err.response?.data
      let backendMessage = 'خطا در ثبت‌نام ❌'

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
      setCode('')
    }
  }

  return (
    <>
      <div className="bg-amber-700">
        header
      </div>
      <div className="container mx-auto flex flex-col flex-1">
        <div className="main-rounded-page flex-1 mt-10 rounded-t-[50px]">

          <h2 className="text-xl font-light text-center my-12 text-lime-600 dark:text-[#88a760]">ایجاد حساب در یک دقیقه</h2>
          <div className='box-style pt-12 px-6 max-w-87.5 mx-auto border-2 rounded-md relative'>

            <form onSubmit={cooldown === 0 ? handleEmailSubmit : handleSubmit}>
              {cooldown === 0 ? (
                <input
                  type="email"
                  value={emailValue}
                  onChange={e => setEmailValue(e.target.value)}
                  placeholder="ایمیل"
                  className="w-full p-2 border-b-2 border-b-stone-200 dark:border-b-stone-400 mb-12 placeholder:text-sm placeholder:text-stone-300 focus:outline-none focus:ring-0 autofill:bg-transparent focus:bg-transparent active:bg-transparent"
                />
              ) : (
                <>
                  <div>
                    <p className='text-sm text-stone-300'>نام کاربری/ایمیل</p>
                    <input
                      type="text"
                      value={emailValue}
                      disabled
                      className="w-full p-2 border-0 text-gray-400 text-end mb-8"
                    />
                  </div>
                  <div className='flex justify-between items-end gap-3 mb-16'>
                    <input
                      type="text"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      placeholder="کد تأیید"
                      className="w-1/2 p-2 border-b-2 border-b-stone-200 dark:border-b-stone-400 placeholder:text-sm placeholder:text-stone-300 focus:outline-none focus:ring-0 autofill:bg-transparent focus:bg-transparent active:bg-transparent"
                    />
                    <p className='w-1/2 text-xs text-center text-gray-400'>
                      {cooldown > 0 && (`زمان باقیمانده : ${cooldown} ثانیه`)}
                    </p>
                  </div>
                  <div className='relative mb-16'>
                    <span
                      onClick={() => setshowPass(!showPass)}
                      className="absolute left-2 top-2 cursor-pointer text-gray-500 z-10"
                    >
                      {showPass ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </span>
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      value={formPass.password}
                      onChange={handlePass}
                      placeholder="رمز عبور"
                      className="w-full p-2 pl-10 border-b-2 border-b-stone-200  dark:border-b-stone-400 placeholder:text-sm placeholder:text-stone-300 focus:outline-none focus:ring-0 autofill:bg-transparent focus:bg-transparent active:bg-transparent"
                    />
                  </div>
                  <div className='relative mb-16'>
                    <span
                      onClick={() => setshowPass2(!showPass2)}
                      className="absolute left-2 top-2 cursor-pointer text-gray-500 z-10"
                    >
                      {showPass2 ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </span>
                    <input
                      type={showPass2 ? "text" : "password"}
                      name="password_confirm"
                      value={formPass.password_confirm}
                      onChange={handlePass}
                      placeholder="تکرار رمز عبور"
                      className="w-full p-2 pl-10 border-b-2 border-b-stone-200  dark:border-b-stone-400 placeholder:text-sm placeholder:text-stone-300 focus:outline-none focus:ring-0 autofill:bg-transparent focus:bg-transparent active:bg-transparent"
                    />
                  </div>
                </>
              )}
              <div className='flex justify-between items-center mb-4'>
                <Link to="/" className='text-sm self-end cursor-pointer text-[#c6dfa1] dark:text-gray-400 hover:text-lime-500 dark:hover:text-gray-300'>حساب کاربری دارم</Link>
                {cooldown === 0 ? (
                  <button type="submit"
                    disabled={loading}
                    className={`w-30 text-white py-1.5 mb-2 rounded ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-neutral-400 cursor-pointer'}`}>
                    {loading ? (
                      <span className="flex items-center justify-center">
                        در حال ارسال <LoadingDots />
                      </span>
                    ) : 'ارسال کد'}
                  </button>
                ) : (
                  <button type="submit"
                    disabled={loading}
                    className={`w-30 text-white py-1.5 rounded ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-neutral-400 cursor-pointer'}`}>
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
            <p className={`mt-3 text-center text-sm ${isSuccessMessage(message) ? 'text-green-600' : 'text-red-600 dark:text-red-400'}`}>
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