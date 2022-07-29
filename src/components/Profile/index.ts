import styled from "styled-components";

export const Profile = styled.div<{ imageSrc: string, size?: number }>`
    width: ${props => props.size ? `${props.size}px` : 'clamp(80px, 5vw, 100px)'};
    height: ${props => props.size ? `${props.size}px` : 'clamp(80px, 5vw, 100px)'};
    background-image: url(${props => props.imageSrc});
    background-size: cover;
    background-position: center;
    border-radius: 100%;
`;