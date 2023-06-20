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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionalidadesController = void 0;
var typeorm_1 = require("typeorm");
var FuncionalidadeRepository_1 = require("../repositories/FuncionalidadeRepository");
var FuncionalidadesController = /** @class */ (function () {
    function FuncionalidadesController() {
    }
    FuncionalidadesController.funcionalidades = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var page, search, funcData, funcionalidades, paginacao, paginationLeft, paginationRight, contador, i, emptyFunc, funcQty, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        page = req.params.page || 1;
                        search = '';
                        if (req.query.search) {
                            search = req.query.search;
                        }
                        return [4 /*yield*/, FuncionalidadeRepository_1.FuncionalidadeRepository.find({
                                select: { id: true, nome: true, url: true, nivel: true },
                                where: [{ nome: (0, typeorm_1.Like)("%".concat(search, "%")) }, { url: (0, typeorm_1.Like)("%".concat(search, "%")) }],
                                order: { created_at: req.query.order ? req.query.order : "ASC" },
                            })];
                    case 1:
                        funcData = _a.sent();
                        funcionalidades = funcData.map(function (result) { return result; }).slice(page ? (10 * page) - 10 : 0, page ? 10 * page : 10);
                        paginacao = [];
                        paginationLeft = parseInt(page) - 1;
                        paginationRight = parseInt(page) + 1;
                        contador = 0;
                        for (i = 0; i <= funcData.map(function (result) { return result; }).length; i++) {
                            if (i > 10 * contador) {
                                contador++;
                                paginacao.push(contador);
                            }
                        }
                        if (paginationLeft === 0 || page === undefined) {
                            paginationLeft = 1;
                        }
                        if (paginationRight > contador) {
                            paginationRight = contador;
                        }
                        emptyFunc = false;
                        if (funcionalidades.length === 0) {
                            emptyFunc = true;
                        }
                        funcQty = true;
                        if (funcionalidades.length === 0) {
                            funcQty = false;
                        }
                        res.render('admin/funcDash', { funcionalidades: funcionalidades, emptyFunc: emptyFunc, search: search, funcQty: funcQty, paginacao: paginacao, paginationLeft: paginationLeft, paginationRight: paginationRight, rota: req.session.rota });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FuncionalidadesController.cadastrarFuncionalidade = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.render('admin/funcRegister');
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    FuncionalidadesController.cadastrarFuncionalidadePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, url, nivel, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, nome = _a.nome, url = _a.url, nivel = _a.nivel;
                        nome = nome.toLowerCase().split(" ").join("-");
                        url = url.toLowerCase().split(" ").join("-");
                        nivel = parseInt(req.body.nivel);
                        if (url.substr(0, 1) != '/') {
                            url = "/".concat(url);
                            console.log(url);
                        }
                        return [4 /*yield*/, FuncionalidadeRepository_1.FuncionalidadeRepository.findOneBy({ nome: nome })];
                    case 1:
                        //validação de nome
                        if (_b.sent()) {
                            req.flash('message', 'Funcionalidade ja existe.');
                            return [2 /*return*/, res.render('admin/funcRegister')];
                        }
                        return [4 /*yield*/, FuncionalidadeRepository_1.FuncionalidadeRepository.findOneBy({ url: url })];
                    case 2:
                        //validação de url
                        if (_b.sent()) {
                            req.flash('message', 'Url ja existe.');
                            return [2 /*return*/, res.render('admin/funcRegister')];
                        }
                        return [4 /*yield*/, FuncionalidadeRepository_1.FuncionalidadeRepository.save({ nome: nome, url: url, nivel: nivel })];
                    case 3:
                        _b.sent();
                        req.flash('message', 'Funcionalidade cadastrada com sucesso.');
                        req.session.save(function () {
                            return res.redirect("/funcionalidades");
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FuncionalidadesController.removerFuncionalidade = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, funcionalidade, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.body.id;
                        return [4 /*yield*/, FuncionalidadeRepository_1.FuncionalidadeRepository.findOneBy({ id: id })];
                    case 1:
                        funcionalidade = _a.sent();
                        return [4 /*yield*/, FuncionalidadeRepository_1.FuncionalidadeRepository.remove(funcionalidade)];
                    case 2:
                        _a.sent();
                        req.flash('message', 'Funcionalidade excluída com sucesso.');
                        req.session.save(function () {
                            return res.redirect("/funcionalidades");
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return FuncionalidadesController;
}());
exports.FuncionalidadesController = FuncionalidadesController;
