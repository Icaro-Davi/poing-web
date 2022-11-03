import { FC, LabelHTMLAttributes, ReactNode } from 'react';
import LabelForm from './styled';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children?: ReactNode;
}

const Label: FC<LabelProps> = ({ children, ...props }) => (
    <LabelForm {...props}>{children}</LabelForm>
);

export default Label;