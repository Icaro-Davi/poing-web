import dynamic from 'next/dynamic';
import handleGetLayout from '../../components/layout/handleGetLayout';
import PublicLayout from '../../components/layout/Public';
import { withPublicPage } from '../../utils/auth/authenticate';
import { NextPageWithLayout } from '../../utils/general.types';
import LoadScreen from '../../components/Loading/LoadScreen';

const HomeScreen = dynamic(
  async () => import('../../components/Screens'),
  { loading: LoadScreen }
);

const HomePage: NextPageWithLayout = props => <HomeScreen {...props} />

HomePage.getLayout = handleGetLayout(PublicLayout);
export const getServerSideProps = withPublicPage();

export default HomePage;
