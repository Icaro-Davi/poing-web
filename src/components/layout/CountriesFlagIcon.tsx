import { FC, CSSProperties } from 'react';
import styled from 'styled-components';
import { LocaleLang } from '../../locale/index.type';

const IconContainer = styled.i<{ x: number; y: number }>`
    :before {
        content: '';
        background: url('/image/flags.png') no-repeat;
        display: inline-block;
        width: 16px;
        height: 11px;
        ${props => `background-position: ${props.x}px ${props.y}px;`}
    }
`;

// Reference coordinates https://mdbootstrap.com/docs/standard/content-styles/flags/
const coordinates: Record<LocaleLang, { x: number; y: number; }> = {
    'en-US': { x: -72, y: -1950 },
    'pt-BR': { x: 0, y: -728 }
}

type CountriesFlagIconProps = {
    lang: LocaleLang;
    style?: CSSProperties
}

const CountriesFlagIcon: FC<CountriesFlagIconProps> = props => {
    const coords = coordinates[props.lang];
    return (<IconContainer {...coords} style={props.style} />)
}

export default CountriesFlagIcon;