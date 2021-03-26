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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Tools = /** @class */ (function () {
    function Tools() {
    }
    __decorate([
        typeorm_1.PrimaryColumn({
            name: 'id',
            type: 'uuid',
            generated: 'uuid',
            default: 'uuid_generate_v4()',
        }),
        __metadata("design:type", String)
    ], Tools.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Tools.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Tools.prototype, "link", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Tools.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column("simple-array", { array: true }),
        __metadata("design:type", Array)
    ], Tools.prototype, "tags", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Tools.prototype, "created_at", void 0);
    Tools = __decorate([
        typeorm_1.Entity('tools')
    ], Tools);
    return Tools;
}());
exports.default = Tools;
