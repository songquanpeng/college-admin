function hideModifyBtn(userType) {
    if (userType === "student"){
        let elements = document.getElementsByClassName("modify");
        for (let i=0; i<elements.length; i++){
            elements[i].hidden = true;
        }
    }
}

function showStudentEditDialog(originSID) {
    // set value the original student ID of the edit dialog
    $('#sOID').prop({"value":originSID});
    $('#studentEditDialog').modal('show');
}
function showStudentDeleteDialog(deleteSID) {
    // set value the deleting student ID of the delete dialog
    $('#sDID').prop({"value":deleteSID});
    $('#studentDeleteDialog').modal('show');
}

function showTeacherEditDialog(originTID, originCName) {
    $('#tOID').prop({"value":originTID});
    $('#tOCourse').prop({"value":originCName});
    $('#teacherEditDialog').modal('show');
}
function showTeacherDeleteDialog(deleteTID) {
    $('#tDID').prop({"value":deleteTID});
    $('#teacherDeleteDialog').modal('show');
}

function showCourseEditDialog(originCID) {
    $('#cOID').prop({"value":originCID});
    $('#courseEditDialog').modal('show');
}
function showCourseDeleteDialog(deleteCID) {
    $('#cDID').prop({"value":deleteCID});
    $('#courseDeleteDialog').modal('show');
}

function showCciEditDialog(originSID, originCID, originTID, originChosenYear) {
    $('#cciOSID').prop({"value":originSID});
    $('#cciOCID').prop({"value":originCID});
    $('#cciOTID').prop({"value":originTID});
    $('#cciOChoYear').prop({"value":originChosenYear});
    $('#cciEditDialog').modal('show');
}

function showCciDeleteDialog(deleteSID, deleteCID, deleteTID, deleteChosenYear) {
    $('#cciDelSID').prop({"value":deleteSID});
    $('#cciDelCID').prop({"value":deleteCID});
    $('#cciDelTID').prop({"value":deleteTID});
    $('#cciDelChoYear').prop({"value":deleteChosenYear});
    $('#cciDeleteDialog').modal('show');
}

function controlInsertForm(id) {
    $("#insert-student-form").css("display","none");
    $("#insert-teacher-form").css("display","none");
    $("#insert-course-form").css("display","none");
    $("#insert-cc-info-form").css("display","none");
    $("#"+id).css("display","block");
}