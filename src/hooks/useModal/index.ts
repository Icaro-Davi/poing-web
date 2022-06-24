import { useReducer } from "react";
import { ModalComponent, ModalConfigType } from "./modal.types";
import ModalWrapper from "./ModalWrapper";
import modalReducer from "./reducer";

function useModal<Props extends { [key: string]: any }>(Component: ModalComponent<Props>, initialContent?: Partial<Props>) {
    const [state, dispatch] = useReducer(modalReducer, { visibility: false, content: initialContent || {} });

    const modal: ModalConfigType<Props> = {
        isActivated: state.visibility,
        open: () => dispatch({ type: 'OPEN_MODAL' }),
        close: () => dispatch({ type: 'CLOSE_MODAL' }),
        setContent: (content) => dispatch({ type: 'UPDATE_MODAL_CONTENT', payload: { content } })
    }

    const ModalComponent = ModalWrapper<Props>({ Component, Config: { modal }, ...state.content });

    return { modal, ModalComponent };
}

export default useModal;