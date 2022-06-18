import Link, { LinkProps } from "next/link";
import { Anchor } from "./styled";

interface IStyledLink extends LinkProps {
    label?: string;
    selected?: boolean;
}

const StyledLink: React.FC<IStyledLink> = props => (
    <Link {...props} passHref>
        <Anchor selected={props.selected}>{props.label}</Anchor>
    </Link>
);

export default StyledLink;