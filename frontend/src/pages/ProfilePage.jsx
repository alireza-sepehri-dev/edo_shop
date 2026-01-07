import { Link } from 'react-router-dom';
import api from '../services/api'
import { useAuthStore } from "../services/auth"
import { useState, useEffect } from 'react';
import { formatJalaliDate, formatJalaliDateTime } from '../services/dateUtils';

export default function ProfilePage() {
    const { logout } = useAuthStore()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)
    const labels = {
        username: "نام کاربری",
        email: "ایمیل",
        first_name: "نام",
        last_name: "نام خانوادگی",
        phone_number: "شماره تماس",
        city: "شهر",
        bio: "بیوگرافی",
        birth_date: "تاریخ تولد",
        school_name: "نام مدرسه",
        education_status: "وضعیت تحصیلی",
        major: "رشته تحصیلی",
        grade: "پایه تحصیلی",
        date_joined: "تاریخ ثبت نام",
        last_login: "آخرین ورود"
    }

    useEffect(() => {
        setLoading(true)
        const fetchProfile = async () => {
            try {
                const res = await api.get('users/profile/');
                setUserData(res.data);
            } catch (err) {
                console.error("خطا در گرفتن پروفایل:", err);
            } finally {
                setLoading(false)
            }
        };

        fetchProfile();
    }, [])

    return (
        <>
            <div className="container mx-auto flex flex-col flex-1">
                <div className="main-rounded-page flex-1 mt-10 rounded-t-[50px]">

                    <div className='box-style pt-12 pb-5 px-6 my-12 w-11/12 mx-auto border-2 rounded-md relative'>

                        {/* تصویر پروفایل */}
                        <div className="mb-6 md:mb-0 md:order-2 flex justify-center w-full md:w-auto">
                            <img
                                src={userData.avatar}
                                alt="avatar"
                                className='box-style w-27.5 h-27.5 rounded-full object-cover border p-1'
                            />
                        </div>

                        {/* مشخصات */}
                        <div className='flex-1 md:order-1 mb-7'>
                            <h2 className="text-xl font-bold mb-2 text-lime-600 dark:text-[#88a760]">مشخصات</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                {Object.entries(userData).map(([key, value]) => (
                                    labels[key] ? (
                                        <div key={key} className="flex sm:flex-row sm:items-center">
                                            <span className="text-sm font-semibold w-32">{labels[key]}:</span>
                                            <span>
                                                {["birth_date", "date_joined"].includes(key)
                                                    ? formatJalaliDate(value)
                                                    : ["last_login"].includes(key) 
                                                    ? formatJalaliDateTime(value)
                                                    : (value || "-")
                                                }
                                            </span>
                                        </div>
                                    ) : null
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