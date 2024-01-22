import { React, useEffect, useState } from "react";
import styles from "./style.module.scss";
import sendIcon from "../../assets/imgs/send.svg";
import closeIcon from "../../assets/imgs/close.svg";
import { useModalContext } from "../../hooks/useModalContext";
import { formatBytes } from "../../utils/functions";
import Loader from "../Loader/Loader";

const ModalImages = () => {
    const {images, setImages, modalOpen, closeModal, inputRef, uploadImgs,hangleDelete} = useModalContext();
    const [loader, setLoader] = useState(false)
    useEffect(()=>{
        if(modalOpen) {
            setLoader(true)
        }
        if(!!images[0]) {
            setLoader(false)
        } 
    },[modalOpen,images])
    return (
        <div className={modalOpen ? styles.modalImages : styles.modalNone}>
            <header className={styles.modalHeader}>
                <div className={styles.modalCount}>Выбрано: {images.length} </div>
                <div
                    className={styles.modalClose}
                    onClick={() => {
                        closeModal()
                        setImages([])
                    }}
                >
                    <img src={closeIcon} alt="" />
                </div>
            </header>
            {loader && <Loader/>}
            <section className={styles.modalImgItems}>
                {!!images[0] && images.map(img=> (
                    <div className={styles.imgItem} key={img.id}>
                        <div className={styles.imgItemDelete} onClick={()=>hangleDelete(img.id)}>
                            <img src={closeIcon} alt="" />
                        </div>
                        <div className={styles.imgItemBox}>
                            <img src={img.url} alt="" />
                        </div>
                        <div className={styles.imgItemSize}>{formatBytes(img.size)}</div>
                    </div>
                ))}
            </section>

            <footer className={styles.modalBtns}>
                <button className={styles.btnSelect} onClick={()=> inputRef.current.click()}>
                    Выбрать
                </button>
                <button  className={styles.btnSend} onClick={uploadImgs}>
                    <img  src={sendIcon}  alt="sendMessage"/>
                </button>
            </footer> 
        </div>
    );
};

export default ModalImages;
