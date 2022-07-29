import { Fragment } from "react";
import { cardsBreakpoints } from ".";
import { ButtonShining } from "../components/Buttons";
import Card from "../components/Card";
import Grid from "../components/Grid";
import handleGetLayout from "../components/layout/handleGetLayout";
import PublicLayout from "../components/layout/Public";
import { useApp } from "../context/App";
import { NextPageWithLayout } from "../utils/general.types";

const HelpPage: NextPageWithLayout = props => {
    const {locale: { pages: {help: { helpCard }} }} = useApp();
    return (
        <Grid horizontalAlign="center">
            <Grid.Row
                verticalAlign="center"
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
                            <ButtonShining style={{ marginTop: '0.5rem' }}>{helpCard.discordButton}</ButtonShining>
                        </Fragment>
                    }
                />
            </Grid.Row>
        </Grid>
    );
}

HelpPage.getLayout = handleGetLayout(PublicLayout);

export default HelpPage;