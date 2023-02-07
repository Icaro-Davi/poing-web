const forceUpdateReactState = (element: HTMLElement) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    setter?.call(element, `${Math.random().toString(32).slice(2, 7)}`);
    const event = new Event('input', { bubbles: true });
    element?.dispatchEvent(event);
}

export default forceUpdateReactState;