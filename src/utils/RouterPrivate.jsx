import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const RouterPrivate = () => {
    const {user,getUser} = useAuth()

    useEffect(() => {
        console.log(user);
        getUser()
    }, []);
    
    return user ? <Navigate to='/'/> : <Navigate to='/login'/>
}

export default RouterPrivate
