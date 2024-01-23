import React, { useEffect, useRef } from "react";
import { useAuth } from "../../utils/AuthContext";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { togglePassword } from "../../utils/functions";
import eyeIcon from "../../assets/imgs/eye.svg";
import googleIcon from "../../assets/imgs/google.svg";

const Login = () => {
    const { user, login, errorText,signInWithGoogle } = useAuth();
    const loginForm = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = loginForm.current.email.value;
        const password = loginForm.current.password.value;
        const userInfo = { email, password };

        login(userInfo);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Авторизация</h2>
            <h3 className={styles.subtitle}>Chat App</h3>
            <button className={styles.btnGoogle} onClick={signInWithGoogle}>
                <img src={googleIcon} alt="" />
                <span>Google</span>
            </button>

            <div className={styles.border}>
                <span></span>
                <span className={styles.borderText}>или</span>
                <span></span>
            </div>
            {errorText && <p className={styles.errorText}>{errorText}</p>}
            <form
                onSubmit={handleSubmit}
                ref={loginForm}
                className={styles.form}
            >
                <div className={styles.formField}>
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Емайл..."
                    />
                </div>
                <div className={styles.formField}>
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Пароль..."
                    />
                    <img
                        src={eyeIcon}
                        alt=""
                        onClick={(e) => togglePassword(e.target)}
                    />
                </div>

                <div className={styles.formBtnWrapper}>
                    <button type="submit" className={styles.formBtn}>
                        Войти
                    </button>
                </div>
            </form>

            <p className={styles.formText}>
                У вас ещё нет аккаунта?{" "}
                <Link to="/register">Зарегистрироваться</Link>
            </p>
        </div>
    );
};

export default Login;
