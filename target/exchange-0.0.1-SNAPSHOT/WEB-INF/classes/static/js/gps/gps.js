$(document).ready(() => {
    configDataTable();
	initComponents();
});

const configDataTable = () => {
    $("#correctiveTable").DataTable({
        dom: `
            <'row table-header'<'col-sm-4 table-btn'B><'col-sm-4 table-search'f>>
            <'row'<'col-sm-20 table-content'tr>>
            <'row table-footer'<'col-sm-7 table-pag'p>>
        `,
        fixedHeader: true,
        responsive: true,
        autoWidth: true,
        ajax: {
            url: "gps/getDataTable",
            type: 'GET',
            dataSrc: '',
            error: ( response ) => console.log("Error: " + response),
        },
        columns: [
            {data: 'unidad', visible: true},
            {
                data: 'status_viaje',
                visible: true,
                render: function(data, type, row) {
                  if (data === 0) return 'Sin viaje';
                  if (data === 2) return 'En viaje';
                  return data; // por si hay otros valores, los dejamos como están
                }
              },
            {data: 'kilometros_hoy', visible: true},
            {
                data: 'viaje_referencia',
                visible: true,
                render: function(data) {
                  return data ? data : 'Sin folio';
                }
              },              
            {data: 'horometro', visible: true},          
            {data: 'fecha_registro', visible: true},

            {
              data: 'viaje_min_detenido_total',
              visible: true,
              render: function(data) {
                if (data == null || isNaN(data)) return '0 h';
                return (data / 60).toFixed(2) + ' h';
              }
            },
            {
              data: 'viaje_min_transcurrido',
              visible: true,
              render: function(data) {
                if (data == null || isNaN(data)) return '0 h';
                return (data / 60).toFixed(2) + ' h';
              }
            },                        
{
                data: 'motor',
                visible: true,
                render: function(data, type, row) {
                  if (data === 0) return 'Apagado';
                  if (data === 1) return 'Encendido';
                  return data; // por si hay otros valores, los dejamos como están
                }
              },
              {data: 'ralenti_actual', visible: true},

            {
                data: 'unidad',
                visible: true,
                render: function(data, type, row) {
                  if (row.latitud && row.longitud) {
                    return `
                      <a href="https://www.google.com/maps?q=${row.latitud},${row.longitud}" 
                         target="_blank" 
                         style="text-decoration: none; color: #007bff;">
                        <span style="font-size: 1rem;">📍</span> <strong>${data}</strong>
                      </a>`;
                  }
                  return `<span style="color: gray;">Sin coordenadas</span>`;
                }
              },              
			
        ]
    })
};

