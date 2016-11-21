"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mysql = require("mysql");
const config = require("config");
const index_1 = require("../lib/index");
const odata_v4_server_1 = require("odata-v4-server");
let db = config.get("sqlConfig");
let connection = mysql.createConnection(db);
let Country = class Country {
};
__decorate([
    odata_v4_server_1.Edm.Key,
    odata_v4_server_1.Edm.String
], Country.prototype, "Code", void 0);
Country = __decorate([
    odata_v4_server_1.Edm.OpenType
], Country);
let City = class City {
};
__decorate([
    odata_v4_server_1.Edm.Key,
    odata_v4_server_1.Edm.Int32
], City.prototype, "ID", void 0);
City = __decorate([
    odata_v4_server_1.Edm.OpenType
], City);
class CountryLanguage {
}
__decorate([
    odata_v4_server_1.Edm.String
], CountryLanguage.prototype, "CountryCode", void 0);
__decorate([
    odata_v4_server_1.Edm.String
], CountryLanguage.prototype, "Language", void 0);
__decorate([
    odata_v4_server_1.Edm.String
], CountryLanguage.prototype, "IsOfficial", void 0);
__decorate([
    odata_v4_server_1.Edm.Double
], CountryLanguage.prototype, "Percentage", void 0);
let CountriesController = class CountriesController extends odata_v4_server_1.ODataController {
    getCountries(stream, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery = index_1.createQuery(query);
            return connection.query(sqlQuery.from("country"), sqlQuery.parameters).stream({
                highWaterMark: 5
            }).pipe(stream);
        });
    }
    getCountry(code, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery = index_1.createQuery(query);
            return new Promise((resolve, reject) => {
                connection.query(`SELECT ${sqlQuery.select} FROM country WHERE Code = ? AND (${sqlQuery.where})`, [code].concat(sqlQuery.parameters), (err, result) => {
                    if (err)
                        return reject(err);
                    resolve(result[0]);
                });
            });
        });
    }
};
__decorate([
    odata_v4_server_1.odata.GET,
    __param(0, odata_v4_server_1.odata.stream),
    __param(1, odata_v4_server_1.odata.query)
], CountriesController.prototype, "getCountries", null);
__decorate([
    odata_v4_server_1.odata.GET,
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.query)
], CountriesController.prototype, "getCountry", null);
CountriesController = __decorate([
    odata_v4_server_1.odata.type(Country)
], CountriesController);
let CitiesController = class CitiesController extends odata_v4_server_1.ODataController {
    getCities(stream, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery = index_1.createQuery(query);
            return connection.query(sqlQuery.from("city"), sqlQuery.parameters).stream({
                highWaterMark: 5
            }).pipe(stream);
        });
    }
    getCity(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery = index_1.createQuery(query);
            return new Promise((resolve, reject) => {
                connection.query(`SELECT ${sqlQuery.select} FROM city WHERE ID = ? AND (${sqlQuery.where})`, [id].concat(sqlQuery.parameters), (err, result) => {
                    if (err)
                        return reject(err);
                    resolve(result[0]);
                });
            });
        });
    }
};
__decorate([
    odata_v4_server_1.odata.GET,
    __param(0, odata_v4_server_1.odata.stream),
    __param(1, odata_v4_server_1.odata.query)
], CitiesController.prototype, "getCities", null);
__decorate([
    odata_v4_server_1.odata.GET,
    __param(0, odata_v4_server_1.odata.key),
    __param(1, odata_v4_server_1.odata.query)
], CitiesController.prototype, "getCity", null);
CitiesController = __decorate([
    odata_v4_server_1.odata.type(City)
], CitiesController);
let CountryLanguagesController = class CountryLanguagesController extends odata_v4_server_1.ODataController {
    getLanguages(stream, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery = index_1.createQuery(query);
            return connection.query(sqlQuery.from("countrylanguage"), sqlQuery.parameters).stream({
                highWaterMark: 5
            }).pipe(stream);
        });
    }
};
__decorate([
    odata_v4_server_1.odata.GET,
    __param(0, odata_v4_server_1.odata.stream),
    __param(1, odata_v4_server_1.odata.query)
], CountryLanguagesController.prototype, "getLanguages", null);
CountryLanguagesController = __decorate([
    odata_v4_server_1.odata.type(CountryLanguage)
], CountryLanguagesController);
let SqlServer = class SqlServer extends odata_v4_server_1.ODataServer {
};
SqlServer = __decorate([
    odata_v4_server_1.odata.cors,
    odata_v4_server_1.odata.controller(CountriesController, true),
    odata_v4_server_1.odata.controller(CitiesController, true),
    odata_v4_server_1.odata.controller(CountryLanguagesController, true)
], SqlServer);
SqlServer.create("/odata", 3004);
//# sourceMappingURL=sql.js.map