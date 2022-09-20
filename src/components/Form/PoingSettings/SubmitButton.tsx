import type { FC } from "react";
import { Button } from "../../Buttons";
import Grid from "../../Grid";

interface IProps {
    isLoading: boolean;
    label: string;
}

const SubmitButton: FC<IProps> = props => (
    <Grid style={{ marginTop: '1em' }}>
        <Grid.Row breakpoints={{ xs: 12, md: 16 }} />
        <Grid.Row breakpoints={{ xs: 12, md: 8 }}>
            <Button disabled={props.isLoading} type="submit">{props.label}</Button>
        </Grid.Row>
    </Grid>
);

export default SubmitButton;