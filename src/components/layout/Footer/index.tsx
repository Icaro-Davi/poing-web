import { memo } from "react";
import { AiFillHeart } from 'react-icons/ai';
import { Paragraph, Title } from "../../Typography";
import { StyledFooterContainer } from "./styled";
import findStringVarsAndSubstitute from "../../../utils/findStringVarsAndSubstitute";

import type { ReactNode } from "react";

const FONT_SIZE = '1rem';

interface IProps {
    createdWith: string;
    createdBy: string;
}

const CustomParagraph = (props: { children?: ReactNode }) =>
    <Paragraph stroke style={{ fontSize: FONT_SIZE }}>{props.children}</Paragraph>;

const HeartIcon = () => <AiFillHeart color="#fd4545" size={32} />;

const Footer: React.FC<IProps> = props => (
    <StyledFooterContainer>
        {findStringVarsAndSubstitute(props.createdWith, {
            default: CustomParagraph,
            "%love%": HeartIcon
        })}
        <Title stroke level='4'>{props.createdBy}</Title>
    </StyledFooterContainer>
);

export default memo(Footer);
