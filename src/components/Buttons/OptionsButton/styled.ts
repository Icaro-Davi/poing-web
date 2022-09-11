import styled from "styled-components";

export const OptionsButtonContainer = styled.div`
    position: relative;

    button {
        position: relative;
        cursor: pointer;
        border: 2px solid ${props => props.theme.colors.secondary};
        border-radius: 5px;
        padding: .4rem;
        background-color: ${props => props.theme.colors.black};

        display: flex;
        align-items: center;
        column-gap: .3rem;

        span {
            color: ${props => props.theme.colors.white};
            font-size: 15px;
            font-weight: bold;
            min-width: 50px;
            max-width: 150px;
            display: block;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        div {
            background-color: #fff;
            overflow: hidden;
            position: relative;
            border-radius: 50%;

            width: 25px;
            height: 25px;
            div span {
                position: initial !important;
            }
        }
    }

    ul{
        display: none;
        position: absolute;
        width: 100%;
        transform: translateY(-2px);

        li {
            margin: 0 auto;
            width: 90%;

            list-style: none;
            background-color: ${props => props.theme.colors.black};
            color: ${props => props.theme.colors.white};

            display: flex;
            flex-flow: column;

            border-left: 2px solid ${props => props.theme.colors.secondary};
            border-right: 2px solid ${props => props.theme.colors.secondary};

            :not(:last-child)::after {
                content: '';
                width: 100%;
                background-color: #000000;
                height: 1px;
            }

            a {
                padding: .3rem;
                display: flex;
                align-items: center;
                column-gap: .3rem;
            }

            :hover {
                background-color: #000000;
            }
            :last-child:hover{
                background-color: ${props => props.theme.colors.error};
            }
        }

        li:last-child {
            border-bottom: 2px solid ${props => props.theme.colors.secondary};
        }

    }

    button:hover + ul, ul:hover {
        display: initial;
    }
`;