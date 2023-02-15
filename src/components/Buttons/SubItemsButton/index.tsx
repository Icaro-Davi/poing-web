import { FC, ReactNode } from 'react';
import { SubItemsButtonContainer } from './styled';

type SubItemsButton = {
    label: string | ReactNode;
    renderItems: ReactNode;
}

const SubItemsButton: FC<SubItemsButton> = (props) => (
    <SubItemsButtonContainer>
        <div className='label'>
            {props.label}
        </div>
        <div className='sub-items'>
            {props.renderItems}
        </div>
    </SubItemsButtonContainer>
);

export default SubItemsButton;