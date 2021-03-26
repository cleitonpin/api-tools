"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var typeorm_1 = require("typeorm");
var app_1 = require("../app");
var connection_1 = __importDefault(require("../database/connection"));
var ToolsRepository_1 = require("../repositories/ToolsRepository");
describe('tools', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.runMigrations()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var connection, _i, _a, entity, repository;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    connection = typeorm_1.getConnection();
                    _i = 0, _a = connection.entityMetadatas;
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    entity = _a[_i];
                    repository = typeorm_1.getConnection().getRepository(entity.name);
                    return [4 /*yield*/, repository.clear()];
                case 2:
                    _b.sent(); // Clear each entity table's content
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, connection.close()];
                case 5:
                    _b.sent();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should be able to create a new tool', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).post("/tools").send({
                        "title": "Notion",
                        "link": "https://notion.so",
                        "description": "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
                        "tags": [
                            "organization",
                            "planning",
                            "collaboration",
                            "writing",
                            "calendar"
                        ]
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should be able to list all tools', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).get("/tools")];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should be able to delete one tool', function () { return __awaiter(void 0, void 0, void 0, function () {
        var toolsRepository, tools, res, get;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    toolsRepository = typeorm_1.getCustomRepository(ToolsRepository_1.ToolsRepository);
                    tools = toolsRepository.create({
                        title: "Notion",
                        link: "https://notion.so",
                        description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
                        tags: [
                            "organization",
                            "planning",
                            "collaboration",
                            "writing",
                            "calendar"
                        ]
                    });
                    return [4 /*yield*/, toolsRepository.save(tools)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.app).delete("/tools/" + tools.id)];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.app).get("/tools/" + tools.id)];
                case 3:
                    get = _a.sent();
                    expect(res.status).toBe(204);
                    expect(get.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it('You must not be able to delete a non-existent tool', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).delete("/tools/26e9dc1d-1b05-4a71-922f-96d514041744")];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Must be able to find by tag', function () { return __awaiter(void 0, void 0, void 0, function () {
        var toolsRepository, tools, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    toolsRepository = typeorm_1.getCustomRepository(ToolsRepository_1.ToolsRepository);
                    tools = toolsRepository.create({
                        title: "Notion",
                        link: "https://notion.so",
                        description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
                        tags: [
                            "organization",
                            "planning",
                            "collaboration",
                            "writing",
                            "calendar"
                        ]
                    });
                    return [4 /*yield*/, toolsRepository.save(tools)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.app).get('/tools').query({ tag: tools.tags[0] })];
                case 2:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Must not be able to find by tag', function () { return __awaiter(void 0, void 0, void 0, function () {
        var toolsRepository, tools, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    toolsRepository = typeorm_1.getCustomRepository(ToolsRepository_1.ToolsRepository);
                    tools = toolsRepository.create({
                        title: "Notion",
                        link: "https://notion.so",
                        description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
                        tags: [
                            "organization",
                            "planning",
                            "collaboration",
                            "writing",
                            "calendar"
                        ]
                    });
                    return [4 /*yield*/, toolsRepository.save(tools)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.app).get('/tools').query({ tag: 'test' })];
                case 2:
                    res = _a.sent();
                    expect(res.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it("You shouldn't be able to create without an argument", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).post("/tools").send({
                        "link": "https://notion.so",
                        "description": "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
                        "tags": [
                            "organization",
                            "planning",
                            "collaboration",
                            "writing",
                            "calendar"
                        ]
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
});
