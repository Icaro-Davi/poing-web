import { cardsBreakpoints } from "../../../pages/[locale]";
import Grid from "../../Grid";
import { ModalWrapper } from "../styled";
import type { ModalComponentWrapper } from "../../../hooks/useModal/modal.types";
import { ModuleCard, ModuleCardFooter, ModuleCardHeader, ModuleCardSection } from "./styled";
import ScrollArea from "../../ScrollArea";

const WelcomeMemberModule: ModalComponentWrapper = props => {
    return (
        <ModalWrapper onClick={props.modal.close}>
            <Grid horizontalAlign="center" >
                <Grid.Row breakpoints={cardsBreakpoints}>
                    <ModuleCard>
                        <ModuleCardHeader>
                            <div style={{ display: 'inline-block', width: 50, height: 50, backgroundColor: `#${Math.random().toString(16).slice(2, 8)}` }} />
                        </ModuleCardHeader>
                        <ScrollArea>
                            <ModuleCardSection>
                                {new Array(50).fill(0).map((_, i) => (
                                    <span key={`test-${i}`} style={{ display: 'block', width: 50, height: 50, backgroundColor: `#${Math.random().toString(16).slice(2, 8)}` }} />
                                ))}
                            </ModuleCardSection>
                        </ScrollArea>
                        <ModuleCardFooter>
                            <div style={{ display: 'inline-block', width: 50, height: 50, backgroundColor: `#${Math.random().toString(16).slice(2, 8)}` }} />
                        </ModuleCardFooter>
                    </ModuleCard>
                </Grid.Row>
            </Grid>
        </ModalWrapper>
    )
}

export default WelcomeMemberModule;