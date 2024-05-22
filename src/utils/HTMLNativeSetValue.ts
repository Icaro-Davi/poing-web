type FuncProps = {
    HTMLElementPrototype: typeof window.HTMLTextAreaElement.prototype | typeof window.HTMLInputElement.prototype;
    elementTarget: HTMLTextAreaElement | HTMLInputElement;
    value: string;
    customEventName: string;
}

function HTMLNativeSetValue(options: FuncProps) {
    let nativeTextareaSetter = Object.getOwnPropertyDescriptor(options.HTMLElementPrototype, 'value')?.set;
    nativeTextareaSetter?.call(options.elementTarget, options.value);
    const customEvent = new Event(options.customEventName, { bubbles: true });
    options.elementTarget.dispatchEvent(customEvent);
}

export default HTMLNativeSetValue;