import type { FC } from "react";
import { Button } from "../../Buttons";
import Grid from "../../Grid";

interface IProps {
    isLoading: boolean;
    label: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const SubmitButton: FC<IProps> = props => (
    <Grid style={{ marginTop: '1em', ...props.style }}>
        <Grid.Row breakpoints={{ xs: 12, md: 16 }} />
        <Grid.Row breakpoints={{ xs: 12, md: 8 }}>
            <Button onClick={props.onClick} disabled={props.isLoading} type="submit">{props.label}</Button>
        </Grid.Row>
    </Grid>
);

export default SubmitButton;