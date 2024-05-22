import dynamic from 'next/dynamic';
import handleGetLayout from "../../components/layout/handleGetLayout";
import PublicLayout from "../../components/layout/Public";
import { withPublicPage } from "../../utils/auth/authenticate";
import { NextPageWithLayout } from "../../utils/general.types";
import LoadScreen from '../../components/Loading/LoadScreen';
import PageMiddleware from '../../utils/auth/middleware';
import LocalePageMiddleware from '../../utils/auth/middleware/locale.middleware';

const HelpScreen = dynamic(
    async () => import('../../components/Screens/help'),
    { loading: LoadScreen }
)

const HelpPage: NextPageWithLayout = props => <HelpScreen {...props} />;

HelpPage.getLayout = handleGetLayout(PublicLayout);
export const getServerSideProps = withPublicPage(PageMiddleware([
    LocalePageMiddleware(locale => ({ pageHead: locale.pages.root.help.head }))
]));

export default HelpPage;