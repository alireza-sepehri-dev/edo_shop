import { useAuthStore } from "../services/auth"

export default function ProfilePage () {
    const { logout } = useAuthStore()

    return (
        <div className="text-5xl text-center mt-25">
            my profile
            <br></br>
            <button className="mt-30 bg-amber-700 rounded p-3 cursor-pointer" 
                onClick={logout}>خروج</button>
        </div>
    )
}