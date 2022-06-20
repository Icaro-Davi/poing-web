import { Paragraph, Title } from "../../Typography";
import { StyledFooterContainer } from "./styled";
import { AiFillHeart } from 'react-icons/ai';

const FONT_SIZE = '1rem';

const Footer: React.FC = props => (
    <StyledFooterContainer>
        <Paragraph stroke style={{ fontSize: FONT_SIZE }}>Criado com</Paragraph>
        <AiFillHeart color="#fd4545" size={32} />
        <Paragraph stroke style={{ fontSize: FONT_SIZE }}>por</Paragraph><Title stroke level='4'>Icaro Davi</Title>
    </StyledFooterContainer>
);

export default Footer;
