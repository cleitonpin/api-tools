"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var connection_1 = __importDefault(require("./database/connection"));
var routes_1 = __importDefault(require("./routes"));
connection_1.default();
var app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
app.use(routes_1.default);
