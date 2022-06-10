import Row from "./Row";
import { StyledGridContainer } from "./styled";

type GridType = typeof StyledGridContainer & {
    Row: typeof Row;
}

const Grid = StyledGridContainer as GridType;
Grid.Row = Row;

export default Grid;