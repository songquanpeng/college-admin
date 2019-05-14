function hideModifyBtn(isStudent) {
    if (isStudent){
        let elements = document.getElementsByClassName("modify");
        for (let i=0; i<elements.length; i++){
            elements[i].hidden = true;
        }
    }
}

function showEditDialog(originSID) {
    // set value the original student ID of the edit dialog
    $('#oSID').attr({"value":originSID});
    $('#editDialog').modal('show');
}

function showDeleteDialog(deleteSID) {
    // set value the deleting student ID of the delete dialog
    $('#delSID').attr({"value":deleteSID});
    $('#deleteDialog').modal('show');
}