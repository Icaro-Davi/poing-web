import { NextPage } from "next";
import { Fragment } from "react";
import { ButtonShining } from "../components/Buttons";
import Card from "../components/Card";
import Grid from "../components/Grid";
import { useApp } from "../context/App";

const cardsBreakpoints = { xl: 20, lg: 23, md: 20, sm: 24 }

const Help: NextPage = props => {
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
export default Help;