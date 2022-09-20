import type { Locale } from "../../locale/index.type";

interface IBaseError {
    origin: string;
    message: string;
    error?: any;
    callback?: (locale: Locale) => void;
    isOperational?: boolean;
    locale?: Locale;
}

class BaseError extends Error {
    public readonly message: string;
    public readonly origin: string;
    public readonly error: any;
    public readonly locale?: Locale;

    constructor({ message, origin, callback, error, isOperational, locale }: IBaseError) {
        if (error instanceof BaseError) throw error;
        super(message);
        this.origin = origin;
        this.message = message;
        this.error = error;
        this.locale = locale;

        callback && this.execCallback(callback);
        this.developmentLogs();
        isOperational && process.exit(1);
    }

    private developmentLogs() {
        if (process.env.NODE_ENV === 'development') {
            console.error(
                '[ERROR] -->', this.origin, '\n',
                '- - [ORIGINAL]', this.error?.message || 'unavailable', '\n',
                '- - [MESSAGE]', this.message
            );
        }
    }

    private execCallback(callback: (locale: Locale) => void) {
        if (this.locale) {
            callback(this.locale);
        } else {
            import("../../locale").then(
                async ({ getLocale }) => {
                    const locale = await getLocale();
                    callback(locale);
                }
            )
        }
    }
}

export default BaseError;