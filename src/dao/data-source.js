"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var AppDataSourceDEV = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DEV_DB_HOST,
    port: parseInt(process.env.DEV_DB_PORT),
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PWD,
    database: process.env.DEV_DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["".concat(__dirname, "/../entity/*[.ts,.js]")],
    migrations: ["".concat(__dirname, "/../migration/*[.ts,.js]")],
    subscribers: [],
});
var AppDataSourcePROD = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.PROD_DB_HOST,
    port: parseInt(process.env.PROD_DB_PORT),
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PWD,
    database: process.env.PROD_DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["".concat(__dirname, "/../entity/*[.ts,.js]")],
    migrations: ["".concat(__dirname, "/../migration/*[.ts,.js]")],
    subscribers: [],
});
exports.AppDataSource = process.env.PROD === 'true' ? AppDataSourcePROD : AppDataSourceDEV;
