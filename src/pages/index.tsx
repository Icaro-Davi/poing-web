import type { NextPage } from 'next'
import { Fragment } from 'react';
import { ButtonShining } from '../components/Buttons';
import Card from '../components/Card';
import Grid from '../components/Grid';
import { useApp } from '../context/App';

const cardsBreakpoints = { xl: 20, lg: 23, md: 20, sm: 24 }

const Home: NextPage = () => {
  const { locale: { pages: { home: { botInfoCard, devBotCard, welcomeCard } } } } = useApp();
  return (
    <Grid horizontalAlign="center">
      <Grid.Row
        verticalAlign='center'
        breakpoints={cardsBreakpoints}
        style={{ height: 'calc(100vh - 5rem)' }}
      >
        <Card
          type="two"
          title={welcomeCard.title}
          description={welcomeCard.description}
          imageSrc="/image/pouring.png"
          imgAlt='Pouring'
          style={{ marginBottom: '5rem' }}
          imgW={390}
          buttonsArea={
            <Fragment>
              <ButtonShining style={{ position: 'relative', marginTop: '0.5rem', marginBottom: '1rem' }}>{welcomeCard.buttonBotInvitation}</ButtonShining>
            </Fragment>
          }
        />
      </Grid.Row>
      <Grid.Row
        verticalAlign='center'
        breakpoints={cardsBreakpoints}
        style={{ height: 'calc(100vh - 5rem)' }}
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
        style={{ height: 'calc(100vh - 5rem)' }}
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

export default Home;
