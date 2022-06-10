import { NextPage } from "next";
import { Fragment } from "react";
import Card from "../components/Card";
import Grid from "../components/Grid";
import { Paragraph, Title } from "../components/Typography";

const Help: NextPage = props => {
    return (
        <Fragment>
            <section>
                <Grid horizontalAlign="center">
                    <Grid.Row breakpoints={{ lg: 22, md: 20, sm: 24 }}>
                        <Card type="two">
                            <Title level="1" stroke={{ strokeSize: 1.5, shadowBlur: 5, shadowX: 5, shadowY: 5 }}>
                                Aprenda as minhas magias
                            </Title>
                            <Paragraph stroke>
                                Você pode entrar no nosso discord oficial, ou nos contatar pelo email: “emailemail@email.com”.
                            </Paragraph>
                        </Card>
                    </Grid.Row>
                </Grid>
            </section>
        </Fragment>
    )
}

export default Help;