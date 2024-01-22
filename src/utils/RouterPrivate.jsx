import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "./AuthContext";

const RouterPrivate = () => {
    const {user} = useAuth()

    return user ? <Outlet/> : <Navigate to='/login'/>
}

export default RouterPrivate