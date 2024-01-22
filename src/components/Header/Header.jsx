import { React, useState } from "react";
import styles from "./style.module.scss";
import MenuModal from "./MenuModal";

import menu from "../../assets/imgs/menu.svg";
import person from "../../assets/imgs/person.svg";
import adminIcon from "../../assets/imgs/admin.png";
import { useAuth } from "../../utils/AuthContext";


const Header = () => {
    const { user } = useAuth();
    const [modalMenuActive ,setModalMenuActive] = useState(false)
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL

    return (
        <div className={styles.header}>
            <div className={styles.headerTitle}>Chat App</div>
            <div className={styles.headerBox}>
                <div className={styles.headerIcon}>
                    {user.email === adminEmail ? (
                    <img src={adminIcon} alt="admin"  className={styles.itemAvatarAdmin}/>
                ) : (
                    <img src={person} alt="person"  className={styles.itemAvatarUser}/>
                )}
                </div>
                <div className={styles.headerMenu}>
                    <img src={menu} alt=":" onClick={()=> setModalMenuActive(true)} />
                    <MenuModal 
                        modalActive={modalMenuActive}
                        setModalActive={setModalMenuActive}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
