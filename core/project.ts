// Imports
import nodePath from "node:path";

// Defines constants
export const bunsvr = {
    version: "1.0.1"
};
export const root = nodePath.resolve(import.meta.dir, "../");

// Defines environment
export const admin = (process.env.ADMIN) ?? "admin";
export const debug = (process.env.DEBUG ?? "FALSE").toUpperCase() === "TRUE";
export const port = Number(process.env.PORT ?? "3000");
