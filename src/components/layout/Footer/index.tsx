import { memo, FC } from "react";
import { AiFillHeart } from 'react-icons/ai';
import { Paragraph, Title } from "../../Typography";
import { StyledFooterContainer } from "./styled";
import findStringVarsAndSubstitute from "../../../utils/findStringVarsAndSubstitute";
import { useApp } from "../../../context/App";

import type { ReactNode } from "react";

const FONT_SIZE = '1rem';

const CustomParagraph = (props: { children?: ReactNode }) =>
    <Paragraph stroke style={{ fontSize: FONT_SIZE }}>{props.children}</Paragraph>;

const HeartIcon = () => <AiFillHeart color="#fd4545" size={32} />;

const Footer: FC = props => {
    const { locale: { layouts: { public: { footer } } } } = useApp();
    return (
        <StyledFooterContainer>
            {findStringVarsAndSubstitute(footer.createdWith, {
                default: CustomParagraph,
                "%love%": HeartIcon
            })}
            <Title
                stroke
                level='4'
                style={{ cursor: 'pointer' }}
                onClick={() => window.open('https://github.com/icaro-davi', '_blank')}
            >
                {footer.createdBy}
            </Title>
        </StyledFooterContainer>
    );
}

export default memo(Footer);
