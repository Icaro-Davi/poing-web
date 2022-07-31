import styled from "styled-components";

export const SideMenuContainer = styled.header`
    width: 250px;
    height: 100%;
    background: linear-gradient(0, ${props => props.theme.colors.backgroundDarker} -100%, ${props => props.theme.colors.black});
`;

export const Header = styled.div<{ imageSrc: string }>`
    cursor: pointer;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 140px;
    padding: .5em;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    ::before {
        content: '';
        position: absolute;
        top:0; left:0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background-image: url(${props => props.imageSrc});
        background-size: cover;
        background-position: center;
        filter: blur(3px);
        box-shadow: inset 0 0 45px #000;
        transform: scale(1.1);
        transition: transform .3s;
    }
    :hover::before {
        transform: scale(1.3);
    }
`;

export const GuildNameContainer = styled.div`
    margin-top: .5em;
    position: relative;
    z-index: 1;
    width: 95%;
    text-align: center;
    ::before{
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        z-index: -1;
        filter: blur(3px);
    }
`;

export const NavigationContainer = styled.nav<{ btnQuantityInArea: number }>`
    max-height: calc((.5em + 45px) * (${props => props.btnQuantityInArea || 6}) );
    overflow-y: auto;
`;

export const ButtonsArea = styled.div`
    display: flex;
    flex-flow: column;
    row-gap: .5em;
`;