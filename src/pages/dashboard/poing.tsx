import DashboardGuildLayout from "../../components/layout/DashboardGuild";
import handleGetLayout from "../../components/layout/handleGetLayout";
import { NextPageWithLayout } from "../../utils/general.types";

const PoingPage: NextPageWithLayout = props => {
    return (
        <div style={{ color: '#FFFFFF'}}>
            Hello World, Poing dashboard
        </div>
    )
}

PoingPage.getLayout = handleGetLayout(DashboardGuildLayout);

export default PoingPage;