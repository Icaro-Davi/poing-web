export type ModalConfigType<P> = {
    isActivated: boolean;
    open: () => void;
    close: () => void;
    setContent: (content: P) => void;
}

type ModalComponentType<P = {}> = {
    modal: ModalConfigType<P>;
} & P;

export type ModalComponent<P extends { [key: string]: any } = {}> = React.ComponentType<ModalComponentType<P>>;

export type ModalStateType<P extends { [key: string]: any } = {}> = {
    visibility: boolean;
    content: P;
}

export type ModalActionType<T> = {
    type: T;
    payload?: Partial<ModalStateType>;
}

