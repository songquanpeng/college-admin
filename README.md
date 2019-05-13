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
    password
}

Teacher {
    teacherID
    name
    courses
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
}
```
## Ejs Template
#### basic
+ [ ] header
+ [ ] navigation-bar
+ [ ] footer
+ [ ] login-dialog
+ [ ] user-register
+ [ ] query
+ [ ] about
+ [ ] index
#### student
+ [ ] student-table
+ [ ] student-detail
+ [ ] student-edit-dialog
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
### POST
```
login {
    userID : str
    password : str
    userType : str {student, teacher, admin}
}

query/student {
    Student
}

query/course {
    Course
}

query/teacher {
    Teacher
}

query/cc-info {
    CourseChoosingInformation
}

update/student {
    {
        studentID
    }
    OR
    {
        major
        courseID
    }
}

update/course {
    Course
}

update/teacher {
    Teacher
}

update/cc-info {
    CourseChoosingInformation
}

insert/student {
    Student
}

insert/course {
    Course
}

insert/teacher {
    Teacher
}

insert/cc-info {
    CourseChoosingInformation
}

statistics/students {
    Student
}
```
### DELETE
```
student {
    studentID
}

course {
    courseID
}

teacher {
    teacherID
}

cc-info {
    studentID
    courseID
    teacherID
    chosenYear
}
```

## Model
```javascript
class User{
    static checkCredential(id, password, userType, callback){callback(error, valid)};
    static updatePassword(id, userType, newPassword, callback){callback(error)};
}

```