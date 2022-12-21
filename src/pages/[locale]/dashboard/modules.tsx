import dynamic from 'next/dynamic';
import handleGetLayout from "../../../components/layout/handleGetLayout";
import DashboardGuildLayout from '../../../components/layout/DashboardGuild';
import { withPrivatePage } from "../../../utils/auth/authenticate";
import LoadScreen from '../../../components/Loading/LoadScreen';
import PageMiddleware from '../../../utils/auth/middleware';
import LocalePageMiddleware from '../../../utils/auth/middleware/locale.middleware';
import type { NextPageWithLayout } from "../../../utils/general.types";

const ModulesScreen = dynamic(
    async () => import('../../../components/Screens/dashboard/modules'),
    { loading: LoadScreen }
);

const ModulesPage: NextPageWithLayout = props => <ModulesScreen {...props} />

ModulesPage.getLayout = handleGetLayout(DashboardGuildLayout);
export const getServerSideProps = withPrivatePage(PageMiddleware([
    LocalePageMiddleware(locale => ({ pageHead: locale.pages.dashboard.modules.welcomeMember.head })),
]));

export default ModulesPage;