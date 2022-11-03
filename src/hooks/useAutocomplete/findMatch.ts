import { MatchRef, RegexReference, UseAutocompleteProps } from "./autocomplete.types";

const findMatch = (options: { text: string; triggers: RegexReference[]; currentIndex: number, props: UseAutocompleteProps }): MatchRef | undefined => {
    const match = options.text.match(options.triggers[options.currentIndex].trigger);
    if (match) {
        return {
            ...options.triggers[options.currentIndex],
            match: match[0],
            matchedTextAt: '', restOfText: '', selectionIndex: 0,
            list: options.props.filter
                ? options.props.filter(options.triggers[options.currentIndex].list, match[0])
                : options.triggers[options.currentIndex].list.filter(listItem => listItem.startsWith(match[0]))
        };
    } else {
        if (options.triggers[options.currentIndex + 1])
            return findMatch({ ...options, currentIndex: options.currentIndex + 1 });
        else
            return undefined;
    }
}

export default findMatch;