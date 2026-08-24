import api from "../utils/axios";

export const createConversation = async () => {
    const response = await api.post("/conversations");

    return response.data;
};

export const sendMessage = async (conversationId, message) => {
    const response = await api.post(
        `/chat/${conversationId}`,
        {
            message
        }
    );

    return response.data;
};

export const getConversation = async (conversationId) => {
    const response = await api.get(
        `/conversations/${conversationId}`
    );

    return response.data;
};


export const getMessages = async (conversationId) => {
    const response = await api.get(
        `/messages/${conversationId}`
    );

    return response.data;
};