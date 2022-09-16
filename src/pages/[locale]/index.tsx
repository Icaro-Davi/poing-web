import InviteBotBtn from '../../components/Buttons/InviteBot';
import Card from '../../components/Card';
import Grid from '../../components/Grid';
import handleGetLayout from '../../components/layout/handleGetLayout';
import PublicLayout from '../../components/layout/Public';
import { useApp } from '../../context/App';
import { withPublicPage } from '../../utils/auth/authenticate';
import { NextPageWithLayout } from '../../utils/general.types';

export const cardsBreakpoints = { xl: 20, lg: 23, md: 20, sm: 24, xs: 24 };

const HomePage: NextPageWithLayout = () => {
  const { locale: { pages: { home: { botInfoCard, devBotCard, welcomeCard } } } } = useApp();
  return (
    <Grid horizontalAlign="center">
      <Grid.Row
        verticalAlign='center'
        breakpoints={cardsBreakpoints}
        style={{ minHeight: 'calc(100vh - 5rem)' }}
      >
        <Card
          type="two"
          title={welcomeCard.title}
          description={welcomeCard.description}
          imageSrc="/image/pouring.png"
          imgAlt='Pouring'
          style={{ marginBottom: '5rem' }}
          imgW={390}
          buttonsArea={<InviteBotBtn />}
        />
      </Grid.Row>
      <Grid.Row
        verticalAlign='center'
        breakpoints={cardsBreakpoints}
        style={{ minHeight: 'calc(100vh - 5rem)' }}
      >
        <Card
          reverse
          type="four"
          title={botInfoCard.title}
          description={botInfoCard.description}
          imageSrc="/image/rimuru_waifu.png"
          imgAlt='Pouring'
          style={{ marginBottom: '5rem' }}
          imgW={370}
        />
      </Grid.Row>
      <Grid.Row
        verticalAlign='center'
        breakpoints={cardsBreakpoints}
        style={{ minHeight: 'calc(100vh - 5rem)' }}
      >
        <Card
          type="three"
          title={devBotCard.title}
          description={devBotCard.description}
          imageSrc="/image/slime_king.png"
          imgAlt='Pouring'
          style={{ marginBottom: '5rem' }}
          imgH={300}
          imgW={250}
        />
      </Grid.Row>
    </Grid>
  );
}

HomePage.getLayout = handleGetLayout(PublicLayout);

export const getServerSideProps = withPublicPage();

export default HomePage;
