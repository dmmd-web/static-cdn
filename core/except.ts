// Defines abstract exception
export abstract class Exception extends Error {
    // Declares fields
    abstract readonly code: string;
    abstract readonly message: string;
    abstract readonly status: number;
}

// Defines exceptions
export class DebugException extends Exception {
    // Defines and declares fields
    readonly code = "DEBUG_EXCEPTION";
    readonly message: string;
    readonly status = 500;

    // Defines constructor
    constructor(message: string) {
        // Initializes parent
        super();

        // Initializes fields
        this.message = message;
    }
}
export class UnauthorizedToken extends Exception {
    // Defines fields
    readonly code = "UNAUTHORIZED_TOKEN";
    readonly message = "The token provided is not authorized.";
    readonly status = 401;
}
export class UnknownEndpoint extends Exception {
    // Defines fields
    readonly code = "UNKNOWN_ENDPOINT";
    readonly message = "The endpoint that you requested does not exist.";
    readonly status = 404;
}
export class UnknownException extends Exception {
    // Defines fields
    readonly code = "UNKNOWN_EXCEPTION";
    readonly message = "An unknown exception has occurred.";
    readonly status = 500;
}
