import { useEffect, useState } from "react";

type ImageLink = string;

const useImageLoad = (image: ImageLink) => {
    const [imageLoaded, setImageLoad] = useState(false);
    useEffect(() => {
        setImageLoad(false);
        const img = new Image();
        img.onload = () => {
            setImageLoad(true);
        }
        img.src = image;
    }, [image]);
    return imageLoaded;
}

export default useImageLoad;