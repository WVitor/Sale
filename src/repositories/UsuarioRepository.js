"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
var Usuario_1 = require("../entity/Usuario");
var data_source_1 = require("../dao/data-source");
exports.UsuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario).extend({
    findAllNotMaster: function () {
        return exports.UsuarioRepository.createQueryBuilder('usuario')
            .leftJoinAndSelect("usuario.tipo", "tipo_usuario")
            .leftJoinAndSelect("tipo_usuario.funcionalidades", "funcionalidade")
            .select(["usuario.id", "usuario.nome", "usuario.email", "usuario.created_at"])
            .addSelect(['tipo_usuario.id', 'tipo_usuario.nome', "tipo_usuario.nivel"])
            .addSelect(["funcionalidade.id", "funcionalidade.nome", "funcionalidade.nivel"])
            .where('tipo_usuario.nome != :nome', { nome: process.env.ADMIN })
            .getMany();
    },
    findOneByIdNotMaster: function (id) {
        return exports.UsuarioRepository.createQueryBuilder('usuario')
            .leftJoinAndSelect("usuario.tipo", "tipo_usuario")
            .leftJoinAndSelect("tipo_usuario.funcionalidades", "funcionalidade")
            .select(["usuario.id", "usuario.nome", "usuario.email", "usuario.created_at"])
            .addSelect(['tipo_usuario.id', 'tipo_usuario.nome', "tipo_usuario.nivel"])
            .addSelect(["funcionalidade.id", "funcionalidade.nome", "funcionalidade.nivel"])
            .where('tipo_usuario.nome != :nome', { nome: process.env.ADMIN })
            .andWhere('usuario.id = :id', { id: id })
            .getOne();
    },
    acharPorEmailJuntarTipo: function (email) {
        return exports.UsuarioRepository.createQueryBuilder('usuario')
            .leftJoinAndSelect("usuario.tipo", "tipo_usuario")
            .select(["usuario.id", "usuario.nome", "usuario.email", "usuario.password"])
            .addSelect(['tipo_usuario.id', 'tipo_usuario.nome', "tipo_usuario.nivel"])
            .where('usuario.email = :email', { email: email })
            .getOne();
    },
});
