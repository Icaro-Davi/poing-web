import type { FC } from "react";
import { Button } from "../../Buttons";
import Grid from "../../Grid";

const SubmitButton: FC = () => (
    <Grid style={{ marginTop: '1em' }}>
        <Grid.Row breakpoints={{ xs: 12, md: 16 }} />
        <Grid.Row breakpoints={{ xs: 12, md: 8 }}>
            <Button type="submit">Enviar</Button>
        </Grid.Row>
    </Grid>
);

export default SubmitButton;