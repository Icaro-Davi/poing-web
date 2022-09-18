import { Locale } from "../../locale/index.type";

interface IBaseError {
    origin: string;
    message: string;
    error?: any;
    callback?: (locale: Locale) => void;
    isOperational?: boolean
}

class BaseError extends Error {
    public readonly message: string;
    public readonly origin: string;
    public readonly error: any;

    constructor({ message, origin, callback, error, isOperational }: IBaseError) {
        if (error instanceof BaseError) throw error;
        super(message);
        this.origin = origin;
        this.message = message;
        this.error = error;

        callback && import("../../locale").then(
            async ({ getLocale }) => {
                const locale = await getLocale();
                callback(locale);
            }
        )
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
}

export default BaseError;