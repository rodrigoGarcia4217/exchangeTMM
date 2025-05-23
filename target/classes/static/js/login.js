$(document).ready( function() {
	$("#resetPassword").css('display', 'none');
	initComponents(); 
});

const openResetModal = () => {
	$("#resetPassword").css('display', 'flex');
}

const initComponents = () => {
	$("#resetPassword").submit(function() {
		$.ajax({
    			type: "POST",
	    		url: "resetPassword",
    			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
	    		data: {email : $("#email").val(),},
    			success: function(response) {
					console.log(response)
					if(response.success) {
						alert("Su contraseña se ha reestablecido, favor de revisar su correo")
						location.reload();	
					} else {
						alert("No ha sido posible reestablecer su contraseña")
						location.reload();
					}
    			},
    			error: function(response) {
	    			alert("No es posible procesar su peteición ")
					location.reload();
    			}
    		});
		return false;
	})
}