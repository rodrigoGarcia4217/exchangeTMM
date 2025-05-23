$(document).ready( function() {
	if($("#changePassword").val() == "true") {
		$("#createPassword2").css('display', 'flex');
	} else {
		$("#createPassword2").css('display', 'none');
	}
	initComponents(); 
});

const initComponents = () => {
	$("#newPasswordForm").submit(function() {
		if(verifyPassword() == true) {
			$.ajax({
    			type: "POST",
	    		url: "system/userManagement/updatePassword",
    			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
	    		data: {idUser : $("#globalUserId").val(),
					encrytedPassword : $("#newPassword").val(),
					operation : "UPDATE"},
    			success: function(response) {
    				manageResponse(response);
					/*if(response.success == true) {
						$("#createPassword2").css('display', 'none');
					}*/
    			},
    			error: function(response) {
	    			manageErrorAjax(response);
    			}
    		});
		} else {
			$("#newPassword").val("");
			$("#newPasswordConfirm").val("");
		}
		return false;
	});
}


const verifyPassword = () => {
	if($("#newPassword").val() != $("#newPasswordConfirm").val()) {
		showAlert(2, warningTitle, "Las contraseñas deben ser iguales", "");
		return false;
	} /**else if($("#newPassword").val().length < 8) {
		showAlert(2, warningTitle, "La contraseña debe tener al menos 8 caracteres", "");
		return false;
	} else if($("#newPassword").val().search(/[a-z]/) < 0) {
		showAlert(2, warningTitle, "La contraseña debe tener al menos una minúscula", "");
		return false;
	} else if($("#newPassword").val().search(/[A-Z]/) < 0) {
		showAlert(2, warningTitle, "La contraseña debe tener al menos una mayúscula", "");
		return false;
	} else if($("#newPassword").val().search(/[0-9]/) < 0) {
		showAlert(2, warningTitle, "La contraseña debe tener al menos un número", "");
		return false;
	} else if($("#newPassword").val().search(/[!@#$%^&*.?]/) < 0) {
		showAlert(2, warningTitle, "La contraseña debe tener al menos un caractér especial", "");
		return false;
	} /**/else {
		return true;
	} 
}