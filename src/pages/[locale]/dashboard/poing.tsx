import dynamic from "next/dynamic";
import DashboardGuildLayout from "../../../components/layout/DashboardGuild";
import handleGetLayout from "../../../components/layout/handleGetLayout";
import { NextPageWithLayout } from "../../../utils/general.types";
import { withPrivatePage } from "../../../utils/auth/authenticate";
import LoadScreen from "../../../components/Loading/LoadScreen";
import PageMiddleware from "../../../utils/auth/middleware";
import LocalePageMiddleware from "../../../utils/auth/middleware/locale.middleware";

const PoingScreen = dynamic(
    async () => import('../../../components/Screens/dashboard/poing'),
    { loading: LoadScreen }
)

const PoingPage: NextPageWithLayout = props => <PoingScreen {...props} />

PoingPage.getLayout = handleGetLayout(DashboardGuildLayout);
export const getServerSideProps = withPrivatePage(PageMiddleware([
    LocalePageMiddleware(locale => ({ pageHead: locale.pages.dashboard.poing.head }))
]));

export default PoingPage;