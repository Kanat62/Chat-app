import React from "react";
import styles from "./style.module.scss";
import { converterTime, formatBytes } from "../../utils/functions";
import adminIcon from "../../assets/imgs/admin.png";
import personIcon from "../../assets/imgs/person.svg";

const MessageClient = ({ message }) => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
    return (
        <div className={styles.messageClient} id={message.$id}>
            <div className={styles.itemAvatar}>
                {message.user_email === adminEmail ? (
                    <img src={adminIcon} alt="admin"  className={styles.itemAvatarAdmin}/>
                ) : (
                    <img src={personIcon} alt="person"  className={styles.itemAvatarUser}/>
                )}
            </div>
            <div className={styles.item}>
                <div className={styles.itemName}>{message.user_name}</div>
                <div className={message.text ? styles.itemBox : styles.itemImg}>
                    {message.text ? (
                        <div className={styles.itemText}>{message.text}</div>
                    ) : (
                        <>
                            <div className={styles.itemImgBox}>
                                <img src={message.img_url} alt="" />
                            </div>
                            <div className={styles.itemImgSize}>{formatBytes(message.img_size)}</div>
                        </>
                    )}
                    <div className={styles.itemTime}>
                        {converterTime(message?.$createdAt)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageClient;
