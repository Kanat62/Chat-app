import { Routes, Route } from "react-router-dom";

import Chat from "./pages/Chat/Chat.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import RouterPrivate from "./utils/RouterPrivate";

function App() {
    console.log( window.location.href + 'login')
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<RouterPrivate />}>
                    <Route path="/" element={<Chat />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
