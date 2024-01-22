import styles from "./style.module.scss";
import deleteIcon from "../../assets/imgs/delete.svg";
import { useRef } from "react";
import { converterTime } from "../../utils/functions";

const MessageUser = ({ message, showDeleteBtn, isActive, deleteMessage }) => {
    const messageRef = useRef();
    const handledeleteMessage = (id) => {
        console.log(id);
        messageRef.current.style.background = "red";
        deleteMessage(id);
    };
    return (
        <div className={styles.messageUser} id={message.$id}>
            <div
                className={
                    isActive
                        ? styles.messageDeleteShow
                        : styles.messageDeleteHide
                }
            >
                <img
                    src={deleteIcon}
                    alt=""
                    className={styles.messageDeleteIcon}
                    onClick={() => handledeleteMessage(message.$id)}
                />
            </div>

            <div
                className={message.text ? styles.item : styles.itemImg}
                onClick={() => showDeleteBtn(message.$id)}
                ref={messageRef}
            >
                {message.text ? (
                    <div className={styles.itemText}>{message.text}</div>
                ) : (
                    <>
                        <div className={styles.itemImgBox}>
                            <img src={message.img_url} alt="" />
                        </div>
                        <div className={styles.itemImgSize}>12kb</div>
                    </>
                )}
                <div className={styles.itemTime}>
                    {converterTime(message?.$createdAt)}
                </div>
            </div>
        </div>
    );
};

export default MessageUser;

// {message.text ? (
//     <div
//         className={styles.item}
//         onClick={() => showDeleteBtn(message.$id)}
//         ref={messageRef}
//     >
//         <div className={styles.itemText}>{message.text}</div>
//         <div className={styles.itemTime}>
//             {converterTime(message?.$createdAt)}
//         </div>
//     </div>
// ) : (
//     <div className={styles.itemImgContainer} onClick={() => showDeleteBtn(message.$id)}>
//         <div className={styles.itemImgBox}>
//             <img src={message.img_url} alt="" />
//         </div>
//         <div className={styles.itemImgInfo}>
//             <div className={styles.itemImgWeight}>21kb</div>
//             <div className={styles.itemTime}>
//                 {converterTime(message?.$createdAt)}
//             </div>
//         </div>
//     </div>
// )}
