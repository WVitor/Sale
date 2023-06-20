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
exports.Baixa = void 0;
var typeorm_1 = require("typeorm");
var Baixa = /** @class */ (function () {
    function Baixa() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Baixa.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Baixa.prototype, "codigo", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP(6)"; } }),
        __metadata("design:type", Date)
    ], Baixa.prototype, "created_at", void 0);
    Baixa = __decorate([
        (0, typeorm_1.Entity)()
    ], Baixa);
    return Baixa;
}());
exports.Baixa = Baixa;
