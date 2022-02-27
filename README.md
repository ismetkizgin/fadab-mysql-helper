# fadab-mysql-helper

A lightweight Promise-based wrapper and helper for felixge's node-Mysql.

## Features:

- Very slim library, only 2 dependancies ([app-root-path](https://www.npmjs.com/package/app-root-path) and [felixge's node-mysql](https://github.com/felixge/node-mysql)).
- Convenience functions for record selecting, inserting, updating and insert (on duplicate) updating.
- Connection pooling.
- Everything based on Promises.

## Install

```
npm i fadab-mysql-helper --save
```

```
yarn add fadab-mysql-helper
```

## Usage

### Fadab Config File

The fadab.config file should be created in the project root directory. Format you connection options based on [felixge's options](https://github.com/felixge/node-mysql#connection-options).

#### Javascript File Example

```javascript
module.exports = {
  mysql: {
    host: 'host',
    user: 'user',
    password: 'password',
    database: 'database_name'
  }
};
```

#### Typescript File Example

```typescript
export default {
  mysql: {
    host: 'host',
    user: 'user',
    password: 'password',
    database: 'database_name'
  }
};
```

### Defining Library

#### Javascript Example

```javascript
const FadabMysql = require('fadab-mysql-helper');
```

#### Typescript Example

```typescript
import * as FadabMysql from 'fadab-mysql-helper';
```

### Selecting a record

```javascript
FadabMysql.selectAsync('tableName')
  .then(function (record) {
    console.log(record);
  })
  .catch(function (err) {
    console.log('Error fetching record, mysql error:', err.message);
  });

// or

const record = await FadabMysql.selectAsync('tableName');
console.log(record);
```

Options can be added for the select operation.

- **where**: A condition is created with the data sent as object.
- **distinct**:  The data taken with this parameter receiving the Boolean value is unique.(Default:false)
- **fields**: The names of the columns whose data are required in the table are sent in array format and listed.
- **orderBy**: Specifies by which columns the listed data should be sorted and how;
  - **fields**: The names of the table columns that need to be sorted are sent as an array.
  - **ranking**: ASC or DESC property is specified and sorting is performed.
- **limit**: The amount of data to be listed is specified.
- **offset**: Specifies from which index to start the data to be listed.

```javascript
const where = {
  FirstName: 'ismet'
};

// Creates a where query with the data sent in the where object.
// List the users whose name is ismet with this operation.
const records = await FadabMysql.selectAsync('tableName', { where });
console.log(records);
```

```javascript
const orderBy = {
  fields: 'FirstName',
  // or
  // filed: ["FirstName", "LastName"]
  ranking: 'ASC'
};

// Sort by First Name column.
const records = await FadabMysql.selectAsync('tableName', { orderBy });
console.log(records);
```

```javascript
const fields = ['FirstName', 'LastName'];

// It lists data from the table according to the desired columns.
const records = await FadabMysql.selectAsync('tableName', { fields });
console.log(records);
```

```javascript
const records = await FadabMysql.selectAsync('tableName', {
  limit: 2,
  offset: 1
});
console.log(records);
```

#### Advanced Query Examples

```javascript
const orderBy = {
    filed: ["FirstName", "LastName"]
    ranking: "ASC"
};

const where = [
  {
    key: 'FirstName',
    value: 'ismet',
    conditionType: 'eq'
  },
  {
    key: 'LastName',
    value: 'kizgin',
    conditionType: 'eq'
  },
  {
    key: 'Age',
    value: 18,
    conditionType: 'gte'
  }
];

const records = await FadabMysql.selectAsync('tableName', { orderBy, where, limit: 2, offset: 1 });
console.log(records);
```

```javascript
const orderBy = {
    filed: ["FirstName", "LastName"]
    ranking: "ASC"
};

const where = {
  _and: {
    FirstName: 'ismet',
    LastName: 'kizgin'
  },
  _or: [
    {
      key: 'Age',
      value: 18,
      conditionType: 'gte'
    },
    {
      key: 'Age',
      value: 10,
      conditionType: 'lte'
    }
  ]
};

const records = await FadabMysql.selectAsync('tableName', { orderBy, where, limit: 2, offset: 1 });
console.log(records);
```
#### Count 

```javascript
const total = await FadabMysql.countAsync('tableName');
console.log(total);
```

```javascript
const where = {
  _and: {
    FirstName: 'ismet',
    LastName: 'kizgin'
  },
  _or: [
    {
      key: 'Age',
      value: 18,
      conditionType: 'gte'
    },
    {
      key: 'Age',
      value: 10,
      conditionType: 'lte'
    }
  ]
};

const total = await FadabMysql.countAsync('tableName', { where });
console.log(total);
```

#### Find One

```javascript
// Returns a single record as object.
const records = await FadabMysql.findOneAsync('tableName', { id: 1 });
console.log(records);
```

#### Advanced Example

```javascript
const orderBy = {
    filed: ["FirstName", "LastName"]
    ranking: "ASC"
};

const where = {
    FirstName: "ismet"
};

const fields = ["FirstName", "LastName"];

const records = await FadabMysql.selectAsync('tableName', { orderBy, where, fields, limit: 2, offset: 1 });
console.log(records);
```

### Inserting a record

```javascript
const insert = {
  EmailAddress: 'info@ismetkizgin.com',
  FirstName: 'İsmet',
  LastName: 'Kizgin'
};

FadabMysql.insertAsync('tblUser', insert)
  .then(function (info) {
    console.log('New User Entered!', info);
  })
  .catch(function (err) {
    console.log('Error creating new user, mysql error:', err.message);
  });

// or

const info = await FadabMysql.insertAsync('tblUser', insert);
console.log(info);

//info is an object with affectedRows and insertId
```

_There is also a boolean 3rd argument, true if you want "INSERT IGNORE"_

### Multi insert records

```javascript
const insert = [
  {
    EmailAddress: 'info@ismetkizgin.com',
    FirstName: 'İsmet',
    LastName: 'Kizgin'
  },
  {
    EmailAddress: 'info1@ismetkizgin.com',
    FirstName: 'İsmet',
    LastName: 'Kizgin'
  }
];

FadabMysql.bulkInsertAsync('tblUser', insert)
  .then(function (info) {
    console.log('New User Entered!', info);
  })
  .catch(function (err) {
    console.log('Error creating new user, mysql error:', err.message);
  });

// or

const info = await FadabMysql.bulkInsertAsync('tblUser', insert);
console.log(info);

//info is an object with affectedRows and insertId
```

_There is also a boolean 3rd argument, true if you want "INSERT IGNORE"_

### Updating a record

```javascript
var where = {
  Id: 1
};

var update = {
  EmailAddress: 'info@ismetkizgin.com',
  FirstName: 'İsmet',
  LastName: 'Kizgin'
};

FadabMysql.updateAsync('tblUser', update, where)
  .then(function (info) {
    console.log('User Updated!', info);
  })
  .catch(function (err) {
    console.log('Error updating record, mysql error:', err.message);
  });

// or

const info = await FadabMysql.updateAsync('tblUser', update, where);
console.log(info);

//info is an object with affectedRows, changedRows
```

### Deleting a record

```javascript
FadabMysql.deleteAsync('tblUser', { id: 1 })
  .then(function (record) {
    console.log(record);
  })
  .catch(function (err) {
    console.log('Error deleting record, mysql error:', err.message);
  });

// or

const where = {
  id: 1
};

const record = await FadabMysql.deleteAsync('tblUser', where);
console.log(record);
```

### Custom Queries

_Don't forget to release the pooled connection so another process can use it._

```javascript
//query has sql structure
//values will be placed in the query when escaped, and are optional
FadabMysql.query(query, values)
  .then(function (results) {
    console.log('my query results', results);
  })
  .catch(function (err) {
    reject(err);
  });

// or

const results = await FadabMysql.queryAsync(query, values);
console.log(results);
```

The query values are used in the same way [felixge's module](https://github.com/felixge/node-mysql#escaping-query-values) expects it. They are also optional.

### Utilities

```javascript
// Formatting sql query
var query = FadabMysql.format(query, values);

//Escape a database,table or column name
var value = FadabMysql.escapeId(values);

//Escape a string
var noSqlInject = FadabMysql.escapeId(value);
```

### Helper Class

_Class content_

```typescript
import { SelectOptions } from '../models';
export declare class FadabHelper {
  protected baseTable: string;
  constructor();
  queryAsync: (
    query: string,
    values?: object | object[] | undefined
  ) => Promise<unknown>;
  selectAsync(options: SelectOptions): Promise<unknown>;
  findOneAsync(where: object): Promise<object>;
  insertAsync(values: any, ignore?: boolean): Promise<unknown>;
  updateAsync(values: object, where: object): Promise<unknown>;
  deleteAsync(where: object): Promise<unknown>;
  countAsync(options?: CountOptions): Promise<number>;
  bulkInsertAsync(values: Array<DynamicObject>, ignore?: boolean): Promise<unknown>;
}
```

#### Usage

```javascript
const { FadabHelper } = require('fadab-mysql-helper');
// or
// import { FadabHelper } from 'fadab-mysql-helper';

class MysqlTransaction extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tableName';
  }
}
```

## Coming Soon

- fadab-mssql-helper
- fadab-postgresql-helper

## Support fadab-mysql-helper

fadab-mysql-helper is completely free and open-source. If you find it useful, you can show your support by 🌟 it or sharing it in your social network.

## License

[GNU General Public](LICENSE)
