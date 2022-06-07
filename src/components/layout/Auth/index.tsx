import React, { ReactNode } from "react";

interface IAuthLayout {
    children: ReactNode;
}

const AuthLayout: React.FC<IAuthLayout> = props => {
    return (
        <React.Fragment>
            <div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>
                Authenticated
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default React.memo(AuthLayout);