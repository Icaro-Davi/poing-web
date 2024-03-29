import { forwardRef, ReactNode } from 'react';
import { StyledTitleFour, StyledTitleOne, StyledTitleThree, StyledTitleTwo } from './styled';
import { StrokeTextType, StyledTitlePropsType } from './styled.types';

interface ITitle extends React.HTMLAttributes<HTMLHeadingElement>, Omit<StyledTitlePropsType, 'stroke' | 'bold'> {
    children: ReactNode;
    level?: '1' | '2' | '3' | '4';
    stroke?: StrokeTextType | boolean;
    bold?: boolean;
}

const Title = forwardRef<HTMLHeadingElement, ITitle>(
    ({ level, children, stroke, ...props }, ref) => {
        const Title = (() => {
            switch (level) {
                case '1':
                    return StyledTitleOne;
                case '2':
                    return StyledTitleTwo;
                case '3':
                    return StyledTitleThree;
                case '4':
                    return StyledTitleFour;
                default:
                    return StyledTitleOne;
            }
        })();

        return (
            <Title
                {...props}
                ref={ref}
                bold={Number(!!props.bold)}
                stroke={
                    typeof stroke === 'object'
                        ? stroke
                        : typeof stroke === 'boolean' ? Number(stroke) : 1
                }
            >
                {children}
            </Title>
        );
    }
);

Title.displayName = 'Title';

export default Title;