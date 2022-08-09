import DashboardGuildLayout from "../../components/layout/DashboardGuild";
import handleGetLayout from "../../components/layout/handleGetLayout";
import { NextPageWithLayout } from "../../utils/general.types";
import PoingSettingsForm from "../../components/Form/PoingSettings";

const PoingPage: NextPageWithLayout = props => {

    return (
        <PoingSettingsForm />
    );
}

PoingPage.getLayout = handleGetLayout(DashboardGuildLayout);

export default PoingPage;