import { FC, Fragment, useState } from "react";
import ScrollArea from "../../ScrollArea";
import { Title } from "../../Typography";
import { ListContainer } from "../styled";
import { ModuleItem } from "./List";
import Modules from './List';

interface IListModulesProps {
    items: ModuleItem[];
    locale: {
        label: {
            active: string;
            inactive: string;
        };
    }
}

const orderAlphabetically = (a: ModuleItem, b: ModuleItem) => {
    if (a.name > b.name) return -1;
    if (b.name < b.name) return 1;
    return 0;
}

const ListModules: FC<IListModulesProps> = props => {
    const [_, forceUpdate] = useState(false);
    const modules = props.items.reduce((prev, current) => {
        current.isActive ? prev.active.push(current) : prev.inactive.push(current);
        return prev;
    }, { active: [], inactive: [] } as { active: ModuleItem[]; inactive: ModuleItem[] });
    return (
        <ScrollArea>
            <ListContainer>
                {!!modules.active.length && (
                    <Fragment>
                        <Title level='2' stroke={{ strokeColor: '#000' }}>{props.locale.label.active}</Title>
                        <Modules modules={modules.active.sort(orderAlphabetically)} forceUpdate={() => forceUpdate(update => !update)} />
                    </Fragment>
                )}
                {!!modules.inactive.length && (
                    <Fragment>
                        <Title level='2' stroke={{ strokeColor: '#000' }}>{props.locale.label.inactive}</Title>
                        <Modules modules={modules.inactive.sort(orderAlphabetically)} forceUpdate={() => forceUpdate(update => !update)} />
                    </Fragment>
                )}
            </ListContainer>
        </ScrollArea>
    )
};

export default ListModules;

