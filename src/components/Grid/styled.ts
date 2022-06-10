import styled from "styled-components";

export const StyledGridContainer = styled.div<{ horizontalAlign?: 'center' | 'left' | 'right' }>`
    display: flex;
    flex-wrap: wrap;
    ${props => {
        switch (props.horizontalAlign) {
            case 'center':
                return 'justify-content: center;'
            case 'left':
                return 'justify-content: flex-start;'
            case 'right':
                return 'justify-content: flex-end;'
        }
    }}
`;

export const StyledGridRow = styled.div``;