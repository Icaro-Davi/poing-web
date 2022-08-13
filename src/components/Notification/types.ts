import { FunctionComponent, ReactNode, RefObject } from "react";

type Fn = () => void;

export type OpenNotificationOptions = {
    title: string;
    description: string;
    type?: 'default' | 'success' | 'warning' | 'error';
    btn?: ReactNode;
    infinity?: boolean;
    onClose?: Fn;
}

export type NotificationItem = {
    Component: FunctionComponent<Omit<NotificationItem, 'Component'>>;
    options: OpenNotificationOptions;
    id: string;
    timeout: number;
    startTimeout: Fn;
    destroy: Fn;
    timeoutRef?: NodeJS.Timeout;
}

export type NotificationRef = {
    forceUpdate: Fn;
}