import styled, { css, keyframes } from "styled-components";

export const NOTIFICATION_BOX_CLOSE_ANIMATION_DELAY = 100;

export const Notification = styled.div`
    position: fixed;
    top: 1rem; right: 1rem;
    z-index: 100;
    max-width: 400px;
`;

const toLeftAnimation = keyframes`
    from {
        left: calc(100% + 1rem);
        opacity: 0;
    }
    to {
        left: 0;
        opacity: 1;
    }
`;

const closeAnimation = keyframes`
    from{
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(.6);
        opacity: 0;
    }
`;

const progressAnimation = keyframes`
    from{
        width: 100%;
    }
    to {
        width: 0;
    }
`;

export const NotificationBox = styled.div<{ borderColor: string, timeout: number, withProgressBar: boolean }>`
    display: inline-block;
    position: relative;
    left:0;
    width: 100%;
    min-height: 50px;
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 1rem;
    box-shadow: 0 0 3px 5px ${props => props.borderColor || '#FFFFFF'};

    font-family: 'Robotto', sans-serif;

    animation: ${toLeftAnimation} cubic-bezier(.4,0,.2,1) 500ms;
    ${props => props.withProgressBar && css`
        ::after{
            content: '';
            position: absolute;
            bottom: 0; left: 0;
            height: 3px;
            background-color: ${props.borderColor || '#FFFFFF'};
            width: 100%;
            animation: ${progressAnimation} linear ${props.timeout - NOTIFICATION_BOX_CLOSE_ANIMATION_DELAY}ms;
        }
    `}

    :not(:last-child){
        margin-bottom: 1.2rem;
    }

    :hover{
        transform: scale(1.02);
    }

    &.close {
        transform: scale(.6);
        opacity: 0;
        animation: ${closeAnimation} linear ${NOTIFICATION_BOX_CLOSE_ANIMATION_DELAY}ms;
    }
`;

export const NotificationTitle = styled.h4`
    flex: 1;
`;

export const NotificationHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const NotificationButtonContainer = styled.div`
    margin-top: .5rem;
    display: flex;
    justify-content: flex-end;
`;