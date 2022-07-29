import styled from "styled-components";

export const Divider = styled.span<{ width?: string, color?: string, size?: string }>`
    display: block;
    margin: .5em auto .5em auto;
    width: ${props => props.width || '80%'};
    height: ${props => props.size || '2px'};
    border: 1px dashed ${props => props.color || props.theme.colors.gray}66;
`;