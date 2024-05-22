export type ModalConfigType<P> = {
    isActivated: boolean;
    open: () => void;
    close: () => void;
    setContent: (content: P) => void;
}

export type ModalComponentWrapper<P extends { [key: string]: any } = {}> = React.ComponentType<P & { modal: ModalConfigType<P> }>;
export type ModalComponent = React.ComponentType;

export type ModalWrapperParams<P extends { [key: string]: any } = {}> = {
    Component: React.ComponentType<any>,
    Config?: { modal: ModalConfigType<P> }
};

export type ModalStateType<P extends { [key: string]: any } = {}> = {
    visibility: boolean;
    content: P;
}

export type ModalActionType<T> = {
    type: T;
    payload?: Partial<ModalStateType>;
}