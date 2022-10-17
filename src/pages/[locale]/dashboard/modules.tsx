import dynamic from 'next/dynamic';
import handleGetLayout from "../../../components/layout/handleGetLayout";
import DashboardGuildLayout from '../../../components/layout/DashboardGuild';
import { withPrivatePage } from "../../../utils/auth/authenticate";

const ModulesScreen = dynamic(
    async () => import('../../../components/Screens/modules'),
    { loading: () => <div style={{ color: 'white' }}>Loading...</div> }
);

import type { NextPageWithLayout } from "../../../utils/general.types";

const ModulesPage: NextPageWithLayout = props => <ModulesScreen />

ModulesPage.getLayout = handleGetLayout(DashboardGuildLayout);
export const getServerSideProps = withPrivatePage();

export default ModulesPage;