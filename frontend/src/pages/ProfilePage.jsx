import { Link } from 'react-router-dom';
import { useAuthStore } from "../services/auth"

export default function ProfilePage() {
    const { logout } = useAuthStore()

    const userData = {
        "نام کاربری": "az.sepehri.py@gmail.com",
        "تاریخ تولد": "۲۸ شهریور ۱۳۶۴",
        "نام و نام خانوادگی": "علیرضا سپهری",
        "شماره تماس": "09153235504",
        "ایمیل": "az.sepehri.py@gmail.com",
        "شهر": "مشهد",
        "پایه تحصیلی": "دوازدهم",
        "رشته تحصیلی": "ریاضی",
        "نام مدرسه": "مدرسه ثامنی",
        "تاریخ ثبت نام": "۱۶ دی ۱۴۰۴",
        "تاریخ آخرین لاگین": "۱۶ دی ۱۴۰۴"
    };

    return (
        <>
            <div className="container mx-auto flex flex-col flex-1">
                <div className="main-rounded-page flex-1 mt-10 rounded-t-[50px]">

                    <div className='box-style pt-12 pb-5 px-6 my-12 w-11/12 mx-auto border-2 rounded-md relative'>

                        {/* تصویر پروفایل */}
                        <div className="mb-6 md:mb-0 md:order-2 flex justify-center w-full md:w-auto">
                            <img
                                src=""
                                alt=""
                                className='box-style w-27.5 h-27.5 rounded-full object-cover border p-1'
                            />
                        </div>

                        {/* مشخصات */}
                        <div className='flex-1 md:order-1 mb-7'>
                            <h2 className="text-xl font-bold mb-2 text-lime-600 dark:text-[#88a760]">مشخصات</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                {Object.entries(userData).map(([key, value]) => (
                                    <div key={key} className="flex sm:flex-row sm:items-center">
                                        <span className="text-sm font-semibold w-32">{key}:</span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='text-end mb-2'>
                            <Link to="/"
                                className='btn-back py-3 px-5 rounded transition-colors'>بازگشت</Link>
                            <Link to="/" className="btn-update py-3 px-5 mr-3 rounded transition-colors">
                                تکمیل و ویرایش اطلاعات
                            </Link>
                        </div>
                    </div>

                    <button className="bg-amber-700 rounded p-3 cursor-pointer"
                        onClick={logout}>
                        خروج
                    </button>
                </div>
            </div>
        </>
    )
}