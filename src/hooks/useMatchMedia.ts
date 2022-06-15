import { useEffect, useReducer, useRef } from "react";
import { breakpoints, mediaQuery } from "../styles/mediaQuery";

export type BreakpointsMatch = Record<breakpoints, boolean>;

const getMediaQueriesMatch = (): BreakpointsMatch => mediaQuery.reduce(
    (prev, current) => ({ ...prev, [current.label]: window?.matchMedia(current.width).matches }), {} as BreakpointsMatch
);

const useMatchMedia = () => {
    const breakpoints = useRef<BreakpointsMatch>({} as BreakpointsMatch);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        mediaQuery.forEach((mq, i) => {
            const mql = window?.matchMedia(mq.width);
            mql.addEventListener('change', ({ matches }) => {
                breakpoints.current = { ...breakpoints.current, [mq.label]: matches };
                forceUpdate();
            });
        });
        breakpoints.current = getMediaQueriesMatch();
        forceUpdate();
    }, []);

    return breakpoints.current;
}

export default useMatchMedia;