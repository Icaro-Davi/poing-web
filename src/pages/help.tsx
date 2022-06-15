import { NextPage } from "next";
import { Fragment } from "react";
import Card from "../components/Card";
import Grid from "../components/Grid";

const Help: NextPage = props => {
    return (
        <Fragment>
            <section>
                <Grid horizontalAlign="center">
                    <Grid.Row breakpoints={{ xl: 16, lg: 22, md: 20, sm: 24 }}>
                        <Card
                            type="four"
                            title="Precisa de ajuda?"
                            description="Você pode entrar no nosso discord oficial, ou nos contatar pelo email: “emailemail@email.com”."
                            imageSrc="/static/image/rimuru_question.png"
                        />
                    </Grid.Row>
                </Grid>
            </section>
        </Fragment>
    )
}

export default Help;