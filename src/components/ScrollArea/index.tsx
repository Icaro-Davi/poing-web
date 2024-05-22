import type { FC, ReactNode, HTMLAttributes } from "react";
import styled from "styled-components";

const ScrollContainer = styled.div`
    overflow: auto;
    flex: 1;
    padding-right: 0.2rem;
`;

const ScrollArea: FC<{ children?: ReactNode } & HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
    <ScrollContainer {...props}>
        {children}
    </ScrollContainer>
);

export default ScrollArea;