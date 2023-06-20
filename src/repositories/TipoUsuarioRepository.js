"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoUsuarioRepository = void 0;
var typeorm_1 = require("typeorm");
var data_source_1 = require("../dao/data-source");
var Tipo_Usuario_1 = require("../entity/Tipo_Usuario");
exports.TipoUsuarioRepository = data_source_1.AppDataSource.getRepository(Tipo_Usuario_1.TipoUsuario).extend({
    findOneByMaster: function (master) {
        return exports.TipoUsuarioRepository.createQueryBuilder("tipo_usuario")
            .where("tipo_usuario.nome = :master", { master: master })
            .leftJoinAndSelect("tipo_usuario.funcionalidades", "funcionalidade")
            .select(["tipo_usuario.id", "tipo_usuario.nome"])
            .addSelect(["funcionalidade.id", "funcionalidade.nome", "funcionalidade.url"])
            .getOne();
    },
    findForUserRegister: function () {
        return exports.TipoUsuarioRepository.find({
            select: { id: true, nome: true },
            where: { nome: (0, typeorm_1.Not)((0, typeorm_1.Like)("".concat(process.env.ADMIN))) }
        });
    }
});
