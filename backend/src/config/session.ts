import session from "express-session";
import config from "./index";

export default session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: config.isProd, httpOnly: true, maxAge: 1000 * 60 * 60 },
  });