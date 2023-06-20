"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaixaRepository = void 0;
var Baixa_1 = require("../entity/Baixa");
var data_source_1 = require("../dao/data-source");
var moment = require('moment');
exports.BaixaRepository = data_source_1.AppDataSource.getRepository(Baixa_1.Baixa).extend({
    estoquePorMes: function (i) {
        return exports.BaixaRepository.createQueryBuilder("baixa")
            .where("baixa.created_at >= :dataInicio", { dataInicio: moment().subtract(i, 'months').format("YYYY-MM-01 00:00:00") })
            .andWhere("baixa.created_at <= :dataFinal", { dataFinal: moment().subtract(i, 'months').format("YYYY-MM-DD 23:59:59") })
            .select(["baixa.codigo"])
            .getMany();
    },
});
