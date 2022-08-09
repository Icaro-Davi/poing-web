import styled from "styled-components";

export const ColorPalletWrapper = styled.div`
    position: relative;
    width: 100%;

    .rcp {
        position: absolute;
        z-index: 15;
        height: auto !important;
        left: 1rem;
        margin-top: .7rem;
        display: none;

        ::before{
            content: '';
            position: absolute;
            left: .7rem;
            bottom: 100%;
            width: 0; height: 0;
            border: .75rem solid transparent;
            border-top: none;
            border-bottom-color: #FFF;
        }
    }

    div:first-child:focus-within ~ .rcp, .rcp:hover{
        display: flex;
    }
`;