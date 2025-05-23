$(document).ready(() => {
    configDataTable();
	initComponents();
});

const configDataTable = () => {
    $("#destinyTable").DataTable({
        dom: `
            <'row table-header'<'col-sm-4 table-btn'B><'col-sm-4 table-search'f>>
            <'row'<'col-sm-20 table-content'tr>>
            <'row table-footer'<'col-sm-7 table-pag'p>>
        `,
        fixedHeader: true,
        responsive: true,
        autoWidth: true,
        ajax: {
            url: "destinyPoza/getDataTable",
            type: 'GET',
            dataSrc: '',
            error: ( response ) => console.log("Error: " + response),
        },
        columns: [
            {data: 'destinyId', visible: true},
			{data: 'destinyLocation', visible: true},
            {data: 'destinyLatitud', visible: true},
			{data: 'destinyLongitud', visible: true},
			

            {data: 'destinyId', render: (data) => `<button onclick="openEditPopup('${ data }')"> Editar Destino </button>` },
        ]
    })
};

const initComponents = () => {
	$("#editDestinyForm").submit( () => {
		var formData = new FormData(); 
		formData.append('destinyId', $("#editId").val());
		formData.append('destinyLocation', $("#editLocation").val());
		formData.append('destinyLatitud', $("#editLatitud").val());
		formData.append('destinyLongitud', $("#editLongitud").val());
		formData.append('destinyKeyState', $("#editKeyState").val());
		formData.append('destinyCodePostal', $("#editCodePostal").val());
		formData.append('destinyMunicipality', $("#editMunicipality").val());
		formData.append('destinyColonia', $("#editColonia").val());
		formData.append('destinyStreet', $("#editStreet").val());
		formData.append('destinyOutside', $("#editOutside").val());
		formData.append('destinyInside', $("#editInside").val());
		formData.append('destinyCountry', $("#editCountry").val());


        formData.append('destinyNomMuni', $("#reNomMunicipio").val());
        formData.append('destinyNomCol', $("#reNomColonia").val());
        formData.append('destinyNomEst', $("#reNomClaveEstado").val());

		formData.append('idUser', $("#globalUserId").val());
        formData.append('userName', $("#globalUserName").val());

		formData.append('operation', "UPDATE");

/**/
   		$.ajax({
			type: "POST",
			url: "destinyPoza/updateDestiny",
			cache : false, 
			contentType : false,
			processData : false,
			data : formData,
			success: (response) => manageResponse(response),
			error: (response) => manageResponse(response)
		});/**/
		return false;
	});
	
	$("#createDestinyForm").submit( () => {
		var formData = new FormData(); 
		formData.append('destinyLocation', $("#createLocation").val());
		formData.append('destinyLatitud', $("#createLatitud").val());
		formData.append('destinyLongitud', $("#createLongitud").val());
		formData.append('idUser', $("#globalUserId").val());
        formData.append('userName', $("#globalUserName").val());
		formData.append('destinyLocat', 'Poza');

		formData.append('operation', "INSERT");
	
		
		$.ajax({
			type: "POST",
			url: "destinyPoza/updateDestiny",
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
    $("#createDestiny").css('display', 'flex')
}
// Dynamic View Create General
$("#createGeneral").on('click', () => {
    deactivateViews()
    $("#createGeneral").addClass('active')
    $('.general').css('display', 'flex')
})


/** MODAL EDIT OPERATOR */
const openEditPopup = (data) => {
    $("#editDestiny").css('display', 'flex')

	$("#editId").val(data);
	$.ajax({
		type: "GET",
		url: "destinyPoza/getSingleDestiny",
		data: {
			destinyId : data,
		},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success: ( response ) => {
		    $("#editLocation").val(response.destinyLocation);
			$("#editLatitud").val(response.destinyLatitud);
			$("#editLongitud").val(response.destinyLongitud);

			$("#editStreet").val(response.destinyStreet);
            $("#editOutside").val(response.destinyOutside);
            $("#editInside").val(response.destinyInside);
            $("#editCountry").val(response.destinyCountry);

            $("#reNomMunicipio").val(response.destinyNomMuni);
            $("#reNomColonia").val(response.destinyNomCol);
            $("#reNomClaveEstado").val(response.destinyNomEst);

			$("#editKeyState").val(response.destinyKeyState).trigger('change'); // Establecer estado

            fillCodigoPostal(() => {
                $("#editCodePostal").val(response.destinyCodePostal).trigger('change'); // Establecer código postal

                fillMunicipio(() => {
                    $("#editMunicipality").val(response.destinyMunicipality).trigger('change'); // Establecer municipio

                    fillColonia(() => {
                        $("#editColonia").val(response.destinyColonia).trigger('change'); // Establecer colonia
                    });
                });
            });
		},
		error: ( response ) => console.log("Error: " + JSON.stringify(response)),
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
    $("#createDestiny").css('display', 'none')
    $("#editDestiny").css('display', 'none')
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

function fillCodigoPostal(callback) {
    if ($("#editKeyState").val() != 0) {
        $.ajax({
            type: "GET",
            url: "destinyPoza/getCoPos",
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
            url: "destinyPoza/getMun",
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
            url: "destinyPoza/getCol",
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

