import { FC, Fragment, ReactNode } from "react";
import { LoaderContainer, LoadIconContainer } from "./styled";

interface IProps {
    isLoading: boolean;
    children?: ReactNode;
    spinnerColor?: string;
}

const LoadWrapper: FC<IProps> = props => {
    if (props.isLoading) return (
        <LoaderContainer>
            <LoadIconContainer color={props.spinnerColor}>
                <svg viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
            </LoadIconContainer>
            {props.children}
        </LoaderContainer>
    );
    else return (
        <Fragment>
            {props.children}
        </Fragment>
    );
}

export default LoadWrapper;