import { FC, ReactNode } from "react";
import styled, { css, CSSProperties } from "styled-components";

type PropsButtonType = {
    focusColor: string;
    blurColor: string;
    textColor: string;
    active: boolean;
}

const DefaultButton = styled.button<Partial<PropsButtonType>>`
    cursor: pointer;
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto;
    padding: .6em .3em;
    border: 0;
    border-radius: 5px;
    font-size: 1.2em;
    font-weight: bold;
    color: ${props => props.textColor || '#f8f8ff'};
    background: ${props => props.focusColor || 'linear-gradient(to right, #8e2de2, #4a00e0)'};
    overflow: hidden;
    span{
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: .5em;
    }
    ::before{
        content: '';
        position: absolute;
        top: 0;
        left: -10%;
        width: 120%; height: 100%;
        background-color: ${props => props.blurColor || props.theme.colors.black};
        transform: ${props => props.active ? 'translate3d(100%, 0, 0)' : 'skew(30deg)'};
        transition: transform .4s cubic-bezier(0.39, 0.575, 0.565, 1);
    }
    ${props => props.disabled
        ? css` ::after{
            content: '';
            cursor: not-allowed;
            z-index: 10;
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            background-color: #FFFFFF44;
        }
    `: css` :hover::before{
            transform: translate3d(100%, 0, 0);
        }
        :active{
            transform: scale(.95);
        }
    `}
`;

interface IProps extends Partial<Omit<PropsButtonType, 'disabled'>> {
    children: ReactNode;
    onClick?: () => void;
    style?: CSSProperties;
    icon?: ReactNode;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const Button: FC<IProps> = ({ icon, children, type = 'button', ...props }) => (
    <DefaultButton {...props} {...{ type }}>
        <span>
            {icon}
            {children}
        </span>
    </DefaultButton>
);

export default Button;