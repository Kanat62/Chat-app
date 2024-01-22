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

    useEffect(() => {
        setLoading(false);
        setUser(cookies.get("userData"));
        getUser();
    }, []);

    const getUser = async () => {
        try {
            let userData = await account.get();
            setUser(userData);
            navigate("/");
            cookies.set("userData", userData);
        } catch (err) {
            console.log(err);
        }
    };
    const login = async (userInfo) => {
        setLoading(true);
        try {
            let response = await account.createEmailSession(
                userInfo.email,
                userInfo.password
            );
            let userData = await account.get();
            setUser(userData);
            navigate("/");
            cookies.set("userData", userData);
        } catch (error) {
            setErrorText("Нe правильный пароль или емайл!");
            console.log(error);
        }
        setLoading(false);
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const promise = account.createOAuth2Session(
                "google",
                "http://localhost:5173/",
                "http://localhost:5173/login"
            );
            getUser();
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const logout = async () => {
        cookies.remove("userData");
        setUser(null);
        account.deleteSession("current");
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
            let userData = await account.get();
            setUser(userData);
            navigate("/");
            cookies.set("userData", userData);
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
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};

//Custom Hook
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;