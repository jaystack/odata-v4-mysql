import * as mysql from "mysql";
import * as config from "config";
import { createFilter, createQuery } from "../lib/index";
import { Edm, odata, ODataController, ODataServer, ODataQuery, ODataErrorHandler, ResourceNotFoundError, createODataServer } from "odata-v4-server";

let db:mysql.IConnectionConfig = <mysql.IConnectionConfig>config.get<mysql.IConnectionConfig>("sqlConfig");
let connection:mysql.IConnection = mysql.createConnection(db);

@Edm.OpenType
class Country{
    @Edm.Key
    @Edm.String
    Code:string
}

@Edm.OpenType
class City{
    @Edm.Key
    @Edm.Int32
    ID:number
}

class CountryLanguage{
    @Edm.String
    CountryCode:string

    @Edm.String
    Language:string

    @Edm.String
    IsOfficial:string

    @Edm.Double
    Percentage:number
}

@odata.type(Country)
class CountriesController extends ODataController{
    @odata.GET
    async getCountries(@odata.stream stream, @odata.query query){
        let sqlQuery = createQuery(query);
        return connection.query(sqlQuery.from("country"), sqlQuery.parameters).stream({
            highWaterMark: 5
        }).pipe(stream);
    }

    @odata.GET
    async getCountry(@odata.key code:string, @odata.query query){
        let sqlQuery = createQuery(query);
        return new Promise((resolve, reject) => {
            connection.query(`SELECT ${sqlQuery.select} FROM country WHERE Code = ? AND (${sqlQuery.where})`, [code].concat(sqlQuery.parameters), (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            });
        });
    }
}

@odata.type(City)
class CitiesController extends ODataController{
    @odata.GET
    async getCities(@odata.stream stream, @odata.query query){
        let sqlQuery = createQuery(query);
        return connection.query(sqlQuery.from("city"), sqlQuery.parameters).stream({
            highWaterMark: 5
        }).pipe(stream);
    }

    @odata.GET
    async getCity(@odata.key id:number, @odata.query query){
        let sqlQuery = createQuery(query);
        return new Promise((resolve, reject) => {
            connection.query(`SELECT ${sqlQuery.select} FROM city WHERE ID = ? AND (${sqlQuery.where})`, [id].concat(sqlQuery.parameters), (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            });
        });
    }
}

@odata.type(CountryLanguage)
class CountryLanguagesController extends ODataController{
    @odata.GET
    async getLanguages(@odata.stream stream, @odata.query query){
        let sqlQuery = createQuery(query);
        return connection.query(sqlQuery.from("countrylanguage"), sqlQuery.parameters).stream({
            highWaterMark: 5
        }).pipe(stream);
    }
}

@odata.cors
@odata.controller(CountriesController, true)
@odata.controller(CitiesController, true)
@odata.controller(CountryLanguagesController, true)
class SqlServer extends ODataServer{}

SqlServer.create("/odata", 3004);