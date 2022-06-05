import React, { ReactNode } from "react";

interface IAuthLayout {
    children: ReactNode;
}

const AuthLayout: React.FC<IAuthLayout> = props => {
    return (
        <React.Fragment>
            Authenticated
            {props.children}
        </React.Fragment>
    );
}

export default AuthLayout;