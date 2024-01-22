import React, { createRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";

const MessageDate = ({ createdAt }) => {
    return (
        <div className={styles.messageDateBox}>
            <div className={styles.messageDateBorder}></div>
            <div className={styles.messageDate}>{createdAt ? createdAt : '00:00:00'}</div>
            <div className={styles.messageDateBorder}></div>
        </div>
    );
};

export default MessageDate;
