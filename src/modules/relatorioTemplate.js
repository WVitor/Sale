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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatoriosController = void 0;
var PdfPrinter = require("pdfmake");
var BaixaRepository_1 = require("../repositories/BaixaRepository");
var ProdutoRepository_1 = require("../repositories/ProdutoRepository");
var moment = require('moment');
var RelatoriosController = /** @class */ (function () {
    function RelatoriosController() {
    }
    RelatoriosController.relatorioTrimestral = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var entradasMesAtual, entradasMesPassado, entradasMesRetrasado, baixasMesAtual, baixasMesPassado, baixasMesRestrasado, months, meses, i, produtos, baixas, docDefinitions, fonts, pdfDoc, chunks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entradasMesAtual = [];
                        entradasMesPassado = [];
                        entradasMesRetrasado = [];
                        baixasMesAtual = [];
                        baixasMesPassado = [];
                        baixasMesRestrasado = [];
                        months = moment.localeData("pt").months();
                        meses = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 2)) return [3 /*break*/, 5];
                        return [4 /*yield*/, ProdutoRepository_1.ProdutoRepository.estoquePorMes(i)];
                    case 2:
                        produtos = _a.sent();
                        return [4 /*yield*/, BaixaRepository_1.BaixaRepository.estoquePorMes(i)];
                    case 3:
                        baixas = _a.sent();
                        meses.push(months[moment().subtract(i, 'months').format("MM") - 1].toUpperCase());
                        if (i == 0) {
                            //entradas
                            if (produtos.length !== 0) {
                                entradasMesAtual = [Object.keys(produtos[0]).map(function (k) { return { text: k, style: "columnsTitle" }; })];
                                produtos.map(function (produto) {
                                    entradasMesAtual.push(Object.values(produto).map(function (v) { return v; }));
                                });
                            }
                            else {
                                entradasMesAtual = [[{ text: "Não existe estoque referente a esse mes.", style: "columnsTitle" }]];
                            }
                            //baixas
                            if (baixas.length !== 0) {
                                baixasMesAtual = [Object.keys(baixas[0]).map(function (k) { return { text: k, style: "columnsTitle" }; })];
                                baixas.map(function (baixa) {
                                    baixasMesAtual.push(Object.values(baixa).map(function (v) { return v; }));
                                });
                            }
                            else {
                                baixasMesAtual = [[{ text: "Não existe baixas referente a esse mes.", style: "columnsTitle" }]];
                            }
                        }
                        else if (i == 1) {
                            if (produtos.length !== 0) {
                                entradasMesPassado = [Object.keys(produtos[0]).map(function (k) { return { text: k, style: "columnsTitle" }; })];
                                produtos.map(function (produto) {
                                    entradasMesPassado.push(Object.values(produto).map(function (v) { return v; }));
                                });
                            }
                            else {
                                entradasMesPassado = [[{ text: "Não existe estoque referente a esse mes.", style: "columnsTitle" }]];
                            }
                            //baixas
                            if (baixas.length !== 0) {
                                baixasMesPassado = [Object.keys(baixas[0]).map(function (k) { return { text: k, style: "columnsTitle" }; })];
                                baixas.map(function (baixa) {
                                    baixasMesPassado.push(Object.values(baixa).map(function (v) { return v; }));
                                });
                            }
                            else {
                                baixasMesPassado = [[{ text: "Não existe baixas referente a esse mes.", style: "columnsTitle" }]];
                            }
                        }
                        else if (i == 2) {
                            if (produtos.length !== 0) {
                                entradasMesRetrasado = [Object.keys(produtos[0]).map(function (k) { return { text: k, style: "columnsTitle" }; })];
                                produtos.map(function (produto) {
                                    entradasMesRetrasado.push(Object.values(produto).map(function (v) { return v; }));
                                });
                            }
                            else {
                                entradasMesRetrasado = [[{ text: "Não existe estoque referente a esse mes.", style: "columnsTitle" }]];
                            }
                            //baixas
                            if (baixas.length !== 0) {
                                baixasMesRestrasado = [Object.keys(baixas[0]).map(function (k) { return { text: k, style: "columnsTitle" }; })];
                                baixas.map(function (baixa) {
                                    baixasMesRestrasado.push(Object.values(baixa).map(function (v) { return v; }));
                                });
                            }
                            else {
                                baixasMesRestrasado = [[{ text: "Não existe baixas referente a esse mes.", style: "columnsTitle" }]];
                            }
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        docDefinitions = {
                            defaultStyle: { font: 'Helvetica' },
                            content: [
                                {
                                    image: "".concat(__dirname, "/../../public/img/sale_logo.png"),
                                    alignment: "center"
                                }, "\n",
                                {
                                    text: "Sistema admistrativo e logistico de estoque (SALE)",
                                    style: "header"
                                },
                                {
                                    columns: [
                                        {
                                            text: "Relatorio trimestral de estoque.",
                                            fontSize: 12,
                                            bold: true,
                                            alignment: "center"
                                        },
                                        {
                                            text: "Relatorio gerado ".concat(moment().format('DD/MM/YYYY'), "."),
                                            fontSize: 12,
                                            bold: true,
                                            alignment: "center",
                                        }
                                    ]
                                }, '\n\n',
                                {
                                    text: "Entradas\n__________________________________________________________________",
                                    bold: true,
                                    fontSize: 14,
                                    color: "#222",
                                    alignment: "center",
                                }, "\n",
                                {
                                    text: "Rela\u00E7\u00E3o de produtos referente ao mes de ".concat(meses[0], "."),
                                    alignment: "center"
                                }, '\n',
                                {
                                    columns: [
                                        { width: '*', text: '' },
                                        { width: "auto",
                                            table: {
                                                heights: function (row) { return 25; },
                                                body: __spreadArray([], entradasMesAtual, true)
                                            },
                                        },
                                        { width: '*', text: '' },
                                    ]
                                }, '\n\n',
                                {
                                    text: "Rela\u00E7\u00E3o de produtos referente ao mes de ".concat(meses[1], "."),
                                    alignment: "center"
                                }, '\n',
                                {
                                    columns: [
                                        { width: '*', text: '' },
                                        { width: "auto",
                                            table: {
                                                heights: function (row) { return 25; },
                                                body: __spreadArray([], entradasMesPassado, true)
                                            },
                                        },
                                        { width: '*', text: '' },
                                    ]
                                }, '\n\n',
                                {
                                    text: "Rela\u00E7\u00E3o de produtos referente ao mes de ".concat(meses[2], "."),
                                    alignment: "center"
                                }, '\n',
                                {
                                    columns: [
                                        { width: '*', text: '' },
                                        { width: "auto",
                                            table: {
                                                heights: function (row) { return 25; },
                                                body: __spreadArray([], entradasMesRetrasado, true)
                                            },
                                        },
                                        { width: '*', text: '' },
                                    ]
                                }, '\n\n',
                                {
                                    text: "Baixas\n__________________________________________________________________",
                                    bold: true,
                                    fontSize: 14,
                                    color: "#222",
                                    alignment: "center",
                                }, "\n",
                                {
                                    text: "Rela\u00E7\u00E3o de Baixas referente ao mes de ".concat(meses[0], "."),
                                    alignment: "center"
                                }, '\n',
                                {
                                    columns: [
                                        { width: '*', text: '' },
                                        { width: "auto",
                                            table: {
                                                heights: function (row) { return 25; },
                                                body: __spreadArray([], baixasMesAtual, true)
                                            },
                                        },
                                        { width: '*', text: '' },
                                    ]
                                }, '\n\n',
                                {
                                    text: "Rela\u00E7\u00E3o de Baixas referente ao mes de ".concat(meses[1], "."),
                                    alignment: "center"
                                }, '\n',
                                {
                                    columns: [
                                        { width: '*', text: '' },
                                        { width: "auto",
                                            table: {
                                                heights: function (row) { return 25; },
                                                body: __spreadArray([], baixasMesPassado, true)
                                            },
                                        },
                                        { width: '*', text: '' },
                                    ]
                                }, '\n\n',
                                {
                                    text: "Rela\u00E7\u00E3o de Baixas referente ao mes de ".concat(meses[2], "."),
                                    alignment: "center"
                                }, '\n',
                                {
                                    columns: [
                                        { width: '*', text: '' },
                                        { width: "auto",
                                            table: {
                                                heights: function (row) { return 25; },
                                                body: __spreadArray([], baixasMesRestrasado, true)
                                            },
                                        },
                                        { width: '*', text: '' },
                                    ]
                                },
                            ],
                            styles: {
                                columnsTitle: {
                                    fontSize: 14,
                                    bold: true,
                                    fillColor: "#222",
                                    color: "#f6982d",
                                    alignment: "center",
                                    margin: 4
                                },
                                header: {
                                    fontSize: 16,
                                    bold: true,
                                    alignment: 'center'
                                }
                            }
                        };
                        fonts = {
                            Helvetica: {
                                normal: 'Helvetica',
                                bold: 'Helvetica-Bold',
                                italics: 'Helvetica-Oblique',
                                bolditalics: 'Helvetica-BoldOblique'
                            }
                        };
                        pdfDoc = new PdfPrinter(fonts).createPdfKitDocument(docDefinitions);
                        chunks = [];
                        pdfDoc.on('data', function (chunk) {
                            chunks.push(chunk);
                        });
                        pdfDoc.end();
                        pdfDoc.on('end', function () {
                            var relatorio = Buffer.concat(chunks);
                            return res.end(relatorio);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return RelatoriosController;
}());
exports.RelatoriosController = RelatoriosController;
