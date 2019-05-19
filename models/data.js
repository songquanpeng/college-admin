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
    }

    static insertNewData(dataType, data, callback) {
        //console.log(data);
        if (dataType === "student") {
            db.run('INSERT INTO student (studentID, name, sex, entranceAge, entranceYear, major, password) VALUES (?, ?, ?, ?, ?, ?, ?)', data.studentID, data.name, data.sex, data.entranceAge, data.entranceYear, data.major, '123456', callback);
        } else if (dataType === "course") {
            db.run('INSERT INTO course (courseID, name, teacherID, credit, grade, canceledYear) VALUES (?, ?, ?, ?, ?, ?)', data.courseID, data.name, data.teacherID, data.credit, data.grade, data.canceledYear, callback);
        } else if (dataType === "admin") {
            db.run('INSERT INTO admin (adminID, password, name) VALUES (?, ?, ?)', data.adminID, '123456', data.name, callback);
        } else if (dataType === "teacher") {
            db.run('INSERT INTO teacher (teacherID, name, sex, password) VALUES (?, ?, ?, ?)', data.teacherID, data.name, data.sex, '123456', callback);
        } else if (dataType === "cc-info") {
            db.run('INSERT INTO cc_info (studentID, courseID, teacherID, chosenYear, score) VALUES (?, ?, ?, ?, ?)', data.studentID, data.courseID, data.teacherID, data.chosenYear, data.score, callback);
        } else {
            console.error("Unexpected data type: " + dataType);
            callback(new Error("Unexpected data type: " + dataType), undefined);
        }
    }

    static getDataByTypeAndID(dataType, id, callback) {
        if (dataType === "student") {
            db.get('SELECT * FROM student WHERE studentID = ?', id, callback);
        } else if (dataType === "admin") {
            db.get('SELECT * FROM admin WHERE adminID = ?', id, callback);
        } else if (dataType === "teacher") {
            db.get('SELECT * FROM teacher WHERE teacherID = ?', id, callback);
        } else if (dataType === "course") {
            db.get('SELECT * FROM course WHERE courseID = ?', id, callback);
        } else if (dataType === "cc-info") {
            let nid = JSON.parse(id);
            db.get('SELECT * FROM cc_info WHERE studentID = ? AND teacherID = ? AND courseID = ? AND chosenYear = ?', nid.studentID, nid.teacherID, nid.courseID, nid.chosenYear, callback);
        } else {
            console.error("Unexpected data type: " + dataType);
            callback(new Error("Unexpected data type:"  + dataType), undefined);
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
                //console.log("WHERE Clause: " + whereClause);
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
                //console.log("WHERE Clause: " + whereClause);
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
                //console.log("WHERE Clause: " + whereClause);
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
                //console.log("WHERE Clause: " + whereClause);
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
            callback(new Error("Unexpected data type:"  + body.dataType), undefined);
        }
    }

    static updateDataByTypeAndReqBody(queryType , body, callback){
        let setClause = "SET";
        if (queryType === "student"){
            // constructing SQL set-clause
            if (body.sID !== ""){
                setClause += ' studentID = "' + body.sID + '",';
            }
            if (body.sName !== ""){
                setClause += ' name = "' + body.sName + '",';
            }
            if (body.sSex !== ""){
                setClause += ' sex = "' + body.sSex + '",';
            }
            if (body.sEnAge !== ""){
                setClause += ' entranceAge = "' + body.sEnAge + '",';
            }
            if (body.sEnYear !== ""){
                setClause += ' entranceYear = "' + body.sEnYear +'",';
            }
            if (body.sMajor !== ""){
                setClause += ' major = "' + body.sMajor +'",';
            }
            if (setClause === "SET"){
                console.error("Empty update request");
                callback(new Error("ERROR: Empty update request"), undefined);
            } else {
                setClause = setClause.slice(0, -1); //delete the last ','
                db.run('UPDATE student ' + setClause + ' WHERE studentID = "' + body.sOID + '"', callback);
            }
        } else if (queryType === "teacher"){
            // constructing SQL set-clause
            let updateCourse = false;
            if (body.tID !== ""){
                setClause += ' teacherID = "' + body.tID + '",';
            }
            if (body.tName !== ""){
                setClause += ' name = "' + body.tName + '",';
            }
            if (body.tSex !== ""){
                setClause += ' sex = "' + body.tSex + '",';
            }
            if (body.tCourse !== ""){
                updateCourse = true;
            }
            if (setClause === 'SET' && body.tCourse === ""){
                console.error("Empty update request");
                callback(new Error("ERROR: Empty update request"), undefined);
            } else {
                let sql2 = 'UPDATE course SET name = "' + body.tCourse + '" WHERE teacherID = "' + body.tOID +'" AND' +
                    ' name = "' + body.tOCourse + '"';
                if (body.tID !== ""){
                    sql2 = 'UPDATE course SET name = "' + body.tCourse + '", teacherID = "' + body.tID + '" WHERE teacherID = "' + body.tOID +'" AND' +
                        ' name = "' + body.tOCourse + '"';
                }
                if (setClause === 'SET') {
                    db.run(sql2, callback);
                } else {
                    setClause = setClause.slice(0, -1); //delete the last ','
                    let sql1 = 'UPDATE teacher ' + setClause + ' WHERE teacherID = "' + body.tOID + '"';
                    if (updateCourse){
                        db.exec(sql2 + ';' + sql1, callback);
                    } else {
                        db.run(sql1, callback);
                    }
                }
            }
        } else if (queryType === "course"){
            // constructing SQL set-clause
            if (body.cID !== ""){
                setClause += ' courseID = "' + body.cID + '",';
            }
            if (body.cName !== ""){
                setClause += ' name = "' + body.cName + '",';
            }
            if (body.cTID !== ""){
                setClause += ' teacherID = "' + body.cTID + '",';
            }
            if (body.cCredit !== ""){
                setClause += ' credit = ' + body.cCredit + ',';
            }
            if (body.cGrade !== ""){
                setClause += ' grade = ' + body.cGrade + ',';
            }
            if (body.cCanYear !== ""){
                setClause += ' canceledYear = ' + body.cCanYear +',';
            }
            if (setClause === "SET"){
                console.error("Empty update request");
                callback(new Error("ERROR: Empty update request"), undefined);
            } else {
                setClause = setClause.slice(0, -1); //delete the last ','
                db.run('UPDATE course ' + setClause + ' WHERE courseID = "' + body.cOID + '"', callback);
            }
        } else if (queryType === "cc-info"){
            // constructing SQL set-clause
            if (body.cciSID !== ""){
                setClause += ' studentID = "' + body.cciSID + '",';
            }
            if (body.cciCID !== ""){
                setClause += ' courseID = "' + body.cciCID + '",';
            }
            if (body.cciTID !== ""){
                setClause += ' teacherID = "' + body.cciTID + '",';
            }
            if (body.cciChoYear !== ""){
                setClause += ' chosenYear = ' + body.cciChoYear + ',';
            }
            if (body.cciScore !== ""){
                setClause += ' score = ' + body.cciScore +',';
            }
            if (setClause === "SET"){
                console.error("Empty update request");
                callback(new Error("ERROR: Empty update request"), undefined);
            } else {
                setClause = setClause.slice(0, -1); //delete the last ','
                let whereClause = 'WHERE';
                whereClause += ' studentID = "' + body.cciOSID + '" AND';
                whereClause += ' courseID = "' + body.cciOCID + '" AND';
                whereClause += ' teacherID = "' + body.cciOTID + '" AND';
                whereClause += ' chosenYear = "' + body.cciOChoYear + '"';
                db.run('UPDATE cc_info ' + setClause + whereClause, callback);
            }
        }
    }

    static  deleteDataByTypeAndReqBody(queryType, body, callback){
        if (queryType === "student"){
            //due to using on delete event in database structure, no longer need to delete foreign key constraint now.
            //let sql1= 'DELETE FROM cc_info WHERE studentID = "' + body.sDID + '"; '; //deleting foreign key constraint
            let sql2 = 'DELETE FROM student WHERE studentID = "' + body.sDID + '"';
            db.exec(sql2, callback);
        } else if (queryType === "teacher"){
            //let sql1= 'DELETE FROM cc_info WHERE teacherID = "' + body.tDID + '"; '; //deleting foreign key constraint
            //let sql2 = 'DELETE FROM course WHERE teacherID = "' + body.tDID + '"; '; //deleting foreign key constraint
            let sql3 = 'DELETE FROM teacher WHERE teacherID = "' + body.tDID + '"';
            db.exec(sql3, callback);
        } else if (queryType === "course"){
            //let sql1 = 'DELETE FROM cc_info WHERE courseID = "' + body.cDID + '"; '; //deleting foreign key constraint
            let sql2 = 'DELETE FROM course WHERE courseID = "' + body.cDID + '"';
            db.exec(sql2, callback);
        } else if (queryType === "cc-info"){
            let whereClause = 'WHERE';
            whereClause += ' studentID = "' + body.cciDelSID + '" AND';
            whereClause += ' courseID = "' + body.cciDelCID + '" AND';
            whereClause += ' teacherID = "' + body.cciDelTID + '" AND';
            whereClause += ' chosenYear = "' + body.cciDelChoYear + '"';
            db.run('DELETE FROM cc_info ' + whereClause, callback);
        }
    }
}

module.exports.db = db;
module.exports.Data = Data;