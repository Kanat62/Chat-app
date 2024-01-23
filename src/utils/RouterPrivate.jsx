import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const RouterPrivate = () => {
    const {user} = useAuth()

    useEffect(() => {
        console.log(user);
    }, [user]);
    
    return user ? <Outlet/> : <Navigate to='/login'/>
}

export default RouterPrivate
