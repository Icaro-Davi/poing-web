import { createRoot } from 'react-dom/client';
import NotificationContainer from './_NotificationContainer';
import NotificationNode from './_NotificationItem';
import type { NotificationItem, NotificationRef, OpenNotificationOptions } from './types';
import { NOTIFICATION_BOX_CLOSE_ANIMATION_DELAY } from './styled';

const PORTAL_CLASS_NAME = Math.random().toString(16).slice(2, 10);
const isBrowser = typeof window !== 'undefined';
const ElementPortal = isBrowser && (() => {
    const node = document.createElement('div');
    node.classList.add(PORTAL_CLASS_NAME);
    (!document.getElementsByClassName(PORTAL_CLASS_NAME).length)
        && document.getElementsByTagName('body')[0].appendChild(node);
    return node;
})();

class Notification {
    private readonly NotificationRoot = (ElementPortal ? createRoot(ElementPortal) : undefined);
    private readonly notificationList: NotificationItem[] = [];
    private readonly notificationRef: NotificationRef = {} as NotificationRef;

    constructor() {
        this.NotificationRoot && this.NotificationRoot
            .render(
                <NotificationContainer
                    notificationRef={this.notificationRef}
                    notifications={this.notificationList}
                    removeNotification={this.removeNotification}
                />
            );
    }

    private removeNotification(id: string) {
        const notificationIndex = this.notificationList.findIndex(notification => notification.id === id);
        if (notificationIndex > -1) {
            const notification = this.notificationList[notificationIndex];
            clearTimeout(notification.timeoutRef);
            this.notificationList.splice(notificationIndex, 1);
            this.notificationRef.forceUpdate();
            console.log('removed', notification.id);
            return true;
        }
        return false;
    }

    /**
     * @param timeout - Minimum timeout notification is 6000 milliseconds.
     */
    open(options: OpenNotificationOptions, timeout = 6000) {
        const id = Math.random().toString(36).slice(2, 10);
        const notificationItem: NotificationItem = {
            id, options,
            Component: NotificationNode,
            timeout: timeout >= 6000 ? timeout : 6000,
            destroy: () => {
                clearTimeout(notificationItem.timeoutRef);
                document.getElementById(id)?.classList.add('close');
                notificationItem.timeoutRef = setTimeout(() => {
                    this.removeNotification(id);
                    options.onClose && options.onClose();
                }, NOTIFICATION_BOX_CLOSE_ANIMATION_DELAY);
            },
            startTimeout: () => {
                notificationItem.timeoutRef = setTimeout(notificationItem.destroy, notificationItem.timeout - NOTIFICATION_BOX_CLOSE_ANIMATION_DELAY);
                console.log('created', notificationItem.id, 'ends in', notificationItem.timeout, 'milliseconds.');
                return notificationItem.timeoutRef;
            }
        }
        this.notificationList.unshift(notificationItem);
        this.notificationRef.forceUpdate();
        return { id, destroy: notificationItem.destroy }
    }
}



export default new Notification();