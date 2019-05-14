## Description
**This is an awesome MIS (Manage Information System) for college.** 

## Feature
+ [ ] Query, add, delete and modify data
+ [ ] Sign up, log in and log out
+ [ ] Get statistical data
+ [ ] Permission control
+ [ ] User management
+ [ ] Information collection
+ [ ] Message system

## Ejs Template
#### basic
+ [x] header ->Song
+ [x] navigation-bar ->Song
+ [x] footer ->Song
+ [ ] login-dialog ->Song
+ [ ] query ->Lee
+ [ ] about ->Song
+ [ ] index ->Song
+ [ ] insert ->Song
+ [ ] statistic ->Lee
+ [ ] message ->Song
+ [ ] error ->Song
+ [ ] 404 ->Song
#### student
+ [ ] student-table  ->Lee
+ [ ] student-detail ->Song
+ [ ] student-edit-dialog -> Lee
#### teacher
+ [ ] teacher-table
+ [ ] teacher-detail
+ [ ] teacher-edit-dialog
#### course
+ [ ] course-table
+ [ ] course-detail
+ [ ] course-edit-dialog
#### cc-info
+ [ ] cc-info-table
+ [ ] cc-info-detail
+ [ ] cc-info-edit-dialog
#### message
+ [ ] message-list
+ [ ] message-detail
+ [ ] message-edit
#### advanced
+ [ ] discuss-area
+ [ ] comment-area

## API
### GET
+ index
+ logout
+ query
+ about
+ user
### POST
```
login {
    userID : str
    password : str
    userType : str {student, teacher, admin}
}->Song

query/student {
    Student
}->Lee

query/course {
    Course
}->Lee

query/teacher {
    Teacher
}->Lee

query/cc-info {
    CourseChoosingInformation
}->Lee

update/student {
    studentID
    Student
}->Lee

update/course {
    courseID
    Course
}->Lee

update/teacher {
    teacherID
    Teacher
}->Lee

update/cc-info {
    studentID
    courseID
    teacherID
    chosenYear
    CourseChoosingInformation
}->Lee

insert/student {
    Student
}->Song

insert/course {
    Course
}->Song

insert/teacher {
    Teacher
}->Song

insert/cc-info {
    CourseChoosingInformation
}->Song

statistics/students {
    {
        studentID
    }
    OR
    {
        major
        courseID
    }
}->Lee
```
### DELETE
```
student {
    studentID
}->Lee

course {
    courseID
}->Lee

teacher {
    teacherID
}->Lee

cc-info {
    studentID
    courseID
    teacherID
    chosenYear
}->Lee
```

## Model
```javascript
class User{
    static checkCredential(id, password, userType, callback){callback(error, valid)};
    static updatePassword(id, userType, newPassword, callback){callback(error)};
} //->Song

```

## Data Model
```
Student {
    studentID
    name
    sex
    entranceAge
    entranceYear
    major
    password
}

Course {
    courseID
    name
    teacherID
    credit
    grade
    canceledYear
}

Teacher {
    teacherID
    name
    sex
    courses
    password
}

CourseChoosingInformation {
    studentID
    courseID
    teacherID
    chosenYear
    score
}

Admin {
    adminID
    password
    name
}
```
