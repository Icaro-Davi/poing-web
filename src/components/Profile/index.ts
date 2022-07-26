import styled from "styled-components";

export const Profile = styled.div<{ imageSrc: string }>`
    width: clamp(80px, 5vw, 100px);
    height: clamp(80px, 5vw, 100px);
    background-image: url(${props => props.imageSrc});
    background-size: cover;
    border-radius: 100%;
`;