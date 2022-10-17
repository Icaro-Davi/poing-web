import ReactMarkdown from 'react-markdown';
import type { FC } from "react";

interface ReactMDProps {
    md: string;
}

const ReactMD: FC<ReactMDProps> = props => (
    <ReactMarkdown>{props.md}</ReactMarkdown>
);

export default ReactMD;