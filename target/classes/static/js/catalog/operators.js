let loggedInUsername = ""; // Inicializamos la variable
$(document).ready(() => {
    configDataTable();
	initComponents();
	console.log('globalUserId:', globalUserId);
    console.log('globalUserName:', globalUserName);
});

const configDataTable = () => {
    $("#operatorsTable").DataTable({
        dom: `
            <'row table-header'<'col-sm-4 table-btn'B><'col-sm-4 table-search'f>>
            <'row'<'col-sm-20 table-content'tr>>
            <'row table-footer'<'col-sm-7 table-pag'p>>
        `,
        fixedHeader: true,
        responsive: true,
        autoWidth: true,
        ajax: {
            url: "operators/getDataTable",
            type: 'GET',
            dataSrc: '',
            error: ( response ) => console.log("Error: " + response),
        },
        columns: [
			{data: 'operatorStatus', render: (data) => `<p class="status${ data }"></p>` },
            {data: 'operatorId', visible: true},
			{data: 'operatorName', visible: true},
            {data: 'operatorLastName1', visible: true},
            {data: 'operatorLastName2', visible: true},
			{data: 'operatorAdmissionDate', visible: true},
			{data: 'operatorLicenseType', visible: true},
			{data: 'operatorLocalidad', visible: true},
			{data: 'operatorId', render: (data) => `<button onclick="openDocumentsPopup('${ data }')"> Ver Documentos </button>` },
            {data: 'operatorId', render: (data) => `<button onclick="openEditPopup('${ data }')"> Editar Operador </button>` },
            {data: 'operatorId', render: (data) => `<button onclick="openAditionalPopup('${ data }')"> Gastos Adicionales </button>` },
        ]
    })
};

const initComponents = () => {
	$("#editoperatorForm").submit( () => {
		var formData = new FormData(); 
		formData.append('operatorId', $("#editId").val());
		formData.append('operatorName', $("#editName").val());
		formData.append('operatorLastName1', $("#editLastName1").val());
		formData.append('operatorLastName2', $("#editLastName2").val());
		formData.append('operatorRFC', $("#editRfc").val());
		formData.append('operatorNSS', $("#editNSS").val());
		formData.append('operatorAdmissionDate', $("#editAdmissionDate").val());
		formData.append('operatorLicenseValidity', $("#editLicenseValidity").val());
		formData.append('operatorLicenseType', $("#editLicenseType").val());
		formData.append('operatorLicenseNumber', $("#editLicenseNumber").val());
		formData.append('operatorCompany', $("#editCompany").val());
		formData.append('operatorObservations', $("#editOperatorObservations").val());
		formData.append('operatorKeyState', $("#editKeyState").val());
		formData.append('operatorCodePostal', $("#editCodePostal").val());
		formData.append('operatorMunicipality', $("#editMunicipality").val());
		formData.append('operatorColonia', $("#editColonia").val());
		formData.append('operatorStreet', $("#editStreet").val());
		formData.append('operatorOutside', $("#editOutside").val());
		formData.append('operatorInside', $("#editInside").val());
		formData.append('operatorCountry', $("#editCountry").val());
		formData.append('operatorStartDate', $("#editStartDate").val());
		formData.append('operatorTime', $("#editTime").val());
		formData.append('operatorStatus', $("#editState").val());
		formData.append('operatorLocalidad', $("#editLocalidad").val());
		formData.append('operatorTrip', $("#editTripPorc").val());

        formData.append('destinyNomMuni', $("#reNomMunicipio").val());
        formData.append('destinyNomCol', $("#reNomColonia").val());
        formData.append('destinyNomEst', $("#reNomClaveEstado").val());


		formData.append('idUser', $("#globalUserId").val());
        formData.append('userName', $("#globalUserName").val());
		formData.append('operation', "UPDATE");
		
		console.log($("#globalUserId").val());

   		$.ajax({
			type: "POST",
			url: "operators/updateOperator",
			cache : false, 
			contentType : false,
			processData : false,
			data : formData,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		});/**/
		return false;
	});
	
	// Manejar el envío del formulario
$("#createOperatorForm").submit(() => {
    var formData = new FormData(); 
    formData.append('operatorName', $("#createName").val());
    formData.append('operatorLastName1', $("#createLastName1").val());
    formData.append('operatorLastName2', $("#createLastName2").val());
    formData.append('operatorRFC', $("#createRfc").val());
    formData.append('operatorNSS', $("#createNSS").val());
    formData.append('operatorAdmissionDate', $("#createAdmissionDate").val());
    formData.append('operatorLicenseValidity', $("#createLicenseValidity").val());
    formData.append('operatorLicenseType', $("#createLicenseType").val());
    formData.append('operatorLicenseNumber', $("#createLicenseNumber").val());
    formData.append('operatorCompany', $("#createCompany").val());
    formData.append('operatorObservations', $("#createOperatorObservations").val());
    formData.append('operatorKeyState', $("#createKeyState").val());
    formData.append('operatorCodePostal', $("#createCodePostal").val());
    formData.append('operatorMunicipality', $("#createMunicipality").val());
    formData.append('operatorColonia', $("#createColonia").val());
    formData.append('operatorStreet', $("#createStreet").val());
    formData.append('operatorOutside', $("#createOutside").val());
    formData.append('operatorInside', $("#createInside").val());
    formData.append('operatorCountry', $("#createCountry").val());
    formData.append('operatorStartDate', $("#createStartDate").val());
    formData.append('operatorTime', $("#createTime").val());
    formData.append('operatorStatus', $("#createState").val());
    formData.append('operatorLocalidad', $("#createLocalidad").val());
	formData.append('operatorTrip', $("#createTripPorc").val());

		formData.append('idUser', $("#globalUserId").val());
        formData.append('userName', $("#globalUserName").val());
    formData.append('operation', "INSERT");


    $.ajax({
        type: "POST",
        url: "operators/updateOperator",
        cache: false, 
        contentType: false,
        processData: false,
        data: formData,
        success: (response) => {
            if (response === " java.lang.NullPointerException") {
                window.location.reload(); // Recargar la página si hay un error específico
            } else {
                manageResponse(response); // Manejar la respuesta normalmente
            }
        },
        error: (xhr, textStatus, errorThrown) => console.error("Error al enviar formulario:", errorThrown),
    });
    return false; // Evitar el envío automático del formulario
});

	$("#createFormAdd").submit( () => {
		data = {
			operatorId : $("#editAdd").val(),
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
			url: "operators/createDetailAditional",
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
			operatorsAditionalId : $("#editAditional").val(),
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
			url: "operators/createDetailAditional",
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
		formData.append('evidenceOperatorId', $("#operatorIdFile").val());
		
		$.ajax({
			type : "POST",
			url : 'operators/addEvidenceFile',
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




/** MODAL DOCUMENTS OPERATOR */
const openDocumentsPopup = (id) => {
    $("#operatorDocuments").css('display', 'flex')
	$("#operatorIdFile").val(id);
	$('input:checkbox[name=check]').each(function () { $(this).prop('checked', false); });
	$('button[name=down-btn]').each(function () {$(this).attr('hidden',true)});
	$.ajax({
		type: "GET",
		url: "operators/getChecklist",
		data: {
			operatorId : id,
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

/** MODAL DOCUMENTS OPERATOR */
const openDocumentsAditionalPopup = (data) => {
    $("#addDocuments").css('display', 'flex')
	$("#operatorIdFile").val(data);
	$('input:checkbox[name=check]').each(function () { $(this).prop('checked', false); });
	$('button[name=down-btn]').each(function () {$(this).attr('hidden',true)});
	$.ajax({
		type: "GET",
		url: "operators/getChecklist",
		data: {
			operatorId : id,
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
	formData.append('evidenceOperatorId', $("#operatorIdFile").val());
	
	$.ajax({
			type : "POST",
			url : 'operators/addEvidenceFile',
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

const openValidityPopup = (type) => {
	$("#operatorDocuments").css('display', 'none')
    $("#editValidity").css('display', 'flex')
    $("#checklistId").val(type);
}

const openAditionalPopup = (data) => {
	configLoanTableAdd(data);
    $("#createAditional").css('display', 'flex')
    $("#editAdd").val(data);
    console.log("soy el valor id al entrar a adicional "+data)
}

const openAddPopup = () => {
	$("#createAditional").css('display', 'none')
    $("#createAditonalG").css('display', 'flex')
    $("#editAdd").val();
   console.log("soy el valor de id ya en boton de creacion", $("#editAdd").val());
}

const openAddEditPopup = (data) => {
	$("#createAditional").css('display', 'none')
    $("#editAditonalG").css('display', 'flex')
    $("#editAditional").val(data);
   console.log("soy el valor de id ya en boton de creacion", $("#editAditional").val());
  
	$.ajax({
		type: "GET",
		url: "operators/getSingleDetail",
		data: {
			operatorsAditionalId : data,
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

const configLoanTableAdd = (data) => {
console.log("si entro a table"+data);
	$("#aditionalGs").DataTable().destroy();
	$("#aditionalGs").DataTable({
		dom: "<'row'<'col-sm-5 'l><'col-sm-1 '>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7 text-right'p>>",
        fixedHeader: true,
        responsive: true,
        autoWidth: true,
        pageLength: 5, 
        ajax: {
           url: "operators/getDetailInfo",
           type: 'GET',
           dataSrc: '',
           data : {operatorId :  data },
            error: function(response) {
				console.log("ssali bien");
                console.log("SOY el id en table" +JSON.stringify(response));
            }
         },
          columns: [
            {data: 'operatorId', visible: true},
			{data: 'addConcept', visible: true},       
			{data: 'addCost', visible: true},
			{data: 'addDate', visible: true},
			{data: 'addVigen', visible: true},
			{data: 'operatorsAditionalId', render: (data) => `<button class= "link" onclick="openAddEditPopup('${ data }')"> Gastos Adicionales </button>` },
			{data: 'operatorId', render: (data) => `<button class= "link" onclick="openDocumentsAditionalPopup('${ data }')"> Evidencia </button>` },
        ], 
     }).draw();
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

$("#editValidity").on('click', () => {
    deactivateViews()
    $("#editValidity").addClass('active')
    $('.validity').css('display', 'flex')
})

/** MODAL CREATE OPERATOR */
const openCreatePopup = () => {
    $("#createOperator").css('display', 'flex')
}
// Dynamic View Create General
$("#createGeneral").on('click', () => {
    deactivateViews()
    $("#createGeneral").addClass('active')
    $('.general').css('display', 'flex')
})
// Dynamic View Create License
$("#createLicense").on('click', () => {
    deactivateViews()
    $("#createLicense").addClass('active')
    $('.license').css('display', 'flex')
})
// Dynamic View Create License
$("#createAddress").on('click', () => {
    deactivateViews()
    $("#createAddress").addClass('active')
    $('.address').css('display', 'flex')
})
// Dynamic View Create Observatios
$("#createObservations").on('click', () => {
    deactivateViews()
    $("#createObservations").addClass('active')
    $('.observations').css('display', 'flex')
})
/** MODAL EDIT OPERATOR */
const openEditPopup = (id) => {
    $("#editOperator").css('display', 'flex');
    $("#editId").val(id);

    $.ajax({
        type: "GET",
        url: "operators/getSingle",
        data: { operatorId: id },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: (response) => {
            console.log("Datos recibidos:", response);

            // Asignar valores simples
            $("#editName").val(response.operatorName);
            $("#editLastName1").val(response.operatorLastName1);
            $("#editLastName2").val(response.operatorLastName2);
            $("#editNSS").val(response.operatorNSS);
            $("#editAdmissionDate").val(response.operatorAdmissionDate);
            $("#editLicenseFile").val(response.operatorLicenseFile);
            $("#editLicenseValidity").val(response.operatorLicenseValidity);
            $("#editLicenseType").val(response.operatorLicenseType);
            $("#editLicenseNumber").val(response.operatorLicenseNumber);
            $("#editCompany").val(response.operatorCompany);
            $("#editOperatorObservations").val(response.operatorObservations);
            $("#editRfc").val(response.operatorRFC);
            $("#editStreet").val(response.operatorStreet);
            $("#editOutside").val(response.operatorOutside);
            $("#editInside").val(response.operatorInside);
            $("#editCountry").val(response.operatorCountry);
            $("#editStartDate").val(response.operatorStartDate);
            $("#editTime").val(response.operatorTime);
            $("#editState").val(response.operatorKeyState);
            $("#editLocalidad").val(response.operatorLocalidad);
            $("#editTripPorc").val(response.operatorTrip);
            $("#reNomClaveEstado").val(response.destinyNomEst);
            $("#editKeyState").val(response.operatorKeyState).trigger('change'); 

            fillCodigoPostal(() => {
                $("#editCodePostal").val(response.operatorCodePostal).trigger('change'); // Establecer código postal

                fillMunicipio(() => {
                    $("#editMunicipality").val(response.operatorMunicipality).trigger('change'); // Establecer municipio

                    fillColonia(() => {
                        $("#editColonia").val(response.operatorColonia).trigger('change');
                    });
                });
            });
        },
        error: (response) => {
            console.log("Error al obtener datos:", response);
        },
    });
};


// Dynamic View Edit General
$("#editGeneral").on('click', () => {
    deactivateViews()
    $("#editGeneral").addClass('active')
    $('.general').css('display', 'flex')
})
// Dynamic View Edit License
$("#editLicense").on('click', () => {
    deactivateViews()
    $("#editLicense").addClass('active')
    $('.license').css('display', 'flex')
})

// Dynamic View Edit Observatios
$("#editObservations").on('click', () => {
    console.log("Works")
    deactivateViews()
    $("#editObservations").addClass('active')
    $('.observations').css('display', 'flex')
})
// Dynamic View Edit License
$("#editAddress").on('click', () => {
    deactivateViews()
    $("#editAddress").addClass('active')
    $('.address').css('display', 'flex')
})

/** UTILS */
const closePopups = () => {
	$("#operatorDocuments").css('display', 'none')
    $("#createOperator").css('display', 'none')
    $("#editOperator").css('display', 'none')
    $("#editValidity").css('display', 'none')
    $("#editLicence").css('display', 'none')
    $("#createAditonalG").css('display', 'none')
    $("#createAditional").css('display', 'none')
    $("#addDocuments").css('display', 'none')
    $("#createAditional").css('display', 'none')
    $("#editAditonalG").css('display', 'none')
}

const closeViews = () => {
    $('.general').css('display', 'none')
    $('.license').css('display', 'none')
    $('.observations').css('display', 'none')
    $('.validity').css('display', 'none')
    $('.licence').css('display', 'none')
    $('.address').css('display', 'none')
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

    
function fillCodigoPostal(callback) {
    if ($("#editKeyState").val() != 0) {
        $.ajax({
            type: "GET",
            url: "operators/getCoPos",
            data: { cEstado: $("#editKeyState").val() },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: (response) => {
                const data = [{ id: "", description: "Seleccione una opción" }];
                response.forEach((element) => {
                    data.push({ id: element.dcodigo, description: element.dcodigo });
                });
                clearCombo($("#editCodePostal")[0]);
                fillCombo($("#editCodePostal")[0], data);
                if (callback) callback(); // Ejecutar el callback
            },
            error: (response) => console.log("Error al obtener códigos postales:", response),
        });
    } else if (callback) callback();
}


function fillMunicipio(callback) {
    if ($("#editCodePostal").val() != 0) {
        $.ajax({
            type: "GET",
            url: "operators/getMun",
            data: { dCodigo: $("#editCodePostal").val() },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: (response) => {
                const data = [{ id: "0", description: "Seleccione una opción" }];
                response.forEach((element) => {
                    data.push({ id: element.cmnpio, description: element.dmnpio });
                });
                clearCombo($("#editMunicipality")[0]);
                fillCombo($("#editMunicipality")[0], data);

                // Escuchar cambio en el combo para actualizar el campo oculto
                $("#editMunicipality").off("change").on("change", function () {
                    const selectedId = $(this).val(); // Obtener el valor seleccionado (id)
                    const selectedElement = response.find(el => el.cmnpio === selectedId); // Buscar el municipio en la respuesta
                    const municipioName = selectedElement ? selectedElement.dmnpio : ""; // Obtener el dmnpio
                    $("#reNomMunicipio").val(municipioName); // Llenar el campo oculto
                });

                if (callback) callback(); // Ejecutar el callback
            },
            error: (response) => console.log("Error al obtener municipios:", response),
        });
    } else {
        // Limpiar ambos campos si no hay código postal
        clearCombo($("#editMunicipality")[0]);
        $("#reNomMunicipio").val("");
        if (callback) callback();
    }
}


 
function fillColonia(callback) {
    if ($("#editCodePostal").val() != 0) {
        $.ajax({
            type: "GET",
            url: "operators/getCol",
            data: { dCodigo: $("#editCodePostal").val() },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: (response) => {
                const data = [{ id: "0", description: "Seleccione una opción" }];
                response.forEach((element) => {
                    data.push({ id: element.idAsentaCpcons, description: element.dasenta });
                });
                clearCombo($("#editColonia")[0]);
                fillCombo($("#editColonia")[0], data);

                // Escuchar cambio en el combo para actualizar el campo oculto
                $("#editColonia").off("change").on("change", function () {
                    const selectedId = $(this).val(); // Obtener el valor seleccionado (id)
                    const selectedElement = response.find(el => el.idAsentaCpcons === selectedId); // Buscar la colonia en la respuesta
                    const coloniaName = selectedElement ? selectedElement.dasenta : ""; // Obtener el dasenta
                    $("#reNomColonia").val(coloniaName); // Llenar el campo oculto con la colonia
                });

                if (callback) callback(); // Ejecutar el callback
            },
            error: (response) => console.log("Error al obtener colonias:", response),
        });
    } else {
        // Limpiar ambos campos si no hay código postal
        clearCombo($("#editColonia")[0]);
        $("#reNomColonia").val("");
        if (callback) callback();
    }
}


function createFillMunicipio () {
	if($("#createCodePostal").val() != 0) {
		console.log("soy el valor de codigo", $("#createCodePostal").val());
		$("#createOperatorForm").css('display', 'flex')
		$.ajax({
    		type: "GET",
    		url: "operators/getMun",
    		data: { dCodigo : $("#createCodePostal").val() },
   			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			success: (response) =>  {
				console.log("soy el de mun" + JSON.stringify(response))
              			const data = [{id: "0", description : "Seleccione una opción"}];
			response.forEach((element) => {
				row = {
					id: element.cmnpio,
					description : element.dmnpio
				}
				data.push(row);
				
			});
			clearCombo($("#createMunicipality")[0]);
			fillCombo($("#createMunicipality")[0],data);
				console.log(data)
			},
			error: ( response ) => console.log(JSON.stringify(response)),
		});
	}
 }
 
 function createFillColonia () {
	if($("#createCodePostal").val() != 0) {
		console.log("soy el valor de colonia", $("#createCodePostal").val());
		$("#createOperatorForm").css('display', 'flex')
		$.ajax({
    		type: "GET",
    		url: "operators/getCol",
    		data: { dCodigo : $("#createCodePostal").val() },
   			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			success: (response) =>  {
				console.log("soy el de clonia" + JSON.stringify(response))
              			const data = [{id: "0", description : "Seleccione una opción"}];
			response.forEach((element) => {
				row = {
					id: element.idAsentaCpcons,
					description : element.dasenta
				}
				data.push(row);
				
			});
			clearCombo($("#createColonia")[0]);
			fillCombo($("#createColonia")[0],data);
				console.log(data)
			},
			error: ( response ) => console.log(JSON.stringify(response)),
		});
	}
 }
$(document).ready(function() {
	$('.js-example-basic-single').select2();
});

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
    




