const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

db.serialize(function () {
    const createStudentTable = 'create table if not exists student(studentID varchar(10),name varchar(20),sex varchar(10),entranceAge smallint,entranceYear smallint,major varchar(50),password varchar(12),primary key(studentID));\n';
    db.run(createStudentTable);
    const createTeacherTable = 'create table if not exists teacher(teacherID varchar(10),name varchar(20),sex varchar(10),password varchar(12),primary key (teacherID));\n';
    db.run(createTeacherTable);
    const createCourseTable = 'create table if not exists course(courseID varchar(10),name varchar(20),teacherID varchar(10),credit numeric(3,1),grade smallint,canceledYear smallint,primary key (courseID),foreign key (teacherID) references teacher);\n';
    db.run(createCourseTable);
    const createCCInfoTable = 'create table if not exists cc_info(studentID varchar(10),courseID varchar(10),teacherID varchar(10),chosenYear smallint,score smallint,primary key (studentID, courseID, teacherID, chosenYear),foreign key (studentID) references student,foreign key (courseID) references course,foreign key (teacherID) references teacher);\n';
    db.run(createCCInfoTable);
    const createAdminTable = 'create table if not exists admin(adminID varchar(10),password varchar(12),name varchar(20),primary key (adminID));';
    db.run(createAdminTable);
    const createSystemLogTable = 'create table if not exists system_log(logID integer, time varchar(30), userType varchar(10), userID varchar(10), ip varchar(20), primary key (logID));';
    db.run(createSystemLogTable);
    console.log("Database initialization completed.");
});