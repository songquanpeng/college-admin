const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

class User {
    static checkCredential(id, password, userType, callback) {
        db.get('SELECT password FROM '+ userType + ' WHERE '+userType+'ID'+' = '+id, (error, data)=>{
            let valid = false;
            if(error){  // An error occurred while querying the database
                console.error(error.message);
            }else {
                if(data===undefined){  // No eligible query items
                    valid = false;
                }else {
                    if(password===data.password){
                        valid = true;
                    }
                }
            }
            callback(error, valid);
        })
    };

    static updatePassword(id, userType, newPassword, callback) {
        db.run('UPDATE ? SET password = ? WHERE ? = ?', userType, newPassword, userType+'ID', id, (error)=>{
            callback(error);
        });
    };
}

module.exports.db = db;
module.exports.User = User;