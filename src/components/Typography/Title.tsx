import { ReactNode } from 'react';
import { StyledTitleOne, StyledTitleTwo } from './styled';
import { StrokeTextType, StyledTitlePropsType } from './styled.types';

interface ITitle extends Omit<StyledTitlePropsType, 'stroke'> {
    children: ReactNode;
    level?: '1' | '2';
    stroke: StrokeTextType | boolean;
}

const Title: React.FC<ITitle> = ({ level, children, stroke, ...props }) => {
    const Title = (() => {
        switch (level) {
            case '1':
                return StyledTitleOne;
            case '2':
                return StyledTitleTwo;
            default:
                return StyledTitleOne;
        }
    })();

    return (
        <Title
            {...props}
            stroke={typeof stroke === 'object' ? stroke : 'true'}
        >
            {children}
        </Title>
    );
}

export default Title;