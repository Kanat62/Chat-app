import React, { useRef } from "react";
import { useAuth } from "../../utils/AuthContext";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { togglePassword } from "../../utils/functions";
import eyeIcon from "../../assets/imgs/eye.svg";
import googleIcon from "../../assets/imgs/google.svg";

const Register = () => {
    const { register, errorText, setErrorText,signInWithGoogle } = useAuth();
    const registerForm = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = registerForm.current.name.value;
        const email = registerForm.current.email.value;
        const password1 = registerForm.current.password1.value;
        const password2 = registerForm.current.password2.value;

        if (password1 !== password2) {
            return setErrorText("Пароли не совпадают!");
        } else if (password1.length < 8) {
            return setErrorText("Пароль должен быть не менше 8");
        }
        const userInfo = { name, email, password1, password2 };

        register(userInfo);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Регистрация</h2>
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
                ref={registerForm}
                onSubmit={handleSubmit}
                className={styles.form}
            >
                <div className={styles.formField}>
                    <input required type="text" name="name" placeholder="Имя" />
                </div>
                <div className={styles.formField}>
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Емайл"
                    />
                </div>
                <div className={styles.formField}>
                    <input
                        required
                        type="password"
                        name="password1"
                        placeholder="Пароль"
                    />
                    <img
                        src={eyeIcon}
                        alt=""
                        onClick={(e) => togglePassword(e.target)}
                    />
                </div>
                <div className={styles.formField}>
                    <input
                        required
                        type="password"
                        name="password2"
                        placeholder="Повторите пароль"
                    />
                    <img
                        src={eyeIcon}
                        alt=""
                        onClick={(e) => togglePassword(e.target)}
                    />
                </div>

                <div className={styles.formBtnWrapper}>
                    <button type="submit" className={styles.formBtn}>
                        Регистрация
                    </button>
                </div>
            </form>

            <p className={styles.formText}>
                У вас есть аккаунт? <Link to="/login">Войти</Link>
            </p>
        </div>
    );
};

export default Register;
