import { ModalActionType, ModalStateType } from "./modal.types";

export enum ModalAction {
    UPDATE_MODAL_CONTENT = 'UPDATE_MODAL_CONTENT',
    OPEN_MODAL = 'OPEN_MODAL',
    CLOSE_MODAL = 'CLOSE_MODAL',
    MODAL_COMPONENT = 'MODAL_COMPONENT'
}

function modalReducer(state: ModalStateType, action: ModalActionType<keyof typeof ModalAction>): ModalStateType {
    switch (action.type) {
        case ModalAction.CLOSE_MODAL:
            return { ...state, visibility: false };
        case ModalAction.OPEN_MODAL:
            return { ...state, visibility: true };
        case ModalAction.UPDATE_MODAL_CONTENT:
            return { ...state, content: action.payload?.content || {} };
        case ModalAction.MODAL_COMPONENT:
            return {
                ...state,
                ...action.payload?.Component ? { Component: action.payload?.Component } : {}
            };
        default:
            return state;
    }
}

export default modalReducer;