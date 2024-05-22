import { FC } from "react";
import PoingSettingsForm from "../../../components/Form/PoingSettings";
import Grid from "../../../components/Grid";

const PoingScreen: FC = props => (
    <Grid verticalAlign="middle" horizontalAlign="center" style={{ width: '100%', height: '100%' }}>
        <Grid.Row horizontalAlign="center" breakpoints={{ xs: 24 }}>
            <PoingSettingsForm />
        </Grid.Row>
    </Grid>
);


export default PoingScreen;