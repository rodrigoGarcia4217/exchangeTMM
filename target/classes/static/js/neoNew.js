let successTitle = "Proceso Exitoso"
let failureTitle = "Ocurrió un Error"
let warningTitle = "Advertencia"
let confirmTitle = "Requerimos Confirmación"
let emptyString = ""

$(document)
		.ajaxStart(() => $('#loading').css('display', 'flex'))
		.ajaxStop(() => $('#loading').css('display', 'none'));
		
$(document).ready(() => $('#loading').css('display', 'none'));

function manageResponse(response) {
	if(response.success) {
		switch(response.operation){
			case 'INSERT': showAlert(1, successTitle, response.message, emptyString);
				break;
			case 'UPDATE': showAlert(1, successTitle, response.message, emptyString);
				break;
			case 'DELETE': showAlert(1, successTitle, response.message, emptyString);
				break;
			case 'TICKET': showAlert(1, "TICKET CREADO", "Su solicitud ha sido recibida satisfactoriamente", "en breve recibirá un correo con los detalles de su solicitud");
				break;
			case 'MAIL': showAlert(1, successTitle, "notificaciones enviadas por correo satisfactoriamente", "La notificacion fue enviada con éxito");
				break;
		}
	} else {
		switch(response.operation){
			case 'INSERT': showAlert(3, failureTitle + " " + response.errorCode, "No se pudo crear el registro", response.message)
				break;
			case 'UPDATE': showAlert(3, failureTitle + " " + response.errorCode, "No se ha podido modificar el registro", response.message)
				break;
			case 'DELETE': showAlert(3, failureTitle + " " + response.errorCode, "No se pudo eliminar el registro", response.message)
				break;
			case 'TICKET': showAlert(3, failureTitle + " " + response.errorCode, "No ha sido posible procesar su solicitud de servico", response.message);
				break;
			case 'MAIL': showAlert(3, failureTitle + " " + response.errorCode, "No ha sido posible procesar el correo", response.message);
				break;
			case 'text/xml': showAlert(3, failureTitle + " " + response.errorCode, "No ha sido posible leer el(los) archivo(s) .xml", response.message);
				break;
		}
		
	}
}

function showAlert(alertType, title, message, logging) {
	switch(alertType) {
		case 1:	
			$('#successPopup').find('.popup-center > h4').text(title).end();
			$('#successPopup').find('.popup-center > b').text(message).end();
			$('#successPopup').find('.popup-center > p').text(logging).end();
			$('#successPopup').css("display", "flex");
			setTimeout(() => {
				$('#successPopup').css("display", "none")		
				location.reload();
			}, 1500 );
		break;
		case 2: 
			$('#warningPopup').find('.popup-center > h4').text(title).end();
			$('#warningPopup').find('.popup-center > b').text(message).end();
			$('#warningPopup').find('.popup-center > p').text(logging).end();
			$('#warningPopup').css("display", "flex");
			setTimeout(() => $('#successPopup').css("display", "none"), 2000 )
		break;
		case 3: 
			$('#errorPopup').find('.popup-center > h4').text(title).end();
			$('#errorPopup').find('.popup-center > b').text(message).end();
			$('#errorPopup').find('.popup-center > p').text(logging).end();
			$('#errorPopup').css("display", "flex");
			setTimeout(() => $('#successPopup').css("display", "none"), 2000 )
		break;
		case 4:
			$('#confirmPopup').find('.popup-center > h4').text(title).end();
			$('#confirmPopup').find('.popup-center > b').text(message).end();
			$('#confirmPopup').find('.popup-center > p').text(logging).end();
			$('#confirmPopup').css("display", "flex");
			setTimeout(() => $('#successPopup').css("display", "none"), 2000 )
		break;
	}
}

const clearCombo = (combo) => {
	for(var i = combo.options.length - 1; i >= 0 ; i--) {
		combo.removeChild(combo.options[i]);
	}
}

const fillCombo = (combo,data) => {
	data.forEach((element) => {
		var option = document.createElement('option');
		option.appendChild(document.createTextNode(element.description.toString()));
		option.value = element.id;
		combo.appendChild(option);
	})
}

const parseDateFromTimestamp = (timestamp) => {
	date = new Date(timestamp);
	return String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear();
}

const parseTimeFromTimestamp = (timestamp) => {
	date = new Date(timestamp);
	return date.getHours() + ":" + String(date.getMinutes()).padStart(2,'0') + ":" + String(date.getSeconds()).padStart(2,'0');
}