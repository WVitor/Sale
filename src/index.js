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
exports.http = void 0;
require('dotenv').config();
var data_source_1 = require("./dao/data-source");
var Express = require("express");
var produtosRoutes_1 = require("./routes/produtosRoutes");
var app = Express();
var cors = require("cors");
var ExpressSession = require("express-session");
var autenticacaoRoutes_1 = require("./routes/autenticacaoRoutes");
var usuarioRoutes_1 = require("./routes/usuarioRoutes");
var funcionalidadesRoutes_1 = require("./routes/funcionalidadesRoutes");
var tipoUsuarioRoutes_1 = require("./routes/tipoUsuarioRoutes");
var fileStore = require('session-file-store')(ExpressSession);
var Master = require('./modules/master');
var exphbs = require('express-handlebars');
var flash = require('express-flash');
exports.http = require('http').createServer(app);
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(Express.static("".concat(__dirname, "/../public")));
app.use('*/css', Express.static("".concat(__dirname, "/../public/css")));
app.use('*/js', Express.static("".concat(__dirname, "/../public/js")));
app.use(flash());
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(ExpressSession({
    name: 'session',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new fileStore({
        logFn: function () { },
        path: require('path').join(require('os').tmpdir(), 'sale/sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 1800000,
        httpOnly: true,
    },
}));
app.use(function (req, res, next) {
    if (req.session["token"]) {
        res.locals.session = req.session;
    }
    next();
});
app.get('/', function (req, res) {
    res.status(200).redirect("/entrar");
});
app.use(tipoUsuarioRoutes_1.tipoUsuarioRoutes);
app.use(funcionalidadesRoutes_1.funcionalidadesRoutes);
app.use(usuarioRoutes_1.usuarioRoutes);
app.use(autenticacaoRoutes_1.autenticacaoRoutes);
app.use(produtosRoutes_1.produtosRoutes);
app.use(function (req, res) {
    res.redirect("/dashboard");
});
data_source_1.AppDataSource.initialize().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        exports.http.listen(process.env.PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Master(process.env.ADMIN);
                console.log("Escutando na porta ".concat(process.env.PORT));
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); }).catch(function (error) { return console.log(error); });
