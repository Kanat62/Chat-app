import { React, useRef, useState } from "react";
import styles from "./style.module.scss";
import { useMessages } from "../../hooks/useMessages";
import imgIcon from "../../assets/imgs/image.svg";
import sendIcon from "../../assets/imgs/send.svg";
import clearIcon from "../../assets/imgs/close.svg";
import { useModalContext } from "../../hooks/useModalContext";
import { btnAnimation } from "../../utils/functions";

const Input = () => {
    const { sendMessage } = useMessages();
    const [value, setValue] = useState("");
    const {inputRef, hangleSelectImages } = useModalContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim() === "") return;
        sendMessage(value);
        btnAnimation(e.target)
        setValue("");
    };

    return (
        <form className={styles.inputForm} onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Type a message"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                {!value ? (
                    <>
                        <img
                            src={imgIcon}
                            className={styles.inputImg}
                            onClick={()=> inputRef.current.click()}
                            alt="img"
                        />
                        <input
                            type="file"
                            multiple
                            className={styles.none}
                            ref={inputRef}
                            onChange={hangleSelectImages}
                        />
                    </>
                ) : (
                    <img
                        src={clearIcon}
                        className={styles.inputTextClear}
                        onClick={() => setValue("")}
                    />
                )}
            </div>
            <button type="submit" className={styles.inputSend}>
                <img src={sendIcon} alt="sendMessage" />
            </button>
        </form>
    );
};

export default Input;
