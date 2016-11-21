# OData V4 Service modules - MySQL Connector

Service OData v4 requests from a MySQL data store.

## Synopsis
The OData V4 MySQL Connector provides functionality to convert the various types of OData segments
into SQL query statements, that you can execute over a MySQL database.

## Potential usage scenarios

- Create high speed, standard compliant data sharing APIs

## Usage as server - TypeScript
```javascript
import { createFilter } from 'odata-v4-mysql'

//example request:  GET /api/Users?$filter=Id eq 42
app.get("/api/Users", (req: Request, res: Response) => {
    const filter = createFilter(req.query.$filter);
    // connection instance from mysql module
    connection.query(`SELECT * FROM Users WHERE ${filter.where}`, filter.parameters, function(err, data){
        res.json({
        	'@odata.context': req.protocol + '://' + req.get('host') + '/api/$metadata#Users',
        	value: data
        });
    });
});
```

Advanced TypeScript example available [here](https://raw.githubusercontent.com/jaystack/odata-v4-mysql/master/src/example/sql.ts).

## Usage ES5
```javascript
var createFilter = require('odata-v4-mysql').createFilter;

app.get("/api/Users", function(req, res) {
    var filter = createFilter(req.query.$filter);
    // connection instance from mysql module
    connection.query(filter.from("Users"), filter.parameters, function(err, data){
        res.json({
        	'@odata.context': req.protocol + '://' + req.get('host') + '/api/$metadata#Users',
        	value: data
        });
    });
})
```

## Supported OData segments

* $filter
* $select
* $skip
* $top
* $orderby
* $expand