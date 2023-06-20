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
exports.Funcionalidade = void 0;
var typeorm_1 = require("typeorm");
var Tipo_Usuario_1 = require("./Tipo_Usuario");
var Funcionalidade = /** @class */ (function () {
    function Funcionalidade() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Funcionalidade.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Funcionalidade.prototype, "nome", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Funcionalidade.prototype, "url", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Funcionalidade.prototype, "nivel", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP(6)"; } }),
        __metadata("design:type", Date)
    ], Funcionalidade.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Tipo_Usuario_1.TipoUsuario; }, function (tiposUsuario) { return tiposUsuario.funcionalidades; }),
        __metadata("design:type", Array)
    ], Funcionalidade.prototype, "tiposUsuarios", void 0);
    Funcionalidade = __decorate([
        (0, typeorm_1.Entity)()
    ], Funcionalidade);
    return Funcionalidade;
}());
exports.Funcionalidade = Funcionalidade;
