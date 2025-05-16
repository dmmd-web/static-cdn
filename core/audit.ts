// Imports
import chalk from "chalk";
import type * as except from "./except";

// Defines formatters
export function formatMessage(head: string, body: string, style: typeof chalk): string {
    // Creates stamp
    const date = new Date();
    const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const meridian = date.getHours() < 12 ? "AM" : "PM";
    const stamp = `${hours}:${minutes}:${seconds} ${meridian}`;

    // Formats message
    const message = style(`[${stamp}] ${head.toUpperCase()} | ${body}\n`);
    return message;
}

// Defines loggers
export function logMessage(body: string): void {
    // Logs message
    const message = formatMessage("MESSAGE", body, chalk.white);
    Bun.stdout.write(message);
}
export function logError(error: Error): void {
    // Logs message
    const body = `${error.message}`;
    const message = formatMessage("ERROR", body, chalk.red);
    Bun.stdout.write(message);
}
export function logException(exception: except.Exception): void {
    // Logs message
    const body = `${exception.message} (${exception.code} ${String(exception.status)})`;
    const message = formatMessage("EXCEPTION", body, chalk.red);
    Bun.stdout.write(message);
}
export function logFetch(request: Request, response: Response, server: Bun.Server): void {
    // Parses request
    const url = new URL(request.url);
    const address = request.headers.get("CF-Connecting-IP") ??
        server.requestIP(request)?.address ??
        "unknown";
    
    // Logs message
    const ip = chalk.cyan(address);
    const endpoint = chalk.cyan(`${request.method} ${url.pathname + url.search}`);
    const status = chalk.cyan(response.status);
    const body = `${ip} accessed ${endpoint} with status ${status}. (${response.ok ? "OK" : "FAILED"})`;
    const message = formatMessage("FETCH", body, response.ok ? chalk.green : chalk.red);
    Bun.stdout.write(message);
}
export function logServer(server: Bun.Server): void {
    // Logs message
    const url = chalk.cyan(
        typeof server.port === "number" ?
            `http://localhost:${String(server.port)}` :
            "localhost"
    );
    const body = `Server is listening on ${url}.`;
    const message = formatMessage("START", body, chalk.green);
    Bun.stdout.write(message);
}
