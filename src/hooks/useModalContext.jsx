import React, { createContext, useContext, useRef, useState } from "react";
import { useMessages } from "./useMessages";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const {sendImage} = useMessages()
    const inputRef = useRef();

    const openModal = () => {setModalOpen(true)};
    const closeModal = () => { setModalOpen(false)}
  

    const uploadImgs = (e) => {
        if(!images[0]) return
        images.forEach(img => sendImage(img))
        setImages([])
        closeModal()
    };

    const hangleSelectImages = (e) => {
        openModal();
        const files = Array.from(e.target.files)
        files.forEach((file) => {
            const reader = new FileReader()
            reader.onload = () => { 
                const newItem = {id: Date.now(), size: file.size, url: reader.result}
                setImages(prev =>{
                    const  sort = prev.findIndex(item => item.url === newItem.url) 
                    if(sort !== -1) return prev
                    return [...prev, newItem]
                })
            }
            reader.readAsDataURL(file)
        })
    }
    const hangleDelete = (id) => {
        setImages(prev => prev.filter(item => item.id !== id))
        if(images.length === 1){
            return closeModal();
        }
    }
    return (
        <ModalContext.Provider
            value={{
                modalOpen,
                openModal,
                closeModal,
                inputRef,
                images,
                setImages,
                hangleSelectImages,
                uploadImgs,
                hangleDelete
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }
    return context;
};

export { ModalProvider, useModalContext };
