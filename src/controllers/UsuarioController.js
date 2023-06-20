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
exports.UsuarioController = void 0;
var typeorm_1 = require("typeorm");
var TipoUsuarioRepository_1 = require("../repositories/TipoUsuarioRepository");
var UsuarioRepository_1 = require("../repositories/UsuarioRepository");
var cripto = require('crypto');
var bcrypt = require('bcryptjs');
var UsuarioController = /** @class */ (function () {
    function UsuarioController() {
    }
    UsuarioController.administrador = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, res.render('admin/admin')];
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    UsuarioController.usuarios = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var page, search, usuariosData, usuarios, paginacao, paginationLeft, paginationRight, contador, i, emptyUsers, usersQty, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        page = req.params.page || 1;
                        search = '';
                        if (req.query.search) {
                            search = req.query.search;
                        }
                        return [4 /*yield*/, UsuarioRepository_1.UsuarioRepository.find({
                                select: { id: true, nome: true, email: true, created_at: true, tipo: { nome: true } },
                                relations: { tipo: true },
                                where: [{ nome: (0, typeorm_1.Like)("%".concat(search, "%")), id: (0, typeorm_1.Not)(req.session["userId"]) },
                                    { email: (0, typeorm_1.Like)("%".concat(search, "%")), id: (0, typeorm_1.Not)(req.session["userId"]) }],
                                order: { created_at: req.query.order },
                            })];
                    case 1:
                        usuariosData = _a.sent();
                        usuarios = usuariosData.map(function (result) { return result; }).slice(page ? (10 * page) - 10 : 0, page ? 10 * page : 10);
                        paginacao = [];
                        paginationLeft = parseInt(page) - 1;
                        paginationRight = parseInt(page) + 1;
                        contador = 0;
                        for (i = 0; i <= usuariosData.map(function (result) { return result; }).length; i++) {
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
                        emptyUsers = false;
                        if (usuarios.length === 0) {
                            emptyUsers = true;
                        }
                        usersQty = true;
                        if (usuarios.length === 0) {
                            usersQty = false;
                        }
                        return [2 /*return*/, res.render('admin/userDash', { usuarios: usuarios, emptyUsers: emptyUsers, search: search, usersQty: usersQty, paginacao: paginacao, paginationLeft: paginationLeft, paginationRight: paginationRight })];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.cadastrarUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tiposUsuario, tipos, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.findForUserRegister()];
                    case 1:
                        tiposUsuario = _a.sent();
                        tipos = tiposUsuario.map(function (result) { return result; });
                        return [2 /*return*/, res.render('admin/userRegister', { tipos: tipos })];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.cadastrarUsuarioPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, email, tipoId, tipo, userTypes, tipos, userTypes, tipos, pwd, salt, hashedPwd, usuario, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        _a = req.body, nome = _a.nome, email = _a.email, tipoId = _a.tipoId;
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.findOne({ where: { nome: (0, typeorm_1.Not)((0, typeorm_1.Like)("".concat(process.env.ADMIN))), id: tipoId } })];
                    case 1:
                        tipo = _b.sent();
                        if (!!tipo) return [3 /*break*/, 3];
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.findForUserRegister()];
                    case 2:
                        userTypes = _b.sent();
                        tipos = userTypes.map(function (result) { return result; });
                        req.flash('message', 'Cadastre um tipo de usuário para continuar.');
                        return [2 /*return*/, res.render('admin/userRegister', { tipos: tipos })];
                    case 3: return [4 /*yield*/, UsuarioRepository_1.UsuarioRepository.findOneBy({ email: email })];
                    case 4:
                        if (!_b.sent()) return [3 /*break*/, 6];
                        return [4 /*yield*/, TipoUsuarioRepository_1.TipoUsuarioRepository.findForUserRegister()];
                    case 5:
                        userTypes = _b.sent();
                        tipos = userTypes.map(function (result) { return result; });
                        req.flash('message', 'Ja existe um usuario com esse email.');
                        return [2 /*return*/, res.render('admin/userRegister', { tipos: tipos })];
                    case 6:
                        pwd = cripto.randomBytes(10).toString('hex');
                        salt = bcrypt.genSaltSync(10);
                        hashedPwd = bcrypt.hashSync(pwd, salt);
                        usuario = {
                            nome: nome,
                            email: email,
                            password: hashedPwd,
                            tipo: tipo
                        };
                        return [4 /*yield*/, UsuarioRepository_1.UsuarioRepository.save(usuario)
                            //salvar e manter sessao
                        ];
                    case 7:
                        _b.sent();
                        //salvar e manter sessao
                        req.flash('message', 'Usuario criado com sucesso');
                        req.session.save(function () {
                            res.redirect("/usuarios");
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        error_3 = _b.sent();
                        console.log(error_3);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.removerUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, usuario, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.body.id;
                        return [4 /*yield*/, UsuarioRepository_1.UsuarioRepository.findOneBy({ id: id })];
                    case 1:
                        usuario = _a.sent();
                        return [4 /*yield*/, UsuarioRepository_1.UsuarioRepository.remove(usuario)];
                    case 2:
                        _a.sent();
                        req.flash('message', 'Excluido com sucesso.');
                        req.session.save(function () {
                            res.redirect("/usuarios");
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UsuarioController;
}());
exports.UsuarioController = UsuarioController;
