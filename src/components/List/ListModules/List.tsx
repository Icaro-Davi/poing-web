import { FC, Fragment } from "react";
import { ModalConfigType } from "../../../hooks/useModal/modal.types";
import BaseError from "../../../utils/error/baseError";
import Switch, { SWITCH_ANIMATION_DELAY } from "../../Form/items/Switch";
import Notification from "../../Notification";
import { Title } from "../../Typography";
import { ListItem } from "../styled";

export type ModuleItem = {
    isActive: boolean;
    name: string;
    modal: () => Omit<ModalConfigType<any>, 'setContent'> | undefined;
    updateActivity: (isChecked: boolean) => Promise<any> | void;
};

const ListModules: FC<{ modules: ModuleItem[], forceUpdate: () => void }> = props => (
    <Fragment>
        {props.modules.map((item, i) => (
            <ListItem key={`list-module-${item.name}`} isActive={item.isActive} onClick={item.isActive ? () => item.modal()?.open() : undefined}>
                <Title level="4" stroke={false} font='Roboto' style={{ fontWeight: '600' }}>
                    <span>{item.name}</span>
                </Title>
                <div onClick={e => e.stopPropagation()}>
                    <Switch
                        key={Math.random().toString(32).slice(2)}
                        defaultChecked={item.isActive}
                        onChange={async (e) => {
                            try {
                                e.target.disabled = true;
                                (e.target.nextElementSibling as HTMLLabelElement).style.cursor = 'wait';
                                await item.updateActivity(e.target.checked);
                                item.isActive = e.target.checked;
                            } catch (error) {
                                e.target.checked = !e.target.checked;
                                new BaseError({
                                    origin: 'components.List.listModules',
                                    message: 'Failed to update module activity.',
                                    callback(locale) {
                                        Notification.open({ ...locale.notifications.error.modules.updateModuleActivity, type: 'error' });
                                    },
                                })
                            } finally {
                                item.modal()?.close();
                                e.target.disabled = false;
                                setTimeout(() => props.forceUpdate(), SWITCH_ANIMATION_DELAY + 50);
                            }
                        }}
                    />
                </div>

            </ListItem>
        ))}
    </Fragment>
);

export default ListModules;