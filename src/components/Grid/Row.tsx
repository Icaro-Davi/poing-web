import React, { ReactNode, useEffect, useState } from "react"
import { breakpoints } from "../../styles/mediaQuery";
import { StyledGridRow } from "./styled"

interface IRow {
    children?: ReactNode;
    breakpoints?: { [Keys in breakpoints]?: number };
}

const Row: React.FC<IRow> = props => {
    const [breakpointsClassNames, setBreakpoints] = useState('');

    useEffect(() => {
        let breakpointStr = '';
        props.breakpoints && Object.keys(props.breakpoints).forEach((bp) => {
            switch (bp as breakpoints) {
                case 'lg':
                    breakpointStr += `lg-col-${props.breakpoints?.lg} `;
                    break;
                case 'md':
                    breakpointStr += `md-col-${props.breakpoints?.md} `;
                    break;
                case 'sm':
                    breakpointStr += `sm-col-${props.breakpoints?.sm} `;
                    break;
                case 'xl':
                    breakpointStr += `xl-col-${props.breakpoints?.xl} `;
                    break;
            }
        });
        setBreakpoints(breakpointStr);
    }, [props.breakpoints]);

    return (
        <StyledGridRow className={breakpointsClassNames}>
            {props.children}
        </StyledGridRow>
    )
}

export default Row;