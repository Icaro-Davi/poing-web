import ReactMarkdown from 'react-markdown';
import { Title } from "../../Typography";
import { StyledModalCommandCardSection } from "./styled";

interface ICommandSectionModal {
    howToUseDescription: string;
    aliasesDescription: string;
    argumentDescription: string;
    exampleDescription: string;
}

const Section: React.FC<ICommandSectionModal> = ({ aliasesDescription, argumentDescription, exampleDescription, howToUseDescription }) => {
    const MD =
        `###  Comando Abreviado
        \n ${aliasesDescription}.
    `;
    return (
        <StyledModalCommandCardSection>
            <ReactMarkdown
                children={MD}
                components={{
                    code: ({ node, inline, ...props }) => <code style={{ backgroundColor: '#EEEEEE', padding: '.2rem' }} {...props} />,
                    h3: ({ node, ...props }) => <Title stroke={{ strokeColor: '#000' }} level='4' children={props.children} />,

                }}
            />
        </StyledModalCommandCardSection>
    );
}

export default Section;