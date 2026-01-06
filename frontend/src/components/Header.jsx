import { Link } from "react-router-dom"


export default function Header() {
    return (
        <>
            <div className='header shadow-xl px-4'>
                <div className="container mx-auto h-18.75 flex justify-between items-center">
                    <Link to="/">
                        <img className='w-14' src="" alt="لوگوی Coffee Math" />
                    </Link>
                    <div className="text-left w-[70%]">
                        <h1 className='font-bold'>Coffee Math</h1>
                        <div id="header-line" className='h-0.5 bg-gray-700 dark:bg-gray-400 relative'></div>
                        <span className='font-semibold'>
                            {/* {token ? (
                                <>
                                    <Link
                                        to={user?.role === 'student'
                                            ? "/student/profile"
                                            : "/teacher/dashboard"}
                                    >
                                        {user?.first_name || user?.last_name
                                            ? `${user.first_name} ${user.last_name}`
                                            : user?.username}
                                    </Link>
                                </>
                            ) : ( */}
                                'Welcome'
                            {/* )} */}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}