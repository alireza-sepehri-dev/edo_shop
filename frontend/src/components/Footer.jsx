import { Link } from "react-router-dom"


export default function Footer() {
    return (
        <>
            <footer className="mt-3">
                <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

                    {/* معرفی سایت */}
                    <div className="order-1 md:order-3">
                        <Link to='/'>
                            <div className='relative'>
                                <img src="" alt="لوگوی Coffee Math" className="w-10 h-10 absolute -top-2 end-0" />
                                <h3 className="font-bold text-lg text-end mb-2 text-purple-700 dark:text-purple-400 pl-12">Coffee Math</h3>
                            </div>
                        </Link>

                        <p className="leading-6 text-justify">
                            Coffee Math یک پلتفرم آموزشی برای دسترسی به جزوات، خدمات مشاوره و منابع درسی با کیفیت است. هدف ما ارتقاء یادگیری با ابزارهای نوین و تجربه کاربری حرفه‌ای است.
                        </p>
                    </div>

                    {/* لینک‌های مفید */}
                    <div className='order-2 md:order-1 flex justify-between md:block'>
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-700">لینک‌های مفید</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="flex items-center gap-2 hover:text-purple-600">
                                        {/* <DocumentTextIcon className="w-4 h-4 text-purple-500" /> */}
                                        جزوات
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="flex items-center gap-2 hover:text-purple-600">
                                        {/* <AcademicCapIcon className="w-4 h-4 text-purple-500" /> */}
                                        مقالات ریاضی
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="flex items-center gap-2 hover:text-purple-600">
                                        {/* <LinkIcon className="w-4 h-4 text-purple-500" /> */}
                                        لینک‌های آموزشی
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* اطلاعات تماس - موبایل */}
                        <div className='md:hidden'>
                            <h4 className="font-semibold mb-2 text-blue-700">ارتباط با ما</h4>
                            <p className="mb-1">ایمیل: <a href="mailto:support@coffeemath.ir" className="text-purple-600 hover:underline">support@coffeemath.ir</a></p>
                            <p className="mb-4">تلفن: ۰۵۱-۳۲۳۴۵۶۷۸</p>
                        </div>
                    </div>

                    {/* اطلاعات تماس - دسکتاپ */}
                    <div className="hidden md:block order-2">
                        <h4 className="font-semibold mb-2 text-blue-700">ارتباط با ما</h4>
                        <p className="mb-1">ایمیل: <a href="mailto:coffeemath70@gmail.com" className="text-purple-600 hover:underline">support@coffeemath.ir</a></p>
                        <p className="mb-4">تلفن: ۰۵۱-۳۲۳۴۵۶۷۸</p>
                    </div>
                </div>

                {/* امضای تیم توسعه‌دهنده */}
                <div className='container mx-auto mt-20 relative'>
                    <div className='absolute bottom-1 end-1'>
                        <p className="text-xs text-gray-500">
                            طراحی و توسعه توسط <br />علیرضا سپهری ۰۹۱۵۵۸۰۳۸۶۲
                        </p>
                        <div className="mb-2 text-center">
                            <img src="" alt="لوگوی CodeNest Studio" className="w-15 h-9 object-contain mx-auto" />
                        </div>
                    </div>
                </div>

                {/* کپی‌رایت */}
                <div className="bg-gray-200 text-center py-3 text-xs text-gray-600">
                    {/* © {new Date().getFullYear()} Coffee Math. تمامی حقوق محفوظ است. */}
                </div>
            </footer>
        </>
    )
}