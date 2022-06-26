import { ReactNode } from 'react';
import { StyledParagraph } from './styled';
import { StrokeTextType } from './styled.types';

interface IParagraph extends React.HTMLAttributes<HTMLParagraphElement> {
    stroke?: StrokeTextType | boolean;
    children: ReactNode;
}

const Paragraph: React.FC<IParagraph> = ({ stroke, children, ...props }) => {
    return (
        <StyledParagraph {...props} stroke={typeof stroke === 'boolean' ? Number(stroke) : stroke}>
            {children}
        </StyledParagraph>
    );
}

export default Paragraph;