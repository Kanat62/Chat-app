import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const RouterPrivate = () => {
    const {user,getUser} = useAuth()

    // useEffect(() => {
    //     console.log(user);
    //     getUser()
    // }, []);
        console.log(user ? 'user' : 'note found');

    // return user ? <Outlet/> : <Navigate to='/'/>
}

export default RouterPrivate
