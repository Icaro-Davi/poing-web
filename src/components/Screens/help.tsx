import { Fragment, FC } from "react";
import { cardsBreakpoints } from "../Screens";
import { ButtonShining } from "../../components/Buttons";
import Card from "../../components/Card";
import Grid from "../../components/Grid";
import { useApp } from "../../context/App";

const HelpScreen: FC = props => {
    const { locale: { pages: { root: { help: { helpCard } } } } } = useApp();
    return (
        <Grid horizontalAlign="center">
            <Grid.Row
                verticalAlign="middle"
                breakpoints={cardsBreakpoints}
                style={{ minHeight: 'calc(100vh - 10rem)' }}
            >
                <Card
                    type="four"
                    title={helpCard.title}
                    description={helpCard.description}
                    imageSrc="/image/rimuru_question.png"
                    imgAlt='Slime Rimuru Tempest'
                    imgH={360}
                    imgW={200}
                    buttonsArea={
                        <Fragment>
                            <ButtonShining
                                onClick={() => window.open('https://discord.gg/Kbhe8Q8yVR', '_self')}
                                style={{ marginTop: '0.5rem' }}
                            >
                                {helpCard.discordButton}
                            </ButtonShining>
                        </Fragment>
                    }
                />
            </Grid.Row>
        </Grid>
    );
}

export default HelpScreen;