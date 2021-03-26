"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var typeorm_1 = require("typeorm");
var Users = /** @class */ (function () {
    function Users() {
    }
    Users.prototype.hashPassword = function () {
        this.password = bcrypt_1.default.hashSync(this.password, 8);
    };
    Users.prototype.generateToken = function () {
        return jsonwebtoken_1.default.sign({ id: this.id }, process.env.APP_SECRET, { expiresIn: '1d' });
    };
    __decorate([
        typeorm_1.PrimaryColumn({
            name: 'id',
            type: 'uuid',
            generated: 'uuid',
            default: 'uuid_generate_v4()',
        }),
        __metadata("design:type", String)
    ], Users.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Users.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Users.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Users.prototype, "email", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Users.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Users.prototype, "hashPassword", null);
    Users = __decorate([
        typeorm_1.Entity('users')
    ], Users);
    return Users;
}());
exports.default = Users;
