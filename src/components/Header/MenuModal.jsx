import React from "react";
import styles from "./style.module.scss";
import { useAuth } from "../../utils/AuthContext";
import { useMessages } from "../../hooks/useMessages";

const MenuModal = ({ modalActive, setModalActive }) => {
    const { user, logout } = useAuth();
    const { clearMessages } = useMessages();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
    return (
        <div
            className={modalActive ? styles.modalBody : styles.close}
            onClick={() => setModalActive(false)}
        >
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                {user.email === adminEmail && (
                    <button
                        onClick={() => {
                            clearMessages();
                            setModalActive(false);
                        }}
                    >
                        Очистить чат
                    </button>
                )}

                <button onClick={logout}>Выйти</button>
            </div>
        </div>
    );
};

export default MenuModal;
