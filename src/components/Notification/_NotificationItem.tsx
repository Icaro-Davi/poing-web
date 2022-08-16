import { FC, memo, useEffect, useRef } from "react";
import { IoWarningOutline, IoClose, IoCloseCircleOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import defaultTheme from "../../styles/themes/default";
import { IconButton } from "../Buttons";
import { NotificationBox, NotificationButtonContainer, NotificationHeader, NotificationTitle, NOTIFICATION_BOX_CLOSE_ANIMATION_DELAY } from "./styled";

import type { GetReference } from "../../utils/general.types";
import type { NotificationItem } from "./types";
import { Divider } from "../Divider";

type ThemeType = GetReference<GetReference<NotificationItem, 'options'>, 'type'>;
interface IProps extends Omit<NotificationItem, 'Component'> { }

const getTheme = (type: ThemeType) => {
    switch (type) {
        case 'success':
            return {
                mainColor: defaultTheme.colors.success,
                Icon: IoCheckmarkCircleOutline
            };
        case 'warning':
            return {
                mainColor: defaultTheme.colors.warning,
                Icon: IoWarningOutline
            };
        case 'error':
            return {
                mainColor: defaultTheme.colors.error,
                Icon: IoCloseCircleOutline
            };
        default:
            return {
                mainColor: defaultTheme.colors.primary,
                Icon: () => <></>
            };
    }
}

const _NotificationItem: FC<IProps> = ({ startTimeout, timeout, ...props }) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        !props.options.infinity && startTimeout();
        return () => { clearTimeout(props.timeoutRef) };
    }, [startTimeout, props.options.infinity, props.timeoutRef]);
    const { mainColor, Icon, ...rest } = getTheme(props.options.type);
    return (
        <NotificationBox id={props.id} ref={notificationRef} {...{
            timeout, borderColor: mainColor,
            withProgressBar: !props.options.infinity
        }}>
            <NotificationHeader>
                <Icon style={{ marginRight: '1rem' }} color={mainColor} size={35} />
                <NotificationTitle>{props.options.title}</NotificationTitle>
                <IconButton
                    style={{ marginLeft: '1rem' }}
                    onClick={props.destroy}
                    hoverColor={defaultTheme.colors.error}
                    theme={defaultTheme}>
                    <IoClose size={20} />
                </IconButton>
            </NotificationHeader>
            <Divider color={mainColor} width='100%' theme={defaultTheme} />
            <div>
                <p>{props.options.description}</p>
                {props.options.btn && (
                    <NotificationButtonContainer>
                        {props.options.btn}
                    </NotificationButtonContainer>
                )}
            </div>
        </NotificationBox>
    );
}

export default memo(_NotificationItem);