import styled from "styled-components";

export const GUILD_CARD_HEIGHT = '50px';

export const GuildCardContainer = styled.div`
    width: 100%;
    height: ${GUILD_CARD_HEIGHT};
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const GuildNameContainer = styled.div<{ src: string, selected?: boolean }>`
    cursor: pointer;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    ::before{
        content: '';
        position: absolute;
        bottom: ${props => props.selected ? '100%' : 0};
        z-index: -1;
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    :hover::before{
        bottom: 100%;
    }
    ::after{
        content: '';
        position: absolute;
        z-index: -2;
        width: 100%;
        height: 100%;

        background-image: url(${props => props.src});
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(${props => props.selected ? '3px' : '10px'});
        transition: filter .5s;
    }
    :hover::after{
        filter: blur(5px);
    }
`;
