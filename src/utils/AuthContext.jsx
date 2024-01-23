import { createContext, useState, useEffect, useContext } from "react";
import client, { account } from "../services/appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Loader from "../components/Loader/Loader";

const AuthContext = createContext();
const cookies = new Cookies();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [errorText, setErrorText] = useState(null);

    const projectUrl = window.location.href;
    const projectUrlLogin = window.location.href + "login";

    useEffect(() => {
        setLoading(false);
        const getUserCookies = cookies.get("userData");
        if (getUserCookies) {
            setUser(getUserCookies);
            console.log("cookies", cookies.get("userData"));
        }
        getUser();
    }, []);

    const getUser = async () => {
        try {
            let userData = await account.get();
            if (userData) {
                setUser(userData);
                navigate("/");
                cookies.set("userData", userData);
                console.log("getUser", userData);
            }
        } catch (err) {
            return false
        }
    };
    const login = async (userInfo) => {
        setLoading(true);
        try {
            let response = await account.createEmailSession(
                userInfo.email,
                userInfo.password
            );
            getUser();
        } catch (error) {
            setErrorText("Нe правильный пароль или емайл!");
            console.log(error);
        }
        setLoading(false);
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            account.createOAuth2Session("google", projectUrl, projectUrlLogin);
        } catch (error) {
            console.error(error);
        }
        getUser();
        setLoading(false);
    };

    const logout = async () => {
        const resp = await account.deleteSession("current");
        cookies.remove("userData");
        setUser(null);
    };

    const register = async (userInfo) => {
        setLoading(true);
        try {
            let response = await account.create(
                ID.unique(),
                userInfo.email,
                userInfo.password1,
                userInfo.name
            );

            await account.createEmailSession(
                userInfo.email,
                userInfo.password1
            );
            getUser();
        } catch (error) {
            setErrorText("Пользователь с таким емайлом уже существует!");
            console.log(error);
        }

        setLoading(false);
    };

    const contextData = {
        user,
        errorText,
        setErrorText,
        login,
        logout,
        register,
        signInWithGoogle,
        getUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
