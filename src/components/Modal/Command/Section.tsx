import ReactMarkdown from 'react-markdown';
import { Locale } from '../../../locale/index.type';
import { PickInside } from '../../../utils/general.types';
import { Title } from "../../Typography";
import { StyledModalCommandCardSection } from "./styled";

const Section: React.FC<PickInside<Locale, 'commands'>> = ({ aliases, usage, description, args, examples }) => {
    const MD =
        `
        \n ### Descrição
        \n ${description}
        \n &nbsp;
        \n ### Como usar
        \n ${usage.length ? `${usage.join('\n\n')}` : ''}
        ${aliases?.length ? `\n &nbsp;\n ###  Comando Abreviado\n ${aliases?.map(alias => `**\`\`\`${alias}\`\`\`** `).join(' ')}` : ''}
        ${args?.length ? `\n &nbsp;\n ### Argumentos\n ${args.join('\n\n')}` : ''}
        \n &nbsp;
        \n ### Exemplos
        \n ${examples.join('\n\n')}
    `;
    return (
        <StyledModalCommandCardSection>
            <ReactMarkdown
                components={{
                    code: ({ node, inline, ...props }) => <code style={{ backgroundColor: '#EEEEEE', padding: '.2rem' }} >{props.children}</code>,
                    h3: ({ node, ...props }) => <Title stroke={{ strokeColor: '#000' }} level='4' >{props.children}</Title>,
                }}
            >{MD}</ReactMarkdown>
        </StyledModalCommandCardSection>
    );
}

export default Section;