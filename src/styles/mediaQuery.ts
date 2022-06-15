import { css } from "styled-components";

export type breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type MediaQuery = {
    label: breakpoints;
    width: string;
}

export const mediaQuery: MediaQuery[] = [
    { label: 'xs', width: '(max-width: 575px)' },
    { label: 'sm', width: '(min-width: 576px)' },
    { label: 'md', width: '(min-width: 768px)' },
    { label: 'lg', width: '(min-width: 992px)' },
    { label: 'xl', width: '(min-width: 1200px)' },
]

const createMediaQueryRule = (mqLabel: string) =>
    `${new Array(24).fill(0).reduce(
        (prev, current, i) => prev + ` .${mqLabel}-col-${i + 1}{ flex: 0 0 ${((i + 1) / 24) * 100}%; max-width: ${((i + 1) / 24) * 100}%; }`, '')
    }`;

export const GridMediaQuery = css`
    ${props => {
        return mediaQuery.map((mq, i) => {
            if (mq.label === 'xs')
                return createMediaQueryRule(mq.label);
            return css`
                ${`@media ${mq.width}`} {
                    ${createMediaQueryRule(mq.label)}
                }}
            `;
        });
    }}
`;