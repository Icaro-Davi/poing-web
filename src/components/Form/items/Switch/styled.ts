import styled, { css } from "styled-components";

interface ISwitchContainerProps {
    size?: number,
    bgActive?: string;
    bgInactive?: string;
    active: boolean;
}

export const SWITCH_ANIMATION_DELAY = 200;

const SwitchContainer = styled.div<ISwitchContainerProps>`
    user-select: none;
    display: flex;
    ${props => {
        const SWITCH_SIZE = props.size ?? 45;
        const CIRCLE_SIZE = SWITCH_SIZE * .5;
        const ACTIVE = props.bgActive ?? props.theme.colors.black;
        const INACTIVE = props.bgInactive ?? props.theme.colors.gray;
        const BORDER = Math.round(SWITCH_SIZE * .06);

        return css`
            input[type='checkbox'] {
                visibility: hidden;
                width: 0; height: 0;
            }

            label {
                box-sizing: content-box;
                position: relative;
                width: ${SWITCH_SIZE}px;
                height: ${SWITCH_SIZE * .5}px;
                border-radius: 9999px;
                display: inline-block;
                padding: ${BORDER}px;
                background-color: ${INACTIVE};
                cursor: pointer;
                transition: background-color ${SWITCH_ANIMATION_DELAY}ms;
            }

            input:checked + label {
                background-color: ${ACTIVE};
            }

            label:after {
                content: '';
                position: absolute;
                z-index: 3;
                border-radius: 100%;
                left: ${BORDER}px;
                width: ${CIRCLE_SIZE}px;
                height: ${CIRCLE_SIZE}px;
                background-color: #fff;
                transition: 0.4s cubic-bezier(0.18, 0.89, 0.35, 1.15) left;
            }

            input:checked + label:after {
                left: calc(100% - ${CIRCLE_SIZE + BORDER}px);
            }
        `;
    }}
`;

export default SwitchContainer;