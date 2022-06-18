import styled, { keyframes } from "styled-components";

const glowEffect = (color: string) => keyframes`
    from {
        box-shadow:
        1px 1px 30px ${color},
        -1px -1px 30px ${color},
        1px -1px 30px ${color},
        -1px 1px 30px ${color};
    }
    to {
        box-shadow:
        1px 1px 40px ${color},
        -1px -1px 40px ${color},
        1px -1px 40px ${color},
        -1px 1px 40px ${color},
        1px 1px 60px ${color},
        -1px -1px 60px ${color},
        1px -1px 60px ${color},
        -1px 1px 60px ${color};
    }
`;

export const LogoContainer = styled.div`
    width: 100px;
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    justify-content: center;
    position: relative;
    ::before {
        content: '';
        top: 8px;
        width: 80%;
        height: 80%;
        position: absolute;
        align-self: center;
        animation: ${props => glowEffect(props.theme.colors.white)} 10s ease-in-out infinite alternate;
    };
    ::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 5;
    }
`

export const LogoName = styled.h1`
    user-select: none;
    font-family: "Pattaya", sans-serif;
    font-weight: lighter;
    font-size: 35px;
    color: ${props => props.theme.colors.secondary};
    z-index: 5;
    text-shadow:
    -1px -1px 0 ${props => props.theme.colors.white},
    1px -1px 0 ${props => props.theme.colors.white},
    -1px 1px 0 ${props => props.theme.colors.white},
    1px 1px 0 ${props => props.theme.colors.white},
    2px 2px 3px ${props => props.theme.colors.black};
`;

export const Circle = styled.div<{ size?: number; x: number; y: number; }>`
    border-radius: 100%;
    position: absolute;
    top: ${props => props.x || 0}px;
    left: ${props => props.y || 0}px;
    background-color: ${props => props.theme.colors.white};
    width: ${props => props.size || 50}px;
    height: ${props => props.size || 50}px;
`;