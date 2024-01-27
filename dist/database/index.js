"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = tslib_1.__importDefault(require("sequelize"));
const config_1 = require("../config");
const posts_model_1 = tslib_1.__importDefault(require("../models/posts.model"));
const sequelize = new sequelize_1.default.Sequelize(config_1.DB_DATABASE || '', config_1.DB_USER || '', config_1.DB_PASSWORD, {
    dialect: 'mysql',
    host: config_1.DB_HOST,
    port: Number(config_1.DB_PORT),
    timezone: '+09:00',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
        freezeTableName: true,
    },
    pool: {
        min: 0,
        max: 5,
    },
    logQueryParameters: config_1.NODE_ENV === 'development',
    logging: (query, time) => {
        console.info(time + 'ms' + ' ' + query);
    },
    benchmark: true,
});
sequelize.authenticate();
exports.DB = {
    Posts: (0, posts_model_1.default)(sequelize),
    sequelize, // connection instance (RAW queries)
    Sequelize: // connection instance (RAW queries)
    sequelize_1.default, // library
};
//# sourceMappingURL=index.js.map