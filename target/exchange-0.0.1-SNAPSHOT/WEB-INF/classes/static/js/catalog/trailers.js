$(document).ready(() => {
    configDataTable();
	initComponents();
});

const configDataTable = () => {
    $("#trailersTable").DataTable ({
        dom: `
            <'row table-header'<'col-sm-4 table-btn'B><'col-sm-4 table-search'f>>
            <'row'<'col-sm-20 table-content'tr>>
            <'row table-footer'<'col-sm-7 table-pag'p>>
        `,
        fixedHeader: true,
        responsive: true,
        autoWidth: true,
        ajax: {
            url: "trailers/getDataTable",
            type: 'GET',
            dataSrc: '',
            error: ( response ) => console.log("Error: " + response),
        },
        columns: [
		    {data: 'trailerStatus', render: (data) => `<p class="status${ data }"></p>` },
            {data: 'trailerId', visible: true },
			{data: 'trailerBrand', visible: true },
			{data: 'trailerLocalidad', visible: true },
			{data: 'trailerEco', visible: true },
			{data: 'trailerSerialNumber', visible: false },
			{data: 'trailerType', visible: true },
            {data: 'trailerId', render: (data) => `<button onclick="openDocumentsPopup('${ data }')"> Ver Documentación </button>` },
            {data: 'trailerId', render: (data) => `<button onclick="openEditPopup('${ data }')"> Editar Remolque </button>` },
            {data: 'trailerId', render: (data) => `<button onclick="openAditionalPopup('${ data }')"> Gastos Adicionales</button>` },
        ]
    })
};

const initComponents = () => {
    $("#createTrailerForm").submit( () => {
		var formData = new FormData();
		formData.append('trailerBrand', $("#createBrand").val());
		formData.append('trailerModel', $("#createModel").val());
		formData.append('trailerSerialNumber', $("#createSerialNumber").val());
		formData.append('trailerType', $("#createTrailerType").val());
		formData.append('trailerStatus', $("#createTrailerStatus").val());
		formData.append('trailerOwner', $("#trailerOwner").val());
	    formData.append('trailerEco', $("#createEco").val());
	    formData.append('trailerPlates', $("#createPlates").val());
		formData.append('trailerCompany', $("#createCompany").val());
		formData.append('trailerInsuranceId', $("#createInsuranceNumber").val());
		formData.append('trailerAseguradoraResponsable', $("#createCpAseguradoraResponsable").val());
		formData.append('trailerInsuranceSub', $("#createInsuranceSub").val());
		formData.append('trailerInsuranceEndo', $("#createInsuranceEndo").val());
		formData.append('trailerInsuranceStartDate', $("#createStartInsurance").val());
		formData.append('trailerInsuranceEndDate', $("#createEndInsurance").val());
		formData.append('trailerPermitNumber', $("#createPermitNumber").val());
		formData.append('trailerFBrand', $("#createFBrand").val());
		formData.append('trailerFEco', $("#createFEco").val());
		formData.append('trailerFPlates', $("#createFPlates").val());
		formData.append('trailerFModel', $("#createFModel").val());
		formData.append('trailerFSerialNumber', $("#createFSerialNumber").val());
		formData.append('trailerFInsuranceId', $("#createFInsuranceNumber").val());
		formData.append('trailerFAseguradoraResponsable', $("#createFCpAseguradoraResponsable").val());
		formData.append('trailerFInsuranceSub', $("#createFInsuranceSub").val());
		formData.append('trailerFInsuranceEndo', $("#createFInsuranceEndo").val());
		formData.append('trailerFInsuranceStartDate', $("#createFStartInsurance").val());
		formData.append('trailerFInsuranceEndDate', $("#createFEndInsurance").val());
		formData.append('trailerDBrand', $("#createDBrand").val());
		formData.append('trailerDEco', $("#createDEco").val());
		formData.append('trailerDPlates', $("#createFPlates").val());
		formData.append('trailerDModel', $("#createDModel").val());
		formData.append('trailerDSerialNumber', $("#createDSerialNumber").val());
		formData.append('trailerLocalidad', $("#createLocalidad").val());
		formData.append('idUser', $("#globalUserId").val());
        formData.append('userName', $("#globalUserName").val());
		formData.append('operation', "INSERT");
		
		$.ajax({
			type: "POST",
			url: "trailers/updateTrailer",
			cache : false, 
			contentType : false,
			processData : false,
			data : formData,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		}); 
		return false;
	});
	
	$("#editTrailerForm").submit( () => {
		var formData = new FormData();
		formData.append('trailerId', $("#editId").val());
		formData.append('trailerBrand', $("#editBrand").val());
		formData.append('trailerModel', $("#editModel").val());
		formData.append('trailerSerialNumber', $("#editSerialNumber").val());
		formData.append('trailerType', $("#editTrailerType").val());
		formData.append('trailerStatus', $("#editTrailerStatus").val());
		formData.append('trailerOwner', $("#editTrailerOwner").val());
		formData.append('trailerEco', $("#editEco").val());
	    formData.append('trailerPlates', $("#editPlates").val());
		formData.append('trailerCompany', $("#editCompany").val());
		formData.append('trailerInsuranceId', $("#editInsuranceNumber").val());
		formData.append('trailerAseguradoraResponsable', $("#editCpAseguradoraResponsable").val());
		formData.append('trailerInsuranceSub', $("#editInsuranceSub").val());
		formData.append('trailerInsuranceEndo', $("#editInsuranceEndo").val());
		formData.append('trailerInsuranceStartDate', $("#editStartInsurance").val());
		formData.append('trailerInsuranceEndDate', $("#editEndInsurance").val());
		formData.append('trailerPermitNumber', $("#editPermitNumber").val());
		formData.append('trailerFBrand', $("#editFBrand").val());
		formData.append('trailerFEco', $("#editFEco").val());
		formData.append('trailerFPlates', $("#editFPlates").val());
		formData.append('trailerFModel', $("#editFModel").val());
		formData.append('trailerFSerialNumber', $("#editFSerialNumber").val());
		formData.append('trailerFInsuranceId', $("#editFInsuranceNumber").val());
		formData.append('trailerFAseguradoraResponsable', $("#editFCpAseguradoraResponsable").val());
		formData.append('trailerFInsuranceSub', $("#editFInsuranceSub").val());
		formData.append('trailerFInsuranceEndo', $("#editFInsuranceEndo").val());
		formData.append('trailerFInsuranceStartDate', $("#editFStartInsurance").val());
		formData.append('trailerFInsuranceEndDate', $("#editFEndInsurance").val());
		formData.append('trailerDBrand', $("#editDBrand").val());
		formData.append('trailerDEco', $("#editDEco").val());
		formData.append('trailerDPlates', $("#editFPlates").val());
		formData.append('trailerDModel', $("#editDModel").val());
		formData.append('trailerDSerialNumber', $("#editDSerialNumber").val());
		formData.append('trailerLocalidad', $("#editLocalidad").val());
		
			formData.append('idUser', $("#globalUserId").val());
        formData.append('userName', $("#globalUserName").val());
		formData.append('operation', "UPDATE");
		 
		$.ajax({
			type: "POST",
			url: "trailers/updateTrailer",
			cache : false, 
			contentType : false,
			processData : false,
			data : formData,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		});
		return false;
	});
	
	$("#createFormAdd").submit( () => {
		data = {
			trailerId : $("#editAdd").val(),
    		addConcept : $("#addConcept").val(),
    		addDescription : $("#addDescription").val(),
    		addDate : $("#addDate").val(),
    		addCost : $("#addCost").val(),
    		addVigen : $("#addVigen").val(),
    		addStatus : $("#addStatus").val(),
    		addDays:$("#addDays").val(),
    		addTotal:$("#addTotal").val(),
			operation: "INSERT",
		}
		console.log(data)
		
		$.ajax({
			type: "POST",
			url: "trailers/createDetailAditional",
			cache : false, 
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : data,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		}); 
		return false;
	});
	
	$("#editFormAdd").submit( () => {
		data = {
			trailerAditionalId : $("#editAditional").val(),
    		addConcept : $("#editAddConcept").val(),
    		addDescription : $("#editAddDescription").val(),
    		addDate : $("#editAddDate").val(),
    		addCost : $("#editAddCost").val(),
    		addVigen : $("#editAddVigen").val(),
    		addStatus : $("#editAddStatus").val(),
    		addDays:$("#editAddDays").val(),
    		addTotal:$("#editAddTotal").val(),
			operation: "UPDATE",
		}
		console.log(data)
		
		$.ajax({
			type: "POST",
			url: "trailers/createDetailAditional",
			cache : false, 
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : data,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		}); 
		return false;
	});
	
	$("#updloadFile").change( () => {
		var formData = new FormData();
		formData.append('evicenceChecklist', $("#checklistId").val());
		formData.append('evidenceFile', $("#updloadFile").prop('files')[0]);
				formData.append('idUser', $("#globalUserId").val());
        formData.append('userName', $("#globalUserName").val());
		formData.append('operation', "INSERT");
		formData.append('evidenceTrailerId', $("#trailerIdFile").val());
		
		$.ajax({
			type : "POST",
			url : 'trailers/addEvidenceFile',
			cache : false, 
			contentType : false,
			processData : false,
			data : formData,
			success : function(response) {
				manageResponse(response);
			},
			error : function() {
				showAlert(3,"ERRO 902", "El documento no puede cargarse", "Intente nuevamente o contacte al equipo de desarrollo");
			}
		});
	})
};

/** MODAL EDIT TRAILER */
const openEditPopup = (id) => {
    $("#editTrailer").css('display', 'flex')
	$("#editId").val(id);
	$.ajax({
		type: "GET",
		url: "trailers/getSingle",
		data: {
			trailerId : id,
		},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success: ( response ) => {
			$("#editBrand").val(response.trailerBrand);
			$("#editModel").val(response.trailerModel);
			$("#editSerialNumber").val(response.trailerSerialNumber);
			$("#editTrailerType").val(response.trailerType);
			$("#editTrailerStatus").val(response.trailerStatus);
			$("#editTrailerOwner").val(response.trailerOwner);
			$("#editCompany").val(response.trailerCompany)
			$("#editInsuranceNumber").val(response.trailerInsuranceId);
			$("#editCpAseguradoraResponsable").val(response.trailerAseguradoraResponsable);
			$("#editInsuranceSub").val(response.trailerInsuranceSub);
	        $("#editInsuranceEndo").val(response.trailerInsuranceEndo);
			$("#editStartInsurance").val(response.trailerInsuranceStartDate);
			$("#editEndInsurance").val(response.trailerInsuranceEndDate);
			$("#editPermitNumber").val(response.trailerPermitNumber);
			$("#editEco").val(response.trailerEco);
			$("#editPlates").val(response.trailerPlates);
			$("#editFBrand").val(response.trailerFBrand);
		    $("#editFEco").val(response.trailerFEco);
			$("#editFPlates").val(response.trailerFPlates);
			$("#editFModel").val(response.trailerFModel);
			$("#editFSerialNumber").val(response.trailerFSerialNumber);
			$("#editFInsuranceNumber").val(response.trailerFInsuranceId);
			$("#editFCpAseguradoraResponsable").val(response.trailerFAseguradoraResponsable);
			$("#editFInsuranceSub").val(response.trailerFInsuranceSub);
			$("#editFInsuranceEndo").val(response.trailerFInsuranceEndo);
			$("#editFStartInsurance").val(response.trailerFInsuranceStartDate);
			$("#editFEndInsurance").val(response.trailerFInsuranceEndDate)
			$("#editDBrand").val(response.trailerDBrand);
			$("#editDEco").val(response.trailerDEco);
			$("#editFPlates").val(response.trailerDPlates);
			$("#editDModel").val(response.trailerDModel);
			$("#editDSerialNumber").val(response.trailerDSerialNumber);
			$("#editLocalidad").val(response.trailerLocalidad);
		},
		error: ( response ) => console.log("Error: " + response),
    });
}
// Dynamic View Edit General
$("#editGeneral").on('click', () => {
    deactivateViews()
    $("#editGeneral").addClass('active')
    $('.general').css('display', 'flex')
})

// Dynamic View Edit Insurance
$("#editInsurance").on('click', () => {
    deactivateViews()
    $("#editInsurance").addClass('active')
    $('.insurance').css('display', 'flex')
})

// Dynamic View Edit Insurance
$("#editPermission").on('click', () => {
    deactivateViews()
    $("#editPermission").addClass('active')
    $('.permission').css('display', 'flex')
})
// Dynamic View Edit Insurance
$("#editFull").on('click', () => {
    deactivateViews()
    $("#editFull").addClass('active')
    $('.full').css('display', 'flex')
})
// Dynamic View Edit Insurance
$("#editDolly").on('click', () => {
    deactivateViews()
    $("#editDolly").addClass('active')
    $('.dolly').css('display', 'flex')
})
/** MODAL CREATE TRAILER */
const openCreatePopup = () => {
    $("#createTrailer").css('display', 'flex')
}
// Dynamic View Create General
$("#createGeneral").on('click', () => {
    deactivateViews()
    $("#createGeneral").addClass('active')
    $('.general').css('display', 'flex')
})
// Dynamic View Create Insurance
$("#createInsurance").on('click', () => {
    deactivateViews()
    $("#createInsurance").addClass('active')
    $('.insurance').css('display', 'flex')
})

// Dynamic View Create Insurance
$("#createPermission").on('click', () => {
    deactivateViews()
    $("#createPermission").addClass('active')
    $('.permission').css('display', 'flex')
})
// Dynamic View Create Insurance
$("#createFull").on('click', () => {
    deactivateViews()
    $("#createFull").addClass('active')
    $('.full').css('display', 'flex')
})
// Dynamic View Create Order
$("#createBooths").on('click', () => {
    deactivateViews()
    $("#createBooths").addClass('active')
    $('.booths').css('display', 'flex')
    $('.gps').css('display', 'none')
})
// Dynamic View Create Order
$("#createGps").on('click', () => {
    deactivateViews()
    $("#createGps").addClass('active')
    $('.gps').css('display', 'flex')
    $('.booths').css('display', 'none')
})
// Dynamic View Create Insurance
$("#createDolly").on('click', () => {
    deactivateViews()
    $("#createDolly").addClass('active')
    $('.dolly').css('display', 'flex')
})
/** MODAL DOCUMENTS TRAILER */
const openDocumentsPopup = (id) => {
    $("#trailerDocuments").css('display', 'flex')
    $("#trailerIdFile").val(id);
	$('input:checkbox[name=check]').each(function () { $(this).prop('checked', false); });
	$('button[name=down-btn]').each(function () {$(this).attr('hidden',true)});
	$.ajax({
		type: "GET",
		url: "trailers/getChecklist",
		data: {
			trailerId : id,
		},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success: ( response ) => {
				response.forEach(element => {
					$("#checkId" + element.evicenceChecklist).prop("checked", true);
					$("#uploadDate" + element.evicenceChecklist).html(parseDateFromTimestamp(element.evidenceTimestamp))
					$("#uploadTime" + element.evicenceChecklist).html(parseTimeFromTimestamp(element.evidenceTimestamp))
					$("#downloadBtnId" + element.evicenceChecklist).attr("hidden", false);
				});
		},
		error: ( response ) => console.log("Error: " + response),
    });
}

const uploadValidityDocument = () => {
	var formData = new FormData();
	formData.append('evicenceChecklist', $("#checklistId").val());
	formData.append('evidenceFile', $("#evidenceValidityFile").prop('files')[0]);
	formData.append('evicenceValidity', $("#evidenceValidityDate").val());
	formData.append('idUser', $("#globalUserId").val());
    formData.append('userName', $("#globalUserName").val());
	formData.append('operation', "INSERT");
	formData.append('evidenceTrailerId', $("#trailerIdFile").val());
	
	$.ajax({
			type : "POST",
			url : 'trailers/addEvidenceFile',
			cache : false, 
			contentType : false,
			processData : false,
			data : formData,
			success : function(response) {
				manageResponse(response);
			},
			error : function() {
				showAlert(3,"ERRO 902", "El documento no puede cargarse", "Intente nuevamente o contacte al equipo de desarrollo");
			}
		});  
}
/** UTILS */
const closePopups = () => {
    $("#trailerDocuments").css('display', 'none')
    $("#editTrailer").css('display', 'none')
    $("#createTrailer").css('display', 'none')
    $("#editValidity").css('display', 'none')
    $("#createAdditional").css('display', 'none')
    $("#createAditonalCost").css('display', 'none')
    $("#editAditonalG").css('display', 'none')
    $("#createAditional").css('display', 'none')
     $("#editAditonalG").css('display', 'none')
}

const closeViews = () => {
    $('.general').css('display', 'none')
    $('.certificates').css('display', 'none')
    $('.insurance').css('display', 'none')
    $('.validity').css('display', 'none')
    $('.permission').css('display', 'none')
    $('.full').css('display', 'none')
    $('.dolly').css('display', 'none')
    $('.add').css('display', 'none')
}

const deactivateViews = () => {
    closeViews()
    $('button').removeClass("active")
};

/** FILES */
const uploadEvidence = (type) => {
	$("#updloadFile").click()
	$("#checklistId").val(type);
}

const viewEvidence = (type) => {
	$("#checklistId").val(type);
	$("#testButton").click();
}

const openValidityPopup = (type) => {
	$("#trailerDocuments").css('display', 'none')
    $("#editValidity").css('display', 'flex')
    $("#checklistId").val(type);
}
$("#editValidity").on('click', () => {
    deactivateViews()
    $("#editValidity").addClass('active')
    $('.validity').css('display', 'flex')
});

const openAditionalPopup = (data) => {
	configLoanTableAdd(data);
    $("#createAditional").css('display', 'flex')
    $("#editAdd").val(data);
    console.log("soy el valor id al entrar a adicional "+data)
}


const openAddPopup = (data) => {
	$("#createAditional").css('display', 'none')
    $("#createAditonalCost").css('display', 'flex')
    $("#editAdd").val();
   console.log("soy el valor de id ya en boton de creacion", $("#editAdd").val());
}

const configLoanTableAdd = (data) => {
console.log("si entro");
	$("#aditionalGs").DataTable().destroy();
	$("#aditionalGs").DataTable({
		dom: "<'row'<'col-sm-5 'l><'col-sm-1 '>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7 text-right'p>>",
        fixedHeader: true,
        responsive: true,
        autoWidth: true,
        pageLength: 5, // Aquí estableces el número de entradas por página
        ajax: {
           url: "trailers/getDetailInfo",
           type: 'GET',
           dataSrc: '',
           data : {trailerId :  data },
            error: function(response) {
				console.log("ssali bien");
                console.log("SOY el id en table" +JSON.stringify(response));
            }
         },
          columns: [
            {data: 'trailerId', visible: true},
			{data: 'addConcept', visible: true},       
			{data: 'addCost', visible: true},
			{data: 'addDate', visible: true},
			{data: 'addStatus', visible: true},
			{data: 'addVigen', visible: true},
			{data: 'trailerAditionalId', render: (data) => `<button class= "link" onclick="openAddEditPopup('${ data }')"> Gastos Adicionales </button>` },
			
        ], 
     }).draw();
}

const openAddEditPopup = (data) => {
	$("#createAditional").css('display', 'none')
    $("#editAditonalG").css('display', 'flex')
    $("#editAditional").val(data);
   console.log("soy el valor de id ya en boton de creacion", $("#editAditional").val());
  
	$.ajax({
		type: "GET",
		url: "trailers/getSingleDetail",
		data: {
			trailerAditionalId : data,
		},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success: ( response ) => {
			console.log(response);
    		$("#editAddConcept").val(response.addConcept);
    		$("#editAddDescription").val(response.addDescription)
    		$("#editAddDate").val(response.addDate);
    		$("#editAddCost").val(response.addCost);
    		$("#editAddVigen").val(response.addVigen)
    		$("#editAddStatus").val(response.addStatus);
    		$("#editAddDays").val(response.addDays);
    		$("#editAddTotal").val(response.addTotal);
		},
		error: ( response ) => console.log("Error: " + response),
    });
}

// Dynamic View create add
$("#createAdd").on('click', () => {
    deactivateViews()
    $("#createAdd").addClass('active')
    $('.add').css('display', 'flex')
})

// Dynamic View edit add
$("#editAdd").on('click', () => {
    deactivateViews()
    $("#editAdd").addClass('active')
    $('.add').css('display', 'flex')
})

$(document).ready(function() {
	$('.js-example-basic-single').select2();
});

function fillIncidents() {
	if($("#createIndicators").val() == 1) {
	    $("#in1").css('display', 'flex')
	    $("#in2").css('display', 'flex')
	}
}

function fillIncidents2() {
	if ($("#createIndicatorsFine").val() == 1){
	$("#in3").css('display', 'flex')
	$("#in4").css('display', 'flex')
	}
}
function fillIncidents3() {
	if ($("#createAddAmount").val() == 1){
	$("#in5").css('display', 'flex')
	$("#in6").css('display', 'flex')
	}
}

function calcularDias() {
            // Obtener los valores de los inputs
            const fechaPago = document.getElementById('addDate').value;
            const fechaVigencia = document.getElementById('addVigen').value;

            // Verificar que ambas fechas se hayan seleccionado
            if (fechaPago === '' || fechaVigencia === '') {
                document.getElementById('addDays').value = '';
                return;
            }

            // Convertir las fechas a objetos Date
            const fechaPagoDate = new Date(fechaPago);
            const fechaVigenciaDate = new Date(fechaVigencia);

            // Calcular la diferencia en milisegundos
            const diferenciaMilisegundos = fechaVigenciaDate - fechaPagoDate;

            // Convertir la diferencia a días
            const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

            // Mostrar el resultado en el input de texto
            document.getElementById('addDays').value = Math.round(diferenciaDias);
            
              calcularTotal();
}

function calcularDias2() {
            // Obtener los valores de los inputs
            const fechaPago = document.getElementById('editAddDate').value;
            const fechaVigencia = document.getElementById('editAddVigen').value;

            // Verificar que ambas fechas se hayan seleccionado
            if (fechaPago === '' || fechaVigencia === '') {
                document.getElementById('editAddDays').value = '';
                return;
            }

            // Convertir las fechas a objetos Date
            const fechaPagoDate = new Date(fechaPago);
            const fechaVigenciaDate = new Date(fechaVigencia);

            // Calcular la diferencia en milisegundos
            const diferenciaMilisegundos = fechaVigenciaDate - fechaPagoDate;

            // Convertir la diferencia a días
            const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

            // Mostrar el resultado en el input de texto
            document.getElementById('editAddDays').value = Math.round(diferenciaDias);
            
              calcularTotal2();
}
        
function calcularTotal() {
            const precio = parseFloat(document.getElementById('addCost').value);
            const dias = parseFloat(document.getElementById('addDays').value);

            if (!isNaN(precio) && !isNaN(dias) && dias > 0) {
                const total = precio / dias;
                document.getElementById('addTotal').value = total.toFixed(2);
            } else {
                document.getElementById('addTotal').value = '';
            }
        }
        
function calcularTotal2() {
            const precio = parseFloat(document.getElementById('editAddCost').value);
            const dias = parseFloat(document.getElementById('editAddDays').value);

            if (!isNaN(precio) && !isNaN(dias) && dias > 0) {
                const total = precio / dias;
                document.getElementById('editAddTotal').value = total.toFixed(2);
            } else {
                document.getElementById('editAddTotal').value = '';
            }
        }

        // Escuchar el evento de cambio de valor en ambos inputs
        document.getElementById('addDate').addEventListener('input', calcularDias);
        document.getElementById('addVigen').addEventListener('input', calcularDias);
         document.getElementById('editAddDate').addEventListener('input', calcularDias2);
        document.getElementById('editAddVigen').addEventListener('input', calcularDias2);
         document.getElementById('addCost').addEventListener('input', calcularTotal);
         document.getElementById('editAddCost').addEventListener('input', calcularTotal2);
         
         
         
         
         
