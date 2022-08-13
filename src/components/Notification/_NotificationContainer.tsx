import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { Notification } from "./styled";
import type { NotificationItem, NotificationRef } from "./types";

interface IProps {
    notifications: NotificationItem[];
    notificationRef: NotificationRef;
    removeNotification: (notificationId: string) => boolean;
}

const _NotificationContainer: FC<IProps> = props => {
    const [_, forceUpdate] = useState(false);
    useEffect(() => {
        props.notificationRef.forceUpdate = () => forceUpdate(f => !f);
    }, [props.notificationRef]);
    const renderNotifications = useCallback((notifications: NotificationItem[]) => notifications
        .map(({ Component, ...Notification }: NotificationItem) => (
            <Component key={Notification.id} {...Notification} />
        )), []);
    if (props.notifications.length)
        return (
            <Notification>
                {renderNotifications(props.notifications)}
            </Notification>
        );
    else
        return <Fragment />
}

export default _NotificationContainer;