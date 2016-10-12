import { Router, Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
const eslint = require('eslint');

const protectedRouter: Router = Router();

const ConfigFile = require("eslint/lib/config/config-file");
let eslintCfg = require('eslint-config-airbnb');
eslintCfg = ConfigFile.applyExtends(eslintCfg, '');
eslintCfg.rules['strict'] = "off";
eslintCfg.rules['no-console'] = "off";

protectedRouter.post('/verify', (request: Request, response: Response) => {
    response.json(eslint.linter.verify(request.body.code, eslintCfg));
});

protectedRouter.use((request: Request & { headers: { authorization: string } }, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;

    verify(token, secret, function(tokenError) {
        if (tokenError) {
            return response.status(403).json({
                message: "Invalid token, please Log in first"
            });
        }

        next();
    });
});

protectedRouter.get("/", (request: Request, response: Response) => {
    response.json({
        text: "Greetings, you have valid token.",
        title: "Protected call"
    });
});

export { protectedRouter }





