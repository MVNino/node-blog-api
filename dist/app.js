"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
require("dotenv/config");
const express_1 = tslib_1.__importDefault(require("express"));
const database_1 = require("./database");
const compression_1 = tslib_1.__importDefault(require("compression"));
// import cookieParser from 'cookie-parser';
const cors_1 = tslib_1.__importDefault(require("cors"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const config_1 = require("./config");
// import { stream } from './utils/logger';
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = "development";
        this.port = 3000;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.info(`=================================`);
            console.info(`======= ENV: ${this.env} =======`);
            console.info(`🚀 App listening on the port ${this.port}`);
            console.info(`=================================`);
        });
    }
    async connectToDatabase() {
        await database_1.DB.sequelize.sync({ force: false });
    }
    initializeMiddlewares() {
        // this.app.use(morgan(LOG_FORMAT, { stream }));
        this.app.use((0, cors_1.default)({ origin: config_1.ORIGIN, credentials: config_1.CREDENTIALS }));
        this.app.use((0, hpp_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // this.app.use(cookieParser());
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use("/", route.router);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map