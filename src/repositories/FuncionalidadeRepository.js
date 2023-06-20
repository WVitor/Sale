"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionalidadeRepository = void 0;
var data_source_1 = require("../dao/data-source");
var Funcionalidade_1 = require("../entity/Funcionalidade");
exports.FuncionalidadeRepository = data_source_1.AppDataSource.getRepository(Funcionalidade_1.Funcionalidade).extend({});
