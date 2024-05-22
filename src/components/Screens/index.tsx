import { FC } from 'react';
import InviteBotBtn from '../../components/Buttons/InviteBot';
import Card from '../../components/Card';
import Grid from '../../components/Grid';
import { useApp } from '../../context/App';

export const cardsBreakpoints = { xl: 20, lg: 23, md: 20, sm: 24, xs: 24 };

const HomeScreen: FC = props => {
    const { locale: { pages: { root: { home: { botInfoCard, devBotCard, welcomeCard } } } } } = useApp();
    return (
        <Grid horizontalAlign="center">
            <Grid.Row
                verticalAlign='middle'
                breakpoints={cardsBreakpoints}
                style={{ minHeight: 'calc(100vh - 5rem)' }}
            >
                <Card
                    type="two"
                    title={welcomeCard.title}
                    description={welcomeCard.description}
                    imageSrc="/image/pouring.png"
                    imgAlt='Pouring'
                    imgW={390}
                    buttonsArea={<InviteBotBtn />}
                />
            </Grid.Row>
            <Grid.Row
                verticalAlign='middle'
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
                    imgW={370}
                />
            </Grid.Row>
            <Grid.Row
                verticalAlign='middle'
                breakpoints={cardsBreakpoints}
                style={{ minHeight: 'calc(100vh - 5rem)' }}
            >
                <Card
                    type="three"
                    title={devBotCard.title}
                    description={devBotCard.description}
                    imageSrc="/image/slime_king.png"
                    imgAlt='Pouring'
                    imgH={300}
                    imgW={250}
                />
            </Grid.Row>
        </Grid>
    );
}

export default HomeScreen;