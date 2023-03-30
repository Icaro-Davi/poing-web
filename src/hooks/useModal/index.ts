import { useMemo, useReducer, ComponentType } from "react";
import { ModalComponentWrapper, ModalConfigType } from "./modal.types";
import ModalWrapper from "./ModalWrapper";
import modalReducer from "./reducer";

function useModal<Props extends { [key: string]: any }>(Component: ModalComponentWrapper<Props>, initialContent?: Partial<Props>): [ComponentType, ModalConfigType<Props>] {
    const [state, dispatch] = useReducer(modalReducer, {
        visibility: false,
        content: initialContent || {},
    });

    const modal: ModalConfigType<Props> = useMemo(() => ({
        isActivated: state.visibility,
        open: () => dispatch({ type: 'OPEN_MODAL' }),
        close: () => dispatch({ type: 'CLOSE_MODAL' }),
        setContent: (content) => dispatch({
            type: 'UPDATE_MODAL_CONTENT',
            payload: { content }
        })
    }), [state.visibility]);

    const ModalComponent = useMemo(() => ModalWrapper<Props>({ Component, Config: { modal }, ...state.content }), [modal, Component, state.content]);

    return [ModalComponent, modal];
}

export default useModal;