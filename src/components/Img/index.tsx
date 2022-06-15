import Image from "next/image";
import styled from "styled-components";

interface IImg extends React.HTMLAttributes<HTMLDivElement>{
    imageSrc: string;
    alt: string;
}

const Img: React.FC<IImg> = ({ imageSrc, alt, ...props}) => {
    return (
        <div {...props}>
            <Image
                priority
                layout="fill"
                objectFit="contain"
                src={imageSrc}
                alt={alt}
            />
        </div>
    )
}

export default styled(Img)``;