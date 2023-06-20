"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoRepository = void 0;
var Produto_1 = require("../entity/Produto");
var data_source_1 = require("../dao/data-source");
var moment = require('moment');
exports.ProdutoRepository = data_source_1.AppDataSource.getRepository(Produto_1.Produto).extend({
    planilhaData: function () {
        return exports.ProdutoRepository.createQueryBuilder("produto")
            .where("produto.created_at >= :data", { data: moment().subtract(3, 'months').format("YYYY-MM-DD hh:mm:ss") })
            .select(["produto.codigo", "produto.nome", "produto.descricao", "produto.quantidade"])
            .getMany();
    },
    estoquePorMes: function (i) {
        return exports.ProdutoRepository.createQueryBuilder("produto")
            .where("produto.created_at >= :dataInicio", { dataInicio: moment().subtract(i, 'months').format("YYYY-MM-01 00:00:00") })
            .andWhere("produto.created_at <= :dataFinal", { dataFinal: moment().subtract(i, 'months').format("YYYY-MM-DD 23:59:59") })
            .select(["produto.codigo", "produto.nome", "produto.descricao", "produto.quantidade"])
            .getMany();
    },
});
