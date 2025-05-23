
$(document).ready(() => {
	console.log("Ready")
    configDataTable();
	initComponents();
});

const configDataTable = () => {
    $("#unitsTable").DataTable ({
        dom: `
            <'row table-header'<'col-sm-4 table-btn'B><'col-sm-4 table-search'f>>
            <'row'<'col-sm-20 table-content'tr>>
            <'row table-footer'<'col-sm-7 table-pag'p>>
        `,
        fixedHeader: true,
        responsive: true,
        autoWidth: true,
        ajax: {
            url: "units/getDataTable",
            type: 'GET',
            dataSrc: '',
            error: ( response ) => console.log(JSON.stringify(response)),
        },
        columns: [
			{data: 'unitStatus', render: (data) => `<p class="status${ data }"></p>` },
            {data: 'unitId', visible: true},
			{data: 'unitType', visible: true},
			{data: 'unitEconomicNumber', visible: true},
			{data: 'unitBrand', visible: true},
			{data: 'unitProperty', visible: true},
			{data: 'unitBrand', visible: true},
			{data: 'unitProyectId', visible: true},
            {data: 'unitId', render: (data) => `<button onclick="openDocumentsPopup('${ data }')"> Ver Documentación </button>` },
            {data: 'unitId', render: (data) => `<button onclick="openEditPopup('${ data }')"> Editar Unidad </button>` },
            {data: 'unitPlate', render: (data) => `<button onclick="openGPSPopup('${ data }')"> GPS </button>` },
            {data: 'unitId', render: (data) => `<button onclick="openAditionalPopup('${ data }')"> Gastos Adicionales </button>` },
        ]
    })
};

const initComponents = () => {
   $("#editForm").submit( () => {
		var formData = new FormData();
		formData.append('unitId', $("#editId").val());
		formData.append('unitType', $("#editUnitType").val());
		formData.append('unitEconomicNumber', $("#editEcoNumber").val());
		formData.append('unitBrand', $("#editBrand").val());
		formData.append('unitModel', $("#editModel").val());
		formData.append('unitSerialNumber', $("#editSerialNumber").val());
		formData.append('unitPlate', $("#editUnitPlate").val());
		formData.append('unitProperty', $("#editUnitProperty").val());
		formData.append('unitCompany', $("#editCompany").val());
		formData.append('unitStatus', $("#editUnitStatus").val());		
		formData.append('unitManDate', $("#editManDate").val());
		formData.append('unitManStatus', $("#editStatusMan").val());
		formData.append('unitManDescription', $("#editManDesc").val());
        formData.append('unitIncidentDate', $("#editIncidentDate").val());
		formData.append('unitIncidentStatusA', $("#editIncidentStatusA").val());
		formData.append('unitIncidentStatusR', $("#editIncidentStatusR").val());
		formData.append('unitIncidentMinistery', $("#editIncidentMinistery").val());
		formData.append('unitIncidentStatusC', $("#editIncidentStatusC").val());
		formData.append('unitOutService', $("#editOutService").val());
		formData.append('unitOutDescription', $("#editOutDescrip").val());
		formData.append('unitTheftDate', $("#editTheftDate").val());
		formData.append('unitTheftStatusG', $("#editTheftStatusG").val());
		formData.append('unitTheftStatusU', $("#editTheftStatusU").val());
		formData.append('unitTheftStatusM', $("#editTheftStatusM").val());
		formData.append('unitTheftStatusC', $("#editTheftStatusC").val());		
		formData.append('unitProyectId', $("#editActualProject").val());
		formData.append('unitRent', $("#editUnitRent").val());
		formData.append('unitInsuranceId', $("#editInsuranceNumber").val());
		formData.append('unitAseguradoraResponsable', $("#editCpAseguradoraResponsable").val());
		formData.append('unitInsuranceSub', $("#editInsuranceSub").val());
		formData.append('unitInsuranceEndo', $("#editInsuranceEndo").val());
		formData.append('unitInsuranceStartDate', $("#editStartInsurance").val());
		formData.append('unitInsuranceEndDate', $("#editEndInsurance").val());
		formData.append('unitPermitNumber', $("#editPermitNumber").val());
		formData.append('unitLocalidad', $("#editLocalidad").val());
		formData.append('unitPermisoSct', $("#editPermisoSct").val());
		formData.append('unitTipoAutotransportable', $("#editTipoAutotransportable").val());
		formData.append('unitNumeroPermiso', $("#editNumeroPermiso").val());
		formData.append('unitImei', $("#editImei").val());
		formData.append('unitDateActua', $("#editActual").val());


		
		formData.append('idUser', $("#globalUserId").val());
		formData.append('userName', $("#globalUserName").val());
		formData.append('operation', "UPDATE");
		
		$.ajax({
			type: "POST",
			url: "units/updateUnit",
			cache : false, 
			contentType : false,
			processData : false,
			data : formData,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		});
		return false;
	});
	
	$("#createForm").submit( () => {
		var formData = new FormData();
		formData.append('unitType', $("#createUnitType").val());
		formData.append('unitEconomicNumber', $("#createEcoNumber").val());
		formData.append('unitBrand', $("#createBrand").val());
		formData.append('unitModel', $("#createModel").val());
		formData.append('unitSerialNumber', $("#createSerialNumber").val());
		formData.append('unitPlate', $("#createUnitPlate").val());
		formData.append('unitProperty', $("#createUnitProperty").val());
		formData.append('unitCompany', $("#createCompany").val());
		formData.append('unitStatus', $("#createUnitState").val());
		formData.append('unitIncidentDate', $("#createIncidentDate").val());
		formData.append('unitIncidentStatusA', $("#createIncidentStatusA").val());
		formData.append('unitIncidentStatusR', $("#createIncidentStatusR").val());
		formData.append('unitIncidentMinistery', $("#createIncidentMinistery").val());
		formData.append('unitIncidentStatusC', $("#createIncidentStatusC").val());
		formData.append('unitTheftDate', $("#createTheftDate").val());
		formData.append('unitTheftStatusG', $("#createTheftStatusG").val());
		formData.append('unitTheftStatusU', $("#createTheftStatusU").val());
		formData.append('unitTheftStatusM', $("#createTheftStatusM").val());
		formData.append('unitTheftStatusC', $("#createTheftStatusC").val());
		formData.append('unitRent', $("#createUnitRent").val());
		formData.append('unitInsuranceId', $("#createInsuranceNumber").val());
		formData.append('unitAseguradoraResponsable', $("#createCpAseguradoraResponsable").val());
		formData.append('unitInsuranceSub', $("#createInsuranceSub").val());
		formData.append('unitInsuranceEndo', $("#createInsuranceEndo").val());
		formData.append('unitInsuranceStartDate', $("#createStartInsurance").val());
		formData.append('unitInsuranceEndDate', $("#createEndInsurance").val());
		formData.append('unitPermitNumber', $("#createPermitNumber").val());
		formData.append('unitLocalidad', $("#createLocalidad").val());
		
		formData.append('unitPermisoSct', $("#createPermisoSct").val());
		formData.append('unitTipoAutotransportable', $("#createTipoAutotransportable").val());
		formData.append('unitNumeroPermiso', $("#createNumeroPermiso").val());
		formData.append('unitImei', $("#createImei").val());

				
		formData.append('idUser', $("#globalUserId").val());
		formData.append('userName', $("#globalUserName").val());
		formData.append('operation', "INSERT");

		$.ajax({
			type: "POST",
			url: "units/updateUnit",
			cache : false, 
			contentType : false,
			processData : false,
			data : formData,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		});
		return false;
	})
	
	$("#createFormAdd").submit( () => {
		data = {
			unitId : $("#editAdd").val(),
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
			url: "units/createDetailAditional",
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
			unitAditionalId : $("#editAditional").val(),
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
			url: "units/createDetailAditional",
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
		formData.append('evidenceUnitsId', $("#unitIdFile").val());
		
		$.ajax({
			type : "POST",
			url : 'units/addEvidenceFile',
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

/** MODAL DOCUMENTS UNIT */
const openDocumentsPopup = (id) => {
    $("#unitDocuments").css('display', 'flex')
    $("#unitIdFile").val(id);
	$('input:checkbox[name=check]').each(function () { $(this).prop('checked', false); });
	$('button[name=down-btn]').each(function () {$(this).attr('hidden',true)});
	$.ajax({
		type: "GET",
		url: "units/getChecklist",
		data: {
			unitId : id,
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

/** MODAL DOCUMENTS UNIT */
const openDocumentsAditionalPopup = (data) => {
    $("#addDocuments").css('display', 'flex')
    $("#unitIdFile").val(data);
	$('input:checkbox[name=check]').each(function () { $(this).prop('checked', false); });
	$('button[name=down-btn]').each(function () {$(this).attr('hidden',true)});
	$.ajax({
		type: "GET",
		url: "units/getChecklist",
		data: {
			unitId : data,
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
	formData.append('evidenceUnitsId', $("#unitIdFile").val());
	
	$.ajax({
			type : "POST",
			url : 'units/addEvidenceFile',
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

/** MODAL EDIT UNIT */
const openEditPopup = (id) => {
    $("#editUnit").css('display', 'flex')
	$("#editId").val(id);
	$.ajax({
		type: "GET",
		url: "units/getSingle",
		data: {
			unitId : id,
		},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success: ( response ) => {
			console.log("llego en estatus unidad" + JSON.stringify(response));
			$("#editUnitType").val(response.unitType);
			$("#editImei").val(response.unitImei);

			$("#editEcoNumber").val(response.unitEconomicNumber);
			$("#editBrand").val(response.unitBrand);
			$("#editModel").val(response.unitModel);
			$("#editSerialNumber").val(response.unitSerialNumber);
			$("#editUnitPlate").val(response.unitPlate);
			$("#editUnitProperty").val(response.unitProperty);
			$("#editCompany").val(response.unitCompany)
			$("#editUnitStatus").val(response.unitStatus);
			 if (response.unitStatus == 6) {
                $("#r1, #r2, #r3, #r4, #r5,#m3,#o1, #o2,#d1").css('display', 'none');
                $("#s1, #s2, #s3, #s4, #s5").css('display', 'flex');
            } else if (response.unitStatus == 7) {
                $("#s1, #s2, #s3, #s4, #s5,#m3,#o1, #o2,#d1").css('display', 'none');
                $("#r1, #r2, #r3, #r4, #r5").css('display', 'flex');
            }else if (response.unitStatus == 5){
				$("#o1, #o2").css('display', 'flex');
				$("#r1, #r2, #r3, #r4, #r5, #s1, #s2, #s3, #s4, #s5,,#m3").css('display', 'none');
			}else if (response.unitStatus == 1){
				$("#d1").css('display', 'flex');
				$("#r1, #r2, #r3, #r4, #r5, #s1, #s2, #s3, #s4, #s5,#o1, #o2,#m3").css('display', 'none');
			}else if (response.unitStatus == 4){
				$("#m1,#m2,#m3").css('display', 'flex');
				$("#r1, #r2, #r3, #r4, #r5, #s1, #s2, #s3, #s4, #s5,#o1, #o2,#d1").css('display', 'none');
			}
			else {
                $("#r1, #r2, #r3, #r4, #r5, #s1, #s2, #s3, #s4, #s5,#o1,#o2,#d1,#m1,#m2,#m3").css('display', 'none');
            }
            $("#editManDesc").val(response.unitManDescription);
            $("#editManDate").val(response.unitManDate);
		    $("#editStatusMan").val(response.unitManStatus);
            $("#editOutService").val(response.unitOutService);
		    $("#editOutDescrip").val(response.unitOutDescription);
			$("#editIncidentDate").val(response.unitIncidentDate);
		    $("#editIncidentStatusA").val(response.unitIncidentStatusA);
		    $("#editIncidentStatusR").val(response.unitIncidentStatusR);
		    $("#editIncidentMinistery").val(response.unitIncidentMinistery);
		    $("#editIncidentStatusC").val(response.unitIncidentStatusC);
		    $("#editTheftDate").val(response.unitTheftDate);
		    $("#editTheftStatusG").val(response.unitTheftStatusG);
		    $("#editTheftStatusU").val(response.unitTheftStatusU);
		    $("#editTheftStatusM").val(response.unitTheftStatusM);
		    $("#editTheftStatusC").val(response.unitTheftStatusC);
			$("#editActualProject").val(response.unitProyectId);
			$("#editUnitRent").val(response.unitRent);
			$("#editInsuranceNumber").val(response.unitInsuranceId);
			$("#editCpAseguradoraResponsable").val(response.unitAseguradoraResponsable);
			$("#editInsuranceSub").val(response.unitInsuranceSub);
	        $("#editInsuranceEndo").val(response.unitInsuranceEndo);
			$("#editStartInsurance").val(response.unitInsuranceStartDate);
			$("#editEndInsurance").val(response.unitInsuranceEndDate);
			$("#editPermitNumber").val(response.unitPermitNumber);
			$("#editLocalidad").val(response.unitLocalidad);
			
			$("#editPermisoSct").val(response.unitPermisoSct);
			$("#editTipoAutotransportable").val(response.unitTipoAutotransportable);
			$("#editNumeroPermiso").val(response.unitNumeroPermiso);
			$("#editActual").val(response.unitDateActua);

			

		},
		error: ( response ) => console.log("Error: " + response),
    });
}

const openGPSPopup = (data) => {
	configLoanTable(data);
    $("#createGPS").css('display', 'flex')
    $("#editId").val(data);
    console.log("soy el valor id al entrar en table "+data)
}

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

const openAddEditPopup = (data) => {
	$("#createAditional").css('display', 'none')
    $("#editAditonalG").css('display', 'flex')
    $("#editAditional").val(data);
   console.log("soy el valor de id ya en boton de creacion", $("#editAditional").val());
  
	$.ajax({
		type: "GET",
		url: "units/getSingleDetail",
		data: {
			unitAditionalId : data,
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
		},
		error: ( response ) => console.log("Error: " + response),
    });
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
           url: "units/getDetailInfo",
           type: 'GET',
           dataSrc: '',
           data : {unitId :  data },
            error: function(response) {
				console.log("ssali bien");
                console.log("SOY el id en table" +JSON.stringify(response));
            }
         },
          columns: [
            {data: 'unitId', visible: true},
			{data: 'addConcept', visible: true},       
			{data: 'addCost', visible: true},
			{data: 'addDate', visible: true},
			{data: 'addStatus', visible: true},
			{data: 'addVigen', visible: true},
			{data: 'unitAditionalId', render: (data) => `<button class= "link" onclick="openAddEditPopup('${ data }')"> Gastos Adicionales </button>` },
			
        ], 
     }).draw();
}

const configLoanTable = (data) => {
console.log("si entro");
	$("#gpsTable").DataTable().destroy();
	$("#gpsTable").DataTable({
		dom: "<'row'<'col-sm-5 'l><'col-sm-1 '>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7 text-right'p>>",
        fixedHeader: true,
        responsive: true,
        autoWidth: true,
        pageLength: 5, // Aquí estableces el número de entradas por página
        ajax: {
           url: "units/getUnitGps",
           type: 'GET',
           dataSrc: '',
           data : {unitPlate :  data },
            error: function(response) {
				console.log("ssali bien");
                console.log("SOY el id en table" +JSON.stringify(response));
            }
         },
          columns: [
            {data: 'fecha', visible: true},
			{data: 'latitud', visible: true},       
			{data: 'longitud', visible: true},
			{data: 'odometro', visible: true},
			{data: 'kilometros_hoy', visible: true},
			{data: 'nivel_combustible_1', visible: true},
			{data: 'lts_combustible_1', visible: true},
        ],
     }).draw();
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

/** MODAL CREATE UNIT */
const openCreatePopup = () => {
    $("#createUnit").css('display', 'flex')
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

/** UTILS */
const closePopups = () => {
    $("#unitInsurance").css('display', 'none')
    $("#unitDocuments").css('display', 'none')
    $("#editUnit").css('display', 'none')
    $("#createUnit").css('display', 'none')
    $("#editValidity").css('display', 'none')
    $("#createGPS").css('display', 'none')
    $("#createAditonalCost").css('display', 'none')
    $("#createAditional").css('display', 'none')
    $("#addDocuments").css('display', 'none')
    $("#editAditonalG").css('display', 'none')
    $("#createAditional").css('display', 'none')
     $("#editAditonalG").css('display', 'none')
    
}

const closeViews = () => {
    $('.general').css('display', 'none')
    $('.insurance').css('display', 'none')
    $('.validity').css('display', 'none')
    $('.permission').css('display', 'none')
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
	$("#unitDocuments").css('display', 'none')
    $("#editValidity").css('display', 'flex')
    $("#checklistId").val(type);
}
$("#editValidity").on('click', () => {
    deactivateViews()
    $("#editValidity").addClass('active')
    $('.validity').css('display', 'flex')
})

$(document).ready(function() {
	$('.js-example-basic-single').select2();
});

function fillIncidents() {
	if($("#editUnitStatus").val() == 6) {
		$("#m3").css('display', 'none')
		$("#m1").css('display', 'none')
		$("#m2").css('display', 'none')
		$("#d1").css('display', 'none')
		$("#r1").css('display', 'none')
	    $("#r2").css('display', 'none')
	    $("#r3").css('display', 'none')
	    $("#r4").css('display', 'none')
	    $("#r5").css('display', 'none')	 
	    $("#o1").css('display', 'none')
	    $("#o2").css('display', 'none')   
	    $("#s1").css('display', 'flex')
	    $("#s2").css('display', 'flex')
	    $("#s3").css('display', 'flex')
	    $("#s4").css('display', 'flex')
	    $("#s5").css('display', 'flex')
	}else if ($("#editUnitStatus").val() == 7){
		$("#m3").css('display', 'none')
		$("#m1").css('display', 'none')
		$("#m2").css('display', 'none')
		$("#d1").css('display', 'none')
		$("#s1").css('display', 'none')
	    $("#s2").css('display', 'none')
	    $("#s3").css('display', 'none')
	    $("#s4").css('display', 'none')
	    $("#s5").css('display', 'none')
	    $("#o1").css('display', 'none')
	    $("#o2").css('display', 'none')
		$("#r1").css('display', 'flex')
	    $("#r2").css('display', 'flex')
	    $("#r3").css('display', 'flex')
	    $("#r4").css('display', 'flex')
	    $("#r5").css('display', 'flex')
	}else if ($("#editUnitStatus").val() == 5){
		$("#m3").css('display', 'none')
		$("#m1").css('display', 'none')
		$("#m2").css('display', 'none')
		$("#d1").css('display', 'none')
		$("#s1").css('display', 'none')
	    $("#s2").css('display', 'none')
	    $("#s3").css('display', 'none')
	    $("#s4").css('display', 'none')
	    $("#s5").css('display', 'none')
		$("#r1").css('display', 'none')
	    $("#r2").css('display', 'none')
	    $("#r3").css('display', 'none')
	    $("#r4").css('display', 'none')
	    $("#r5").css('display', 'none')
	    $("#o1").css('display', 'flex')
	    $("#o2").css('display', 'flex')
	}else if ($("#editUnitStatus").val() == 1){
		$("#m3").css('display', 'none')
		$("#m1").css('display', 'none')
		$("#m2").css('display', 'none')
		$("#s1").css('display', 'none')
	    $("#s2").css('display', 'none')
	    $("#s3").css('display', 'none')
	    $("#s4").css('display', 'none')
	    $("#s5").css('display', 'none')
		$("#r1").css('display', 'none')
	    $("#r2").css('display', 'none')
	    $("#r3").css('display', 'none')
	    $("#r4").css('display', 'none')
	    $("#r5").css('display', 'none')
	    $("#o1").css('display', 'none')
	    $("#o2").css('display', 'none')
		$("#d1").css('display', 'flex')
	}else if ($("#editUnitStatus").val() == 4){
		$("#s1").css('display', 'none')
	    $("#s2").css('display', 'none')
	    $("#s3").css('display', 'none')
	    $("#s4").css('display', 'none')
	    $("#s5").css('display', 'none')
		$("#r1").css('display', 'none')
	    $("#r2").css('display', 'none')
	    $("#r3").css('display', 'none')
	    $("#r4").css('display', 'none')
	    $("#r5").css('display', 'none')
	    $("#o1").css('display', 'none')
	    $("#o2").css('display', 'none')
	    $("#d1").css('display', 'none')
		$("#m1").css('display', 'flex')
		$("#m2").css('display', 'flex')
		$("#m3").css('display', 'flex')
	}else {
		$("#s1").css('display', 'none')
	    $("#s2").css('display', 'none')
	    $("#s3").css('display', 'none')
	    $("#s4").css('display', 'none')
	    $("#s5").css('display', 'none')
		$("#r1").css('display', 'none')
	    $("#r2").css('display', 'none')
	    $("#r3").css('display', 'none')
	    $("#r4").css('display', 'none')
	    $("#r5").css('display', 'none')
	    $("#o1").css('display', 'none')
	    $("#o2").css('display', 'none')
	    $("#d1").css('display', 'none')
	    $("#m1").css('display', 'none')
		$("#m2").css('display', 'none')
		$("#m3").css('display', 'none')
	}
}

function fillIncidents2() {
	if($("#createUnitState").val() == 6) {
		$("#cr1").css('display', 'none')
	    $("#cr2").css('display', 'none')
	    $("#cr3").css('display', 'none')
	    $("#cr4").css('display', 'none')
	    $("#cr5").css('display', 'none')
	    $("#co1").css('display', 'none')
	    $("#co2").css('display', 'none')	    
	    $("#cs1").css('display', 'flex')
	    $("#cs2").css('display', 'flex')
	    $("#cs3").css('display', 'flex')
	    $("#cs4").css('display', 'flex')
	    $("#cs5").css('display', 'flex')
	}else if ($("#createUnitState").val() == 7){
		$("#cs1").css('display', 'none')
	    $("#cs2").css('display', 'none')
	    $("#cs3").css('display', 'none')
	    $("#cs4").css('display', 'none')
	    $("#cs5").css('display', 'none')
	    $("#co1").css('display', 'none')
	    $("#co2").css('display', 'none')
		$("#cr1").css('display', 'flex')
	    $("#cr2").css('display', 'flex')
	    $("#cr3").css('display', 'flex')
	    $("#cr4").css('display', 'flex')
	    $("#cr5").css('display', 'flex')
	}else if ($("#createUnitState").val() == 5){
		$("#cs1").css('display', 'none')
	    $("#cs2").css('display', 'none')
	    $("#cs3").css('display', 'none')
	    $("#cs4").css('display', 'none')
	    $("#cs5").css('display', 'none')
		$("#cr1").css('display', 'none')
	    $("#cr2").css('display', 'none')
	    $("#cr3").css('display', 'none')
	    $("#cr4").css('display', 'none')
	    $("#cr5").css('display', 'none')
	    $("#co1").css('display', 'flex')
	    $("#co2").css('display', 'flex')
	}else {
		$("#cs1").css('display', 'none')
	    $("#cs2").css('display', 'none')
	    $("#cs3").css('display', 'none')
	    $("#cs4").css('display', 'none')
	    $("#cs5").css('display', 'none')
		$("#cr1").css('display', 'none')
	    $("#cr2").css('display', 'none')
	    $("#cr3").css('display', 'none')
	    $("#cr4").css('display', 'none')
	    $("#cr5").css('display', 'none')
	    $("#co1").css('display', 'none')
	    $("#co2").css('display', 'none')
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
    



