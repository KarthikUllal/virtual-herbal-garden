import api from "../utils/axios";

export const addBookmark = async (plantId) => {
    const response = await api.post(
        `/bookmarks/${plantId}`
    );

    return response.data;
};

export const removeBookmark = async (plantId) => {
    const response = await api.delete(
        `/bookmarks/${plantId}`
    );

    return response.data;
};

export const checkBookmark = async (plantId) => {
    const response = await api.get(
        `/bookmarks/${plantId}`
    );

    return response.data;
};

export const getUserBookmarks = async () => {
    const response = await api.get(
        "/bookmarks"
    );

    return response.data;
};