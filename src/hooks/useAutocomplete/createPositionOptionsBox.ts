import { UseAutocompleteProps } from "./autocomplete.types";

const createPositionOptionsBox = (props: UseAutocompleteProps) => (autocompleteNode: HTMLElement, coords: { top: number; left: number; lineHeight: number; }) => {
    const calculeTop = () => {
        let positionTop = (coords.top + coords.lineHeight) - autocompleteNode.scrollTop;
        let limitOfTop = autocompleteNode.clientHeight;
        let top = (
            (positionTop) < limitOfTop
                ? positionTop
                : limitOfTop
        );
        if (props.placeInTop) {
            let currentLine = (top / coords.lineHeight) - 1;
            return -(props.optionsBoxReference.current?.offsetHeight || 0) + (currentLine * coords.lineHeight)
        } else return top;
    }
    const calculeLeft = () => {
        let limitOfLeft = autocompleteNode.clientWidth - ((props.optionsBoxReference.current?.offsetWidth ?? 0) + (props?.rightLimit ?? 0));
        if (coords.left < limitOfLeft) {
            return coords.left;
        } else {
            let left = coords.left - (props.optionsBoxReference.current?.clientWidth ?? 0);
            if (left < 0) {
                return 0;
            } else {
                return left;
            }
        }
    }
    return {
        top: calculeTop() + (props.offsetY ?? 0),
        left: calculeLeft() + (props.offsetX ?? 0),
    }
};

export default createPositionOptionsBox;