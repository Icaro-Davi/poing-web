import ReactMarkdown from 'react-markdown';
import { useApp } from '../../../context/App';
import { Locale } from '../../../locale/index.type';
import { PickInside } from '../../../utils/general.types';
import { Title } from "../../Typography";
import { StyledModalCommandCardSection } from "./styled";

function transformToMarkdown(array: string[] | string) {
    let md: string = '';
    if (Array.isArray(array)) switch (array.length) {
        case 2:
            md = `**\`\`${array[0]}\`\`** - ${array[1]}`;
            break;
        case 3:
            md = `${array[0]} **\`\`${array[1]}\`\`** - ${array[2]}`;
            break;
    } else
        md = array;
    return `${md}\n\n`;
}

const Section: React.FC<PickInside<Locale, 'commands'>> = ({ aliases, usage, description, args, examples }) => {
    const { locale: { layouts: { commandCard } } } = useApp();
    const MD =
        `
        \n ### ${commandCard.description}
        \n ${description}
        \n &nbsp;
        \n ### ${commandCard.howToUse}
        \n ${usage.length ? `${usage.join('\n\n')}` : ''}
        ${aliases?.length ? `\n &nbsp;\n ### ${commandCard.aliases}\n ${aliases?.map(alias => `**\`\`\`${alias}\`\`\`** `).join(' ')}` : ''}
        ${args?.length ? `\n &nbsp;\n ### ${commandCard.arguments}\n ${args.map(transformToMarkdown).join('')}` : ''}
        \n &nbsp;
        \n ### ${commandCard.examples}
        \n ${examples.map(transformToMarkdown).join(' ')}
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