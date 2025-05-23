$(document).ready(() => {
    configDataTable();
	initComponents();
});

const configDataTable = () => {
    $("#routeTable").DataTable({
        dom: `
            <'row table-header'<'col-sm-4 table-btn'B><'col-sm-4 table-search'f>>
            <'row'<'col-sm-20 table-content'tr>>
            <'row table-footer'<'col-sm-7 table-pag'p>>
        `,
        fixedHeader: true,
        responsive: true,
        autoWidth: true,
        ajax: {
            url: "routeVilla/getDataTable",
            type: 'GET',
            dataSrc: '',
            error: (response) => console.log("Error: " + response),
        },
        columns: [
            { data: 'routeId', visible: true },
            { data: 'routeName', visible: true },
            { data: 'routeClientName', visible: true },
            { data: 'routeTypeEco', visible: true },
            { 
                data: 'routeCostService', 
                visible: true,
                render: (data) => {
                    // Formatear el costo como moneda
                    return formatCurrency(data);
                }
            },
            { 
                data: 'routeId', 
                render: (data) => `<button onclick="openEditPopup('${data}')"> Editar Ruta </button>` 
            },
            { 
                data: 'routeId', 
                render: (data) => `<button onclick="generarCost('${data}')"> Generar Costos </button>` 
            },
        ]
    });

};


const generarCost = (routeId) => new Promise((resolve, reject) => {
    console.log(routeId);
    $.ajax({
        type: "POST",
        url: "routeVilla/calculate", // Cambia esto a la URL correcta de tu API
        data: JSON.stringify({
            routeId: routeId,
        }),
        contentType: "application/json; charset=UTF-8",
        success: (response) => resolve(response),
        error: (response) => reject(response),
    });
});



// Función para formatear el número como moneda
const formatCurrency = (value) => {
    if (value === null || value === undefined) {
        return '$0.00'; // O cualquier valor por defecto que desees
    }
    
    // Convertir a número
    const number = parseFloat(value);
    
    // Verificar si es un número válido
    if (isNaN(number)) {
        return '$0.00'; // O manejar el error según sea necesario
    }
    
    // Formatear el número con el símbolo de dólar y comas
    return '$' + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


const initComponents = () => {
	$("#editRouteForm").submit( () => {
		var formData = new FormData(); 
        formData.append('routeId', $("#editId").val());

		formData.append('routeOriginId', $("#editLocalityOrigin").val());
		formData.append('routeOriginName', $("#editOriginName").val());
		formData.append('routeDestinyId', $("#editLocalityDestination").val());
		formData.append('routeDestinyName', $("#editDestinyName").val());
		formData.append('routeName', $("#editCombinedRoute").val());
		formData.append('routeKm', $("#editKm").val());
		formData.append('routeTime', $("#editTime").val());
		formData.append('routePriceCass', $("#editPriceCass").val());
		formData.append('routePetrol', $("#editPetrol").val());
        formData.append('routeTypeEco', $("#editTypeEco").val());
        formData.append('routeCostService', $("#editCostService").val());

        formData.append('routeOriginIdGps', $("#editOriginGPS").val());
        formData.append('routeDestinyIdGps', $("#editDestinyGPS").val());


        

		formData.append('idUser', $("#globalUserId").val());
		formData.append('userName', $("#globalUserName").val());
		formData.append('operation', "UPDATE");

/**/
   		$.ajax({
			type: "POST",
			url: "routeVilla/updateRoute",
			cache : false, 
			contentType : false,
			processData : false,
			data : formData,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		});/**/
		return false;
	});
	
	$("#createRouteForm").submit( () => {
		var formData = new FormData(); 

		formData.append('routeOriginId', $("#createLocalityOrigin").val());
		formData.append('routeOriginName', $("#createOriginName").val());
		formData.append('routeDestinyId', $("#createLocalityDestination").val());
		formData.append('routeDestinyName', $("#createDestinyName").val());
		formData.append('routeName', $("#combinedRoute").val());
		formData.append('routeKm', $("#createKm").val());
		formData.append('routeTime', $("#createTime").val());
		formData.append('routePriceCass', $("#createPriceCass").val());
		formData.append('routePetrol', $("#createPetrol").val());
		formData.append('routeTypeEco', $("#createTypeEco").val());

        formData.append('routeClientId', $("#createClient").val());
        formData.append('routeClientName', $("#createClientName").val());
        formData.append('routeCostService', $("#createCostService").val());

        formData.append('routeOriginIdGps', $("#createOriginGPS").val());
        formData.append('routeDestinyIdGps', $("#createDestinyGPS").val());

        formData.append('routeType', 'SEN');


		formData.append('idUser', $("#globalUserId").val());
		formData.append('userName', $("#globalUserName").val());
		formData.append('operation', "INSERT");

		
		$.ajax({
			type: "POST",
			url: "routeVilla/updateRoute",
			cache : false, 
			contentType : false,
			processData : false,
			data : formData,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		});
		return false;
	});
};

/** MODAL CREATE OPERATOR */
const openCreatePopup = () => {
    $("#createRoute").css('display', 'flex')
}
// Dynamic View Create General
$("#createGeneral").on('click', () => {
    deactivateViews()
    $("#createGeneral").addClass('active')
    $('.general').css('display', 'flex')
})


/** MODAL EDIT OPERATOR */
const openEditPopup = (data) => {
    $("#editRoute").css('display', 'flex'); 

    $("#editId").val(data);
    $.ajax({
        type: "GET",
        url: "routeVilla/getSingleRoute",
        data: {
            routeId: data,
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: (response) => {
            // Llenar los campos del formulario con los datos obtenidos
            $("#editLocalityOrigin").val(response.routeOriginId);
            $("#editOriginName").val(response.routeOriginName);
            $("#editLocalityDestination").val(response.routeDestinyId);
            $("#editDestinyName").val(response.routeDestinyName);
            $("#editCombinedRoute").val(response.routeName);
            $("#editKm").val(response.routeKm);
            $("#editTime").val(response.routeTime);
            $("#editPriceCass").val(response.routePriceCass);
            $("#editPetrol").val(response.routePetrol);
            $("#editCostService").val(response.routeCostService);
            $("#editClientName").val(response.routeClientName);
            $("#editTypeEco").val(response.routeTypeEco);

            $("#editOriginGPS").val(response.routeOriginIdGps);
            $("#editDestinyGPS").val(response.routeDestinyIdGps);


            
            $("#editLocalityOrigin").show();
            $("#editOriginName").show();
            $("#editLocalityDestination").show();
            $("#editDestinyName").show();
        },
        error: (response) => {
            console.log("Error: " + JSON.stringify(response));
        },
    });
};

// Dynamic View Edit General
$("#editGeneral").on('click', () => {
    deactivateViews()
    $("#editGeneral").addClass('active')
    $('.general').css('display', 'flex')
})

/** UTILS */
const closePopups = () => {
    $("#createRoute").css('display', 'none')
    $("#editRoute").css('display', 'none')
}

const closeViews = () => {
    $('.general').css('display', 'none')
}

const deactivateViews = () => {
    closeViews()
    $('button').removeClass("active")
};
$(document).ready(function() {
	$('.js-example-basic-single').select2();
});

const updateCombinedField = () => {
    var origin = document.getElementById("createOriginName").value;
    var destination = document.getElementById("createDestinyName").value;
    var combinedRoute = origin && destination ? origin + " - " + destination : "";
    document.getElementById("combinedRoute").value = combinedRoute;
};

const fillOriginCreate = () => {
    if($("#createLocalityOrigin").val() != 0) {
        $.ajax({
            type: "GET",
            url: "routeVilla/getSingleDestiny",
            data: {
                destinyId : $("#createLocalityOrigin").val(),
            },
            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            success: (response) => {
                $("#createOriginName").val(response.destinyLocation);
                $("#createOriginGPS").val(response.destinyIdGps);
                updateCombinedField(); // Llamar a updateCombinedField después de que se haya llenado createOriginName
            },
            error: (response) => console.log("Error: " + response),
        });
    }
};

const fillDestinyCreate = () => {
    if($("#createLocalityDestination").val() != 0) {
        $.ajax({
            type: "GET",
            url: "routeVilla/getSingleDestiny",
            data: {
                destinyId : $("#createLocalityDestination").val(),
            },
            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            success: (response) => {
                $("#createDestinyName").val(response.destinyLocation);
                $("#createDestinyGPS").val(response.destinyIdGps);

                updateCombinedField(); // Llamar a updateCombinedField después de que se haya llenado createDestinyName
            },
            error: (response) => console.log("Error: " + response),
        });
    }
};
const updateCombinedFieldEdit = () => {
    var origin = document.getElementById("editOriginName").value;
    var destination = document.getElementById("editDestinyName").value;
    var combinedRoute = origin && destination ? origin + " - " + destination : "";
    document.getElementById("editCombinedRoute").value = combinedRoute;
};

const fillOriginEdit = () => {
    if($("#editLocalityOrigin").val() != 0) {
        $.ajax({
            type: "GET",
            url: "routeVilla/getSingleDestiny",
            data: {
                destinyId: $("#editLocalityOrigin").val(),
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: (response) => {
                $("#editOriginName").val(response.destinyLocation);
                updateCombinedFieldEdit(); // Actualizar la ruta combinada
            },
            error: (response) => console.log("Error: " + response),
        });
    }
};

const fillDestinyEdit = () => {
    if($("#editLocalityDestination").val() != 0) {
        $.ajax({
            type: "GET",
            url: "routeVilla/getSingleDestiny",
            data: {
                destinyId: $("#editLocalityDestination").val(),
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: (response) => {
                $("#editDestinyName").val(response.destinyLocation);
                updateCombinedFieldEdit(); // Actualizar la ruta combinada
            },
            error: (response) => console.log("Error: " + response),
        });
    }
};



const fillName = () => {
    const clientId = parseInt($("#createClient").val(), 10); // Asegúrate de convertir a número
    if(clientId !== 0) {
        $.ajax({
            type: "GET",
            url: "routeVilla/getSingleClient",
            data: { clientId: clientId }, // Se pasa como número
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: (response) => {
                $("#createClientName").val(response.clientBusinessName);
            },
            error: (response) => console.log("Error: " + response),
        });
    }
};

const fillNameEdit = () => {
    if($("#editClient").val() != 0) {
        $.ajax({
            type: "GET",
            url: "routeVilla/getSingleClient",
            data: {
                clientId : $("#editClient").val(),
            },
            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            success: (response) => {
                $("#editClientName").val(response.clientBusinessName);
            },
            error: (response) => console.log("Error: " + response),
        });
    }
};