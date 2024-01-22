import { React, useRef, useEffect, useState } from "react";
import MessageClient from "./MessageClient";
import MessageUser from "./MessageUser";
import styles from "./style.module.scss";
import MessageDate from "../MessageDate/MessageDate";
import Loader from "../Loader/Loader";
import { useMessages } from "../../hooks/useMessages";
import { useAuth } from "../../utils/AuthContext";
import { getDateMessages } from "../../utils/functions";

const MessagesGroup = () => {
    const { user } = useAuth();
    const { messages, deleteMessage, loader } = useMessages();

    const [activeDeleteId, setActiveDeleteId] = useState(null);
    const scrollEl = useRef();

    useEffect(() => {
        scrollEl.current.scrollTop = scrollEl.current.scrollHeight;
    }, [messages]);

    const showDeleteBtn = (messageId) => {
        setActiveDeleteId(messageId);
    };
    if (activeDeleteId) {
        window.onclick = (e) => {
            if (
                e.target.parentElement.parentElement.getAttribute("id") !==
                    activeDeleteId &&
                e.target.parentElement.parentElement.parentElement.getAttribute(
                    "id"
                ) !== activeDeleteId
            ) {
                setActiveDeleteId(null);
            }
        };
    }
    let prevDate
    const uniqueDate = (date) => {
        if(date !== prevDate) {
            prevDate = date
            return date
        }
        return null
    };
    return (
        <div className={styles.messagesContainer} ref={scrollEl}>
            {loader && <Loader />}
            {messages[0] &&
                messages.map((message) => [
                    uniqueDate(getDateMessages(message.$createdAt)) && (
                        <MessageDate
                            key={message.$id + message.$createAt}
                            createdAt={getDateMessages(message.$createdAt)}
                        />
                    ),
                    user.$id === message.user_id ? (
                        <MessageUser
                            key={message.$id}
                            message={message}
                            isActive={message.$id === activeDeleteId}
                            showDeleteBtn={showDeleteBtn}
                            deleteMessage={deleteMessage}
                        />
                    ) : (
                        <MessageClient key={message.$id} message={message} />
                    ),
                ])}
        </div>
    );
};

export default MessagesGroup;
