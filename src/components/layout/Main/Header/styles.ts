import styled from "styled-components";

export const Header = styled.header`
    width: 100%;
    height: 70px;
    display: flex;
    flex-flow: column;
    justify-content: center;
`;

export const MenuContainer = styled.ul`
    display: flex;
    justify-content: center;
    list-style-type: none;
`;

export const MenuItem = styled.li`
    margin-left: 8px;
`;

export const Anchor = styled.a`
    min-width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.white};
    font-size: 18px;
    text-shadow:
    -1px -1px 0 ${props => props.theme.colors.secondary},
    1px -1px 0 ${props => props.theme.colors.secondary},
    -1px 1px 0 ${props => props.theme.colors.secondary},
    1px 1px 0 ${props => props.theme.colors.secondary};

    &:hover {
        color: ${props => props.theme.colors.secondary};
        text-shadow:
        -1px -1px 0 ${props => props.theme.colors.white},
        1px -1px 0 ${props => props.theme.colors.white},
        -1px 1px 0 ${props => props.theme.colors.white},
        1px 1px 0 ${props => props.theme.colors.white},
        0 2px 5px ${props => props.theme.colors.black};
    }
`;
