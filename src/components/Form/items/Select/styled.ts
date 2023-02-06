import styled from "styled-components";
import { BORDER, INPUT_FORM, SPACING } from '../DefaultPropertyValues';

const ITEM_HEIGHT = 30;

const SelectContainer = styled.div<{ displayItemsCount: number; displayItemsTop?: boolean; }>`
    width: 100%;
    position: relative;

    div {
        position: relative;
        ::after {
            content: '';
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
            width: 6px;
            height: 6px;
            border-right: 2px solid #000;
            border-bottom:2px solid #000;
        }
    }

    :focus-within input, input {
        position: relative;
        width: 100%;
        height: ${INPUT_FORM.height};
        border-radius: ${BORDER.radius};
        border: none;
        text-transform: capitalize;
        font-weight: ${INPUT_FORM.weight};
        font-size: ${INPUT_FORM.font_size};
        font-family: ${INPUT_FORM.font_family};
        background-color: #FFF;
        text-align: left;
        padding: 0 ${SPACING.lg};
        outline: none;
        cursor: pointer;

        :hover {
            background-color: ${props => props.theme.colors.primary};
        }
    }

    :focus-within input {
        background-color: ${props => props.theme.colors.backgroundDarker};
        ${props => props.displayItemsTop ? (`
                border-top-left-radius: 0;
                border-top-right-radius: 0;
        `) : (`
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        `)}
    }

    :focus-within ul {
        display: block;
    }

    ul {
        position: absolute;
        z-index: 10;
        left: 0;
        ${props => props.displayItemsTop ? (`
            bottom: ${INPUT_FORM.height};
            border-top-left-radius: ${BORDER.radius};
            border-top-right-radius: ${BORDER.radius};
        `) : (`
            border-bottom-left-radius: ${BORDER.radius};
            border-bottom-right-radius: ${BORDER.radius};
        `)}
        width: 100%;
        height: fit-content;
        max-height: ${props => props.displayItemsCount * ITEM_HEIGHT}px;
        overflow: auto;
        background-color: #FFFFFF;
        padding-top: 0;
        /* overflow: hidden; */
        box-shadow: 1px 1px 5px #000000;
        display: none;

        li {
            font-family: ${INPUT_FORM.font_family};
            color: #000;
            text-transform: capitalize;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            height: ${ITEM_HEIGHT}px;
            padding: 0 1rem;
            line-height: 30px;
            list-style: none;
            cursor: pointer;

            :hover, :focus{
                box-shadow: inset 1px 1px 5px #000000;
                outline: none;
                background-color: ${props => props.theme.colors.primary};
            }
        }

    }
`;

export default SelectContainer;