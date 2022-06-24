import { useEffect, useReducer } from "react";
import { ModalComponent, ModalComponentWrapper, ModalConfigType } from "./modal.types";
import ModalWrapper from "./ModalWrapper";
import modalReducer from "./reducer";

function useModal<Props extends { [key: string]: any }>(Component: ModalComponentWrapper<Props>, initialContent?: Partial<Props>): [ModalComponent, ModalConfigType<Props>] {
    const [state, dispatch] = useReducer(modalReducer, {
        visibility: false,
        content: initialContent || {},
        Component: ModalWrapper<Props>({ Component })
    });

    const modal: ModalConfigType<Props> = {
        isActivated: state.visibility,
        open: () => dispatch({ type: 'OPEN_MODAL' }),
        close: () => dispatch({ type: 'CLOSE_MODAL' }),
        setContent: (content) => dispatch({
            type: 'UPDATE_MODAL_CONTENT',
            payload: { content }
        })
    }

    useEffect(() => {
        const ModalComponent = ModalWrapper<Props>({ Component, Config: { modal }, ...state.content });
        dispatch({
            type: 'MODAL_COMPONENT',
            payload: { Component: ModalComponent }
        });
    }, [state.content]);

    return [state.Component, modal];
}

export default useModal;