import { FC, memo } from 'react';

interface IPropsOptionBoxItem {
    index: number;
    value: string;
    label: string;
    onClick: (text: string) => void;
}

const OptionBoxItem: FC<IPropsOptionBoxItem> = memo(
    (props) => (
        <div
            key={`item-key-${props.index}`}
            tabIndex={props.index}
            data-value={props.value}
            className='item'
            onClick={() => props.onClick(props.value)}
        >
            {props.label}
        </div>
    )
);

OptionBoxItem.displayName = 'OptionBoxItem';

export default OptionBoxItem;