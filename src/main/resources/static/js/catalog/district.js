$(document).ready(() => {
    configDataTable();
	initComponents();
	console.log('globalUserId:', globalUserId);
    console.log('globalUserName:', globalUserName);
});

const configDataTable = () => {
    $("#originsTable").DataTable({
        dom: `
            <'row table-header'<'col-sm-4 table-btn'B><'col-sm-4 table-search'f>>
            <'row'<'col-sm-20 table-content'tr>>
            <'row table-footer'<'col-sm-7 table-pag'p>>
        `,
        fixedHeader: true,
        responsive: true,
        autoWidth: true,
        ajax: {
            url: "distric/getDataTable",
            type: 'GET',
            dataSrc: '',
            error: ( response ) => console.log("Error: " + response),
        },
        columns: [
            {data: 'districtId', visible: true},
			{data: 'districtNameResponsible', visible: true},
            {data: 'districtName', visible: true},
            {data: 'districtNameCharge', visible: true},
            {data: 'districtId', render: (data) => `<button onclick="openEditPopup('${ data }')"> Editar Distrito </button>` },
			{data: 'districtId', render: (data) => `<button onclick="openUnitPopup('${ data }')"> Visualizar Unidades </button>` },

        ]
    })
};


const openUnitPopup = (data) => {
	configLoanTable2(data);
    $("#createBallot").css('display', 'flex')
    $("#editId").val(data);
    console.log("soy el valor id al entrar en table "+data)
}

const configLoanTable2 = (data) => {
    console.log("si entro");
        $("#ballotTable").DataTable().destroy();
        $("#ballotTable").DataTable({
            dom: "<'row'<'col-sm-5 'l><'col-sm-1 '>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7 text-right'p>>",
            fixedHeader: true,
            responsive: true,
            autoWidth: true,
            pageLength: 5, // Aquí estableces el número de entradas por página
            ajax: {
               url: "district/getDataTableUnit",
               type: 'GET',
               dataSrc: '',
               data : {districtId :  data },
                error: function(response) {
                    console.log("ssali bien");
                    console.log("SOY el id en table" +JSON.stringify(response));
                }
             },
              columns: [
                {data: 'unitEconomicNumber', visible: true},
                {data: 'unitModel', visible: true},       
                {data: 'unitBrand', visible: true},  
                {data: 'unitPlate', visible: true},
    
            
                
            ],
         }).draw();
    }


const initComponents = () => {
	// Formulario de edición
	$("#editOriginsForm").submit(() => {
		var formData = new FormData();
		formData.append('districtId', $("#editId").val());
		formData.append('districtName', $("#editDistrict").val());
		formData.append('districtNameResponsible', $("#editNameResponsible").val());
		formData.append('districtNameCharge', $("#editNameCharge").val());
		formData.append('districtNameCharge2', $("#editNameCharge2").val());
		formData.append('idUser', $("#globalUserId").val());
		formData.append('userName', $("#globalUserName").val());
		formData.append('operation', "UPDATE");
 
		$.ajax({
			type: "POST",
			url: "district/updateDistrict",
			cache: false,
			contentType: false,
			processData: false,
			data: formData,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		});
		return false;
	});
 
	// Formulario de creación
	$("#createOriginsForm").submit(() => {
		var formData = new FormData();
		formData.append('districtName', $("#createDistrict").val());
		formData.append('districtNameResponsible', $("#createNameResponsible").val());
		formData.append('districtNameCharge', $("#createNameCharge").val());
		formData.append('districtNameCharge2', $("#createNameCharge2").val());
		formData.append('idUser', $("#globalUserId").val());
		formData.append('userName', $("#globalUserName").val());
		formData.append('operation', "INSERT");
 
		$.ajax({
			type: "POST",
			url: "district/updateDistrict",
			cache: false,
			contentType: false,
			processData: false,
			data: formData,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		});
		return false;
	});
 };
 

/** MODAL CREATE OPERATOR */
const openCreatePopup = () => {
    $("#createOrigin").css('display', 'flex')
}
// Dynamic View Create General
$("#createGeneral").on('click', () => {
    deactivateViews()
    $("#createGeneral").addClass('active')
    $('.general').css('display', 'flex')
})

/** MODAL EDIT OPERATOR */
const openEditPopup = (data) => {
    $("#editOrigins").css('display', 'flex')
	$("#editId").val(data);
	$.ajax({
		type: "GET",
		url: "district/getSingle",
		data: {
			districtId : data,
		},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success: ( response ) => {
			 $("#editDistrict").val(response.districtName);
			 $("#editNameResponsible").val(response.districtNameResponsible);
		     $("#editNameCharge").val(response.districtNameCharge);
		     $("#editNameCharge2").val(response.districtNameCharge2);


	
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
/** UTILS */
const closePopups = () => {
    $("#createOrigin").css('display', 'none')
    $("#createBallot").css('display', 'none')
    $("#editOrigins").css('display', 'none')
}

const closeViews = () => {
    $('.general').css('display', 'none')
}

const deactivateViews = () => {
    closeViews()
    $('button').removeClass("active")
};

function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
$(document).ready(function() {
	$('.js-example-basic-single').select2();
});