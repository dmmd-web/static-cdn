// Imports
import * as audit from "./audit";
import * as except from "./except";
import * as project from "./project";
import * as router from "./router";

// Defines server
export const server = Bun.serve({
    development: project.debug,
    fetch: async (request: Request): Promise<Response> => {
        // Handles fetch
        try {
            // Handles route
            const url = new URL(request.url);
            for(let i = 0; i < router.routes.length; i++) {
                // Matches route
                const route = router.routes[i]!;
                const matched = typeof route.pattern === "function" ?
                    await route.pattern(request, server) :
                    typeof route.pattern === "string" ?
                        route.pattern === url.pathname :
                        route.pattern.test(url.pathname);
                if(!matched) continue;
                
                // Resolves route
                const response = await route.resolve(request, server);
                if(response === null) continue;
                audit.logFetch(request, response, server);
                return response;
            }
            throw new except.UnknownEndpoint();
        }
        catch(thrown) {
            // Handles exception
            const error = thrown instanceof Error ?
                thrown :
                new Error(String(thrown));
            const exception = thrown instanceof except.Exception ?
                thrown :
                project.debug ?
                    new except.DebugException(error.message) :
                    new except.UnknownException();
            const response = Response.json({
                code: exception.code,
                message: exception.message
            }, exception.status);
            if(thrown instanceof except.Exception) audit.logException(exception); 
            else audit.logError(error);
            audit.logFetch(request, response, server);
            return response;
        }
    },
    port: project.port
});
audit.logServer(server);
