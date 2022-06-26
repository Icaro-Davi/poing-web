import { StyledModalCommandCardFooter } from "./styled";

interface IFooter {
    categoryName: string;
}

const Footer: React.FC<IFooter> = props => (
    <StyledModalCommandCardFooter>
        <p style={{ margin: 0 }}>Categoria - Admin</p>
    </StyledModalCommandCardFooter>
);

export default Footer;