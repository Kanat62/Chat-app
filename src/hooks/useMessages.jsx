import React, { useEffect, useState } from "react";
import client, {
    COLLECTION_ID_MESSAGES,
    DATABASE_ID,
    databases,
} from "../services/appwriteConfig";
import { ID, Query, Permission, Role } from "appwrite";
import { useAuth } from "../utils/AuthContext";

export const useMessages = () => {
    const [loader, setLoader] = useState(false);
    const [messages, setMessages] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        getMessages();

        const unsubscribe = client.subscribe(
            `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
            (response) => {
                if (
                    response.events.includes(
                        "databases.*.collections.*.documents.*.create"
                    )
                ) {
                    setMessages((prevState) => [
                        ...prevState,
                        response.payload,
                    ]);
                }

                if (
                    response.events.includes(
                        "databases.*.collections.*.documents.*.delete"
                    )
                ) {
                    setMessages((prevState) =>
                        prevState.filter(
                            (message) => message.$id !== response.payload.$id
                        )
                    );
                }
            }
        );
        return () => {
            unsubscribe();
        };
    }, []);
    const getMessages = async () => {
        setLoader(true);
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [Query.orderAsc("$createdAt"), Query.limit(1000)]
        );
        setMessages(response.documents);
        setLoader(false);
    };

    const sendMessage = async (value) => {
        const permissions = [Permission.write(Role.user(user.$id))];
        const payload = {
            user_id: user.$id,
            user_name: user.name,
            user_email: user.email,
            text: value,
        };
        await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            permissions
        );
        getMessages()
    };

    const sendImage = async (image) => {
        const permissions = [Permission.write(Role.user(user.$id))];
        const payload = {
            user_id: user.$id,
            username: user.name,
            img_url: image.url,
            img_size: image.size,
        };
        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            permissions
        );
    };

    const deleteMessage = async (id) => {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, id);
        setMessages((prevState) =>
            prevState.filter((message) => message.$id !== id)
        );
    };

    const clearMessages = async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID_MESSAGES,
                [Query.orderAsc("$createdAt"), Query.limit(1000)]
            );
            const deletePromises = response.documents.map((doc) =>
                databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, doc.$id)
            );
        } catch (error) {
            console.error("Error clearing collection:", error);
        }
    };

    return {
        messages,
        sendMessage,
        deleteMessage,
        sendImage,
        loader,
        clearMessages,
    };
};
