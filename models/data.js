const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

class Data {
    static checkCredential(id, password, userType, callback) {
        function checkPassword(error, data) {
            let valid = false;
            if (error) {  // An error occurred while querying the database
                console.error(error.message);
            } else {
                if (data === undefined) {  // No eligible query items
                    valid = false;
                } else {
                    if (password === data.password) {
                        valid = true;
                    }
                }
            }
            callback(error, valid);
        }
        if(userType==="student"){
            db.get('SELECT password FROM student WHERE studentID = ?',id, checkPassword);
        }else if(userType==="admin"){
            db.get('SELECT password FROM admin WHERE adminID = ?',id, checkPassword);
        }else if(userType==="teacher"){
            db.get('SELECT password FROM teacher WHERE teacherID = ?',id, checkPassword);
        }else {
            console.error("Unexpected user type: "+userType);
            callback(undefined, false);
        }
    };

    static getDataByTypeAndID(dataType, id, callback){
        if(dataType==="student"){
            db.get('SELECT * FROM student WHERE studentID = ?',id, callback);
        }else if(dataType==="admin"){
            db.get('SELECT * FROM admin WHERE adminID = ?',id, callback);
        }else if(dataType==="teacher"){
            db.get('SELECT * FROM teacher WHERE teacherID = ?',id, callback);
        }else if(dataType==="cc_info"){
            db.get('SELECT * FROM teacher WHERE studentID = ? AND teacherID = ? AND courseID = ? AND chosenYear = ?',id, callback);
        }else {
            console.error("Unexpected data type: "+dataType);
            callback(undefined, undefined);
        }

    }

}

module.exports.db = db;
module.exports.Data = Data;