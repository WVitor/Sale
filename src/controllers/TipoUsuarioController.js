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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoUsuarioController = void 0;
var typeorm_1 = require("typeorm");
var FuncionalidadeRepository_1 = require("../repositories/FuncionalidadeRepository");
var TipoUsuarioRepository_1 = require("../repositories/TipoUsuarioRepository");
var TipoUsuarioController = /** @class */ (function () {
    function TipoUsuarioController() {
    }
    TipoUsuarioController.tiposUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var page, search, tiposUsuario, tipos, paginacao, paginationLeft, paginationRight, contador, i, emptyTypes, typesQty, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        page = req.params.page || 1;
                        search = '';
                        if (req.query.search) {
                            search = req.query.search;
                        }
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.find({
                                select: { id: true, nome: true, nivel: true },
                                where: { nome: (0, typeorm_1.Like)("%".concat(search, "%")) && (0, typeorm_1.Not)((0, typeorm_1.Like)("".concat(process.env.ADMIN))) },
                                order: { created_at: req.query.order ? req.query.order : "ASC" },
                            })];
                    case 1:
                        tiposUsuario = _a.sent();
                        tipos = tiposUsuario.map(function (result) { return result; }).slice(page ? (10 * page) - 10 : 0, page ? 10 * page : 10);
                        paginacao = [];
                        paginationLeft = parseInt(page) - 1;
                        paginationRight = parseInt(page) + 1;
                        contador = 0;
                        for (i = 0; i <= tiposUsuario.map(function (result) { return result; }).length; i++) {
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
                        emptyTypes = false;
                        if (tipos.length === 0) {
                            emptyTypes = true;
                        }
                        typesQty = true;
                        if (tipos.length === 0) {
                            typesQty = false;
                        }
                        return [2 /*return*/, res.render('admin/typeDash', { tipos: tipos, emptyTypes: emptyTypes, search: search, typesQty: typesQty, paginacao: paginacao, paginationLeft: paginationLeft, paginationRight: paginationRight })];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TipoUsuarioController.cadastrarTipoUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, res.render('admin/typeRegister')];
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    TipoUsuarioController.cadastrarTipoUsuarioPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, nivel, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, nome = _a.nome, nivel = _a.nivel;
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.findOneBy({ nome: nome })];
                    case 1:
                        //validação de tipo
                        if (_b.sent()) {
                            req.flash('message', 'Ja existe um tipo de usuario com esse nome.');
                            return [2 /*return*/, res.render('admin/typeRegister')];
                        }
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.save({ nome: nome, nivel: nivel })
                            //salvar e manter sessao
                        ];
                    case 2:
                        _b.sent();
                        //salvar e manter sessao
                        req.flash('message', 'Tipo criado com sucesso');
                        req.session.save(function () {
                            res.redirect("/tipos-usuario");
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TipoUsuarioController.removerTipoUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, tipoUsuario, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.body.id;
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.findOne({
                                relations: { usuarios: true },
                                where: { id: id }
                            })];
                    case 1:
                        tipoUsuario = _a.sent();
                        if (tipoUsuario.usuarios.length > 0) {
                            req.flash('message', 'Existe usuários cadastrados para esse tipo.');
                            return [2 /*return*/, res.redirect("/tipos-usuario")];
                        }
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.remove(tipoUsuario)];
                    case 2:
                        _a.sent();
                        req.flash('message', 'Excluido com sucesso.');
                        req.session.save(function () {
                            res.redirect("/tipos-usuario");
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
    TipoUsuarioController.permissoes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tipo, tipoUsuario, funcionalidades, tipoFuncionalidades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tipo = req.params.tipo;
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.findOne({
                                select: { id: true, nome: true, nivel: true, funcionalidades: { id: true, nome: true } },
                                relations: { funcionalidades: true },
                                where: { nome: tipo }
                            })];
                    case 1:
                        tipoUsuario = _a.sent();
                        return [4 /*yield*/, FuncionalidadeRepository_1.FuncionalidadeRepository.find({
                                select: { id: true, nome: true },
                                where: { nivel: (0, typeorm_1.LessThanOrEqual)(tipoUsuario.nivel) }
                            })];
                    case 2:
                        funcionalidades = _a.sent();
                        tipoFuncionalidades = tipoUsuario.funcionalidades.map(function (result) {
                            var find = funcionalidades.find(function (element) { return element.id == result.id; });
                            if (find) {
                                funcionalidades.splice(funcionalidades.indexOf(find), 1);
                            }
                            return result;
                        });
                        return [2 /*return*/, res.render('admin/permissoes', { typeId: tipoUsuario.id, funcionalidades: funcionalidades, tipoFuncionalidades: tipoFuncionalidades })];
                }
            });
        });
    };
    TipoUsuarioController.permissoesPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, data, tipoUsuario;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, data = __rest(_a, ["id"]);
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.findOne({
                                relations: { funcionalidades: true },
                                where: { id: id }
                            })];
                    case 1:
                        tipoUsuario = _b.sent();
                        tipoUsuario.funcionalidades = [];
                        Object.keys(data).map(function (i) { return __awaiter(_this, void 0, void 0, function () {
                            var funcionalidade;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, FuncionalidadeRepository_1.FuncionalidadeRepository.findOne({
                                            select: { id: true },
                                            where: { id: parseInt(data[i]) }
                                        })];
                                    case 1:
                                        funcionalidade = _a.sent();
                                        tipoUsuario.funcionalidades.push(funcionalidade);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.save(tipoUsuario)];
                    case 2:
                        _b.sent();
                        req.flash('message', 'Permissões concedidas com sucesso');
                        req.session.save(function () {
                            res.redirect("/tipos-usuario");
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return TipoUsuarioController;
}());
exports.TipoUsuarioController = TipoUsuarioController;
