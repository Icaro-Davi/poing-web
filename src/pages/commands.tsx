import { NextPage } from "next";
import { cardsBreakpoints } from ".";
import Card from "../components/Card";
import Grid from "../components/Grid";
import Tag from "../components/Tag";

const Commands: NextPage = props => {
    return (
        <Grid horizontalAlign="center">
            <Grid.Row style={{ margin: '1rem 0' }} breakpoints={cardsBreakpoints}>
                <Card style={{ width: '100%' }}>
                    <Tag>Hello</Tag>
                </Card>
            </Grid.Row>
        </Grid>
    );
}

export default Commands;