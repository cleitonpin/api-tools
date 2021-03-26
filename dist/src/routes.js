"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = __importDefault(require("./controllers/AuthController"));
// controllers
var ToolsController_1 = __importDefault(require("./controllers/ToolsController"));
var UsersController_1 = __importDefault(require("./controllers/UsersController"));
// middleware
var authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
var routes = express_1.Router();
routes.post('/tools', ToolsController_1.default.create);
routes.delete('/tools/:id', ToolsController_1.default.delete);
routes.get('/tools', ToolsController_1.default.index);
routes.get('/tools/:id', ToolsController_1.default.index);
routes.post('/user', UsersController_1.default.create);
routes.get('/user', UsersController_1.default.index);
// login route authentication and authenticates
routes.post('/login', AuthController_1.default.authenticate);
routes.delete('/user/:id', authMiddleware_1.default, UsersController_1.default.delete);
routes.get('/user/profile', authMiddleware_1.default, UsersController_1.default.logged);
exports.default = routes;
