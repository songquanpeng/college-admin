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

        if (userType === "student") {
            db.get('SELECT password FROM student WHERE studentID = ?', id, checkPassword);
        } else if (userType === "admin") {
            db.get('SELECT password FROM admin WHERE adminID = ?', id, checkPassword);
        } else if (userType === "teacher") {
            db.get('SELECT password FROM teacher WHERE teacherID = ?', id, checkPassword);
        } else {
            console.error("Unexpected user type: " + userType);
            callback(undefined, false);
        }
    };

    static getDataByTypeAndID(dataType, id, callback) {
        if (dataType === "student") {
            db.get('SELECT * FROM student WHERE studentID = ?', id, callback);
        } else if (dataType === "admin") {
            db.get('SELECT * FROM admin WHERE adminID = ?', id, callback);
        } else if (dataType === "teacher") {
            db.get('SELECT * FROM teacher WHERE teacherID = ?', id, callback);
        } else if (dataType === "cc-info") {
            db.get('SELECT * FROM cc_info WHERE studentID = ? AND teacherID = ? AND courseID = ? AND chosenYear = ?', id.studentID, id.teacherID, id.courseID, id.chosenYear, callback);
        } else {
            console.error("Unexpected data type: " + dataType);
            callback(undefined, undefined);
        }
    }

    static getDataByTypeAndObject(dataType, dataObject, callback) { //this method is deprecated.
        if (dataType === "student") {
            let whereClause = 'WHERE';
            if (dataObject.studentID !== "") {
                whereClause += ' studentID = "' + dataObject.studentID + '" AND';
            }
            if (dataObject.name !== "") {
                whereClause += ' name = "' + dataObject.name + '" AND';
            }
            if (dataObject.sex !== "") {
                whereClause += ' sex = "' + dataObject.sex + '" AND';
            }
            if (dataObject.entranceAge !== "") {
                whereClause += ' entranceAge = "' + dataObject.entranceAge + '" AND';
            }
            if (dataObject.entranceYear !== "") {
                whereClause += ' entranceYear = "' + dataObject.entranceYear + '" AND';
            }
            if (dataObject.major !== "") {
                whereClause += ' major = "' + dataObject.major + '" AND';
            }
            if (whereClause === 'WHERE') {
                db.all('SELECT * FROM student', callback);
            } else {
                whereClause = whereClause.slice(0, -3); //cut off the last 'AND' substring
                console.log("WHERE Clause: " + whereClause);
                db.all('SELECT * FROM student ' + whereClause, callback);
            }
        } else {
            console.error("Unexpected data type: " + dataType);
            callback(undefined, undefined);
        }
    }

    static getDataByReqBody(body, callback) {
        let whereClause = 'WHERE';
        // constructing SQL where-clause by checking query type
        if (body.queryType === "student") {
            if (body.sID !== "") {
                whereClause += ' studentID = "' + body.sID + '" AND';
            }
            if (body.sName !== "") {
                whereClause += ' name = "' + body.sName + '" AND';
            }
            if (body.sSex !== "") {
                whereClause += ' sex = "' + body.sSex + '" AND';
            }
            if (body.sEnAge !== "") {
                whereClause += ' entranceAge = "' + body.sEnAge + '" AND';
            }
            if (body.sEnYear !== "") {
                whereClause += ' entranceYear = "' + body.sEnYear + '" AND';
            }
            if (body.sMajor !== "") {
                whereClause += ' major = "' + body.sMajor + '" AND';
            }
            if (whereClause === 'WHERE') {
                db.all('SELECT * FROM student', callback);
            } else {
                whereClause = whereClause.slice(0, -3); //cut off the last 'AND' substring
                console.log("WHERE Clause: " + whereClause);
                db.all('SELECT * FROM student ' + whereClause, callback);
            }
        } else if (body.queryType === "teacher") {
            if (body.tID !== "") {
                whereClause += ' teacher.teacherID = "' + body.tID + '" AND';
            }
            if (body.tName !== "") {
                whereClause += ' teacher.name = "' + body.tName + '" AND';
            }
            if (body.tSex !== "") {
                whereClause += ' teacher.sex = "' + body.tSex + '" AND';
            }
            if (body.tCourse !== "") {
                whereClause += ' course.name = "' + body.tCourse + '" AND';
            }
            if (whereClause === 'WHERE') {
                db.all('SELECT teacher.*, course.name AS cName FROM teacher, course WHERE teacher.teacherID = course.teacherID', callback);
            } else {
                //whereClause = whereClause.slice(0, -3); //cut off the last 'AND' substring
                whereClause += ' teacher.teacherID = course.teacherID';
                console.log("WHERE Clause: " + whereClause);
                db.all('SELECT teacher.*, course.name as cName FROM teacher, course ' + whereClause, callback);
            }
        } else if (body.queryType === "course") {
            if (body.cID !== "") {
                whereClause += ' courseID = "' + body.cID + '" AND';
            }
            if (body.cName !== "") {
                whereClause += ' name = "' + body.cName + '" AND';
            }
            if (body.cTID !== "") {
                whereClause += ' teacherID = "' + body.cTID + '" AND';
            }
            if (body.cCredit !== "") {
                whereClause += ' credit = "' + body.cCredit + '" AND';
            }
            if (body.cGrade !== "") {
                whereClause += ' grade = "' + body.cGrade + '" AND';
            }
            if (body.cCanYear !== "") {
                whereClause += ' canceledYear = "' + body.cCanYear + '" AND';
            }
            if (whereClause === 'WHERE') {
                db.all('SELECT * FROM course', callback);
            } else {
                whereClause = whereClause.slice(0, -3); //cut off the last 'AND' substring
                console.log("WHERE Clause: " + whereClause);
                db.all('SELECT * FROM course ' + whereClause, callback);
            }
        } else if (body.queryType === "cc-info") {
            if (body.cciSID !== "") {
                whereClause += ' studentID = "' + body.cciSID + '" AND';
            }
            if (body.cciCID !== "") {
                whereClause += ' courseID = "' + body.cciCID + '" AND';
            }
            if (body.cciTID !== "") {
                whereClause += ' teacherID = "' + body.cciTID + '" AND';
            }
            if (body.cciChoYear !== "") {
                whereClause += ' chosenYear = "' + body.cciChoYear + '" AND';
            }
            if (body.cciScore !== "") {
                whereClause += ' score = "' + body.cciScore + '" AND';
            }
            if (whereClause === 'WHERE') {
                db.all('SELECT * FROM cc_info', callback);
            } else {
                whereClause = whereClause.slice(0, -3); //cut off the last 'AND' substring
                console.log("WHERE Clause: " + whereClause);
                db.all('SELECT * FROM cc_info ' + whereClause, callback);
            }
        } else if (body.queryType === "statistic") {
            if (body.staSID !== "") {
                db.get('SELECT avg(score) AS avgScore FROM cc_info WHERE studentID = "' + body.staSID + '"', callback);
            } else if (body.staCID !== "") {
                db.get('SELECT avg(score) AS avgScore FROM cc_info WHERE courseID = "' + body.staCID + '"', callback);
            } else if (body.staMajor !== "") {
                db.get('SELECT avg(cc_info.score) AS avgScore FROM cc_info, student WHERE student.studentID = cc_info.studentID ' +
                    'AND student.major = "' + body.staMajor + '"', callback);
            } else {
                db.get('SELECT avg(score) AS avgScore FROM cc_info', callback);
            }
        } else {
            console.error("Unexpected data type: " + body.dataType);
            callback(undefined, undefined);
        }
    }
}

module.exports.db = db;
module.exports.Data = Data;