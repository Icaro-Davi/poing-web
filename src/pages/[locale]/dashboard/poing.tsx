import DashboardGuildLayout from "../../../components/layout/DashboardGuild";
import handleGetLayout from "../../../components/layout/handleGetLayout";
import { NextPageWithLayout } from "../../../utils/general.types";
import PoingSettingsForm from "../../../components/Form/PoingSettings";
import Grid from "../../../components/Grid";
import { withPrivatePage } from "../../../utils/auth/authenticate";

const PoingPage: NextPageWithLayout = props => (
    <Grid verticalAlign="center" horizontalAlign="center" style={{ width: '100%', height: '100%' }}>
        <Grid.Row horizontalAlign="center" breakpoints={{ xs: 24 }}>
            <PoingSettingsForm />
        </Grid.Row>
    </Grid>
);

PoingPage.getLayout = handleGetLayout(DashboardGuildLayout);

export const getServerSideProps = withPrivatePage();

export default PoingPage;