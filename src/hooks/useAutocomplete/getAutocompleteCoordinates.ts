const defaultStyleKeys: (keyof typeof CSSStyleDeclaration.prototype)[] = [
    'direction',
    'boxSizing',
    'width',
    'height',
    'overflowX',
    'overflowY',

    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',

    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',

    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',

    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration',

    'letterSpacing',
    'wordSpacing',

    'tabSize',
]

type AutocompleteElement = HTMLInputElement | HTMLTextAreaElement;

const getAutocompleteCoordinates = (element: AutocompleteElement) => {
    let inputElementClone = document.createElement('div');
    let spanElement = document.createElement('span');
    let elementCopyStyle = getComputedStyle(element);
    let position = element.selectionStart ?? 0;

    if (element.nodeName === 'INPUT') {
        inputElementClone.style.display = 'flex';
        inputElementClone.style.alignItems = 'center';
    }

    inputElementClone.style.whiteSpace = 'pre-wrap';
    inputElementClone.style.wordBreak = 'break-word';
    inputElementClone.style.position = 'absolute';
    inputElementClone.style.top = '0';
    inputElementClone.style.left = '0';
    inputElementClone.style.zIndex = '-11';
    inputElementClone.style.visibility = 'hidden';

    defaultStyleKeys.forEach((styleKey: any) => (inputElementClone.style[styleKey] = elementCopyStyle[styleKey]));
    element.parentNode?.append(inputElementClone);

    inputElementClone.textContent = element.value.slice(0, position - 1 < 0 ? 0 : position - 1);
    spanElement.innerText = element.value.slice(position - 1 < 0 ? 0 : position - 1, position) || '.';

    inputElementClone.appendChild(spanElement);
    let coordinates = { left: spanElement.offsetLeft + spanElement.offsetWidth, top: spanElement.offsetTop, lineHeight: spanElement.offsetHeight };
    spanElement.remove()
    inputElementClone.remove();
    return coordinates;
}

export default getAutocompleteCoordinates;