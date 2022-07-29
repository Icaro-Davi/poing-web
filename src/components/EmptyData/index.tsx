import { FC, ReactNode } from "react";
import styled from "styled-components";

const EmptyDataContainer = styled.span`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

interface IProps {
    children?: ReactNode;
    message?: string;
}

const EmptyData: FC<IProps> = ({ children, message }) => {
    return (
        <EmptyDataContainer>
            {message && (
                <h3 style={{ color: "#FFFFFF" }}>{message}</h3>
            )}
            {children}
        </EmptyDataContainer>
    );
}

export default EmptyData;