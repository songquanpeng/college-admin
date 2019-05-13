const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

class User {
    static checkCredential(id, password, userType, callback) {

        callback(error, valid);
    };

    static updatePassword(id, userType, newPassword, callback) {
        callback(error);
    };
}