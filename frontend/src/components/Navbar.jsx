import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <>
            <div className='navbar shadow-md'>
                <nav className="container px-4 mx-auto flex justify-between">
                    <div className='flex gap-6'>
                        <Link to="/" className="font-medium py-2 hover:text-lime-600 transition-colors">خانه</Link>
                        <Link to="/lessons" className="font-medium py-2 hover:text-lime-600 transition-colors">جزوات</Link>
                    </div>
                    <div className='flex gap-3 items-center'>
                    </div>
                </nav>
            </div>
        </>
    )
}