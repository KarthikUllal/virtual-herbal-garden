const getOptimizedImageUrl = (
    imageUrl,
    width = 600,
    height = 500
) => {
    if (!imageUrl) {
        return "";
    }

    return imageUrl.replace(
        "/upload/",
        `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`
    );
};

export default getOptimizedImageUrl;