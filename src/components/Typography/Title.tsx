import { forwardRef, ReactNode } from 'react';
import { StyledTitleOne, StyledTitleTwo } from './styled';
import { StrokeTextType, StyledTitlePropsType } from './styled.types';

interface ITitle extends Omit<StyledTitlePropsType, 'stroke'> {
    children: ReactNode;
    level?: '1' | '2';
    stroke: StrokeTextType | boolean;
}

const Title = forwardRef<HTMLDivElement, ITitle>(
    ({ level, children, stroke, ...props }, ref) => {
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
                ref={ref}
                stroke={typeof stroke === 'object' ? stroke : 'true'}
            >
                {children}
            </Title>
        );
    }
);

export default Title;