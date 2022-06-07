import { Circle, LogoContainer, LogoName } from "./styled";

const Logo: React.FC = props => {
    return (
        <LogoContainer {...props}>
            <LogoName>Poing</LogoName>
            <Circle x={-3} y={-3} />
            <Circle size={55} x={5} y={5} />
            <Circle x={-7} y={25} />
            <Circle size={60} x={-1} y={40} />
        </LogoContainer>
    )
}

export default Logo;