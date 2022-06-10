import { css } from "styled-components";

export type breakpoints = 'sm' | 'md' | 'lg' | 'xl';

type MediaQuery = {
    label: breakpoints;
    width: number;
}

export const mediaQuery: MediaQuery[] = [
    { label: 'sm', width: 576 },
    { label: 'md', width: 768 },
    { label: 'lg', width: 992 },
    { label: 'xl', width: 1200 },
]

export const GridMediaQuery = css`
    ${props => {
        return mediaQuery.map((mq, i) => {
            return css`
                ${`@media (min-width: ${mq.width}px)`} {
                    ${new Array(24).fill(0).reduce((prev, current, i) => prev + ` .${mq.label}-col-${i + 1}{ flex: 0 0 ${((i + 1) / 24) * 100}%; max-width: ${((i + 1) / 24) * 100}%; }`, '')}
                }}
            `
        });
    }}
`;