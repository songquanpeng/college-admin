const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

db.serialize(function () {
    // const createArticleTable = '' +
    //     'CREATE TABLE IF NOT EXISTS articles' +
    //     '(id integer primary key, title TEXT, author TEXT, tag TEXT, time TEXT, content TEXT, description TEXT)';
    // db.run(createArticleTable);
    console.log("Database initialization completed.");
});