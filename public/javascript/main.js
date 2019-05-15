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
    $('#sOID').attr({"value":originSID});
    $('#studentEditDialog').modal('show');
}
function showStudentDeleteDialog(deleteSID) {
    // set value the deleting student ID of the delete dialog
    $('#sDID').attr({"value":deleteSID});
    $('#studentDeleteDialog').modal('show');
}

function showTeacherEditDialog(originTID) {
    $('#tOID').attr({"value":originTID});
    $('#teacherEditDialog').modal('show');
}
function showTeacherDeleteDialog(deleteTID) {
    $('#tDID').attr({"value":deleteTID});
    $('#teacherDeleteDialog').modal('show');
}

function showCourseEditDialog(originCID) {
    $('#cOID').attr({"value":originCID});
    $('#courseEditDialog').modal('show');
}
function showCourseDeleteDialog(deleteCID) {
    $('#cDID').attr({"value":deleteCID});
    $('#courseDeleteDialog').modal('show');
}

function showCciEditDialog(originSID, originCID, originTID, originChosenYear) {
    $('#cciOSID').attr({"value":originSID});
    $('#cciOCID').attr({"value":originCID});
    $('#cciOTID').attr({"value":originTID});
    $('#cciOChoYear').attr({"value":originChosenYear});
    $('#cciEditDialog').modal('show');
}
function showCciDeleteDialog(deleteSID, deleteCID, deleteTID, deleteChosenYear) {
    $('#cciDelSID').attr({"value":deleteSID});
    $('#cciDelCID').attr({"value":deleteCID});
    $('#cciDelTID').attr({"value":deleteTID});
    $('#cciDelChoYear').attr({"value":deleteChosenYear});
    $('#cciDeleteDialog').modal('show');
}