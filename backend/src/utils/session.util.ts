import "express-session";
/// <reference path="./@types/express-session.d.ts" />

declare module "express-session" {
    interface SessionData {
      user?: {
        id: string | number;
        email: string;
      };
    }
} 