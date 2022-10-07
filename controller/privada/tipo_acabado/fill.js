import { getElementById } from "../../constants/helpers.js";

let tiposAcabados = []
//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableGestionAcabado(dataset) {
    let content = "";
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map((row) => {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += ` 
             <tr>
             <td>${row.nombre_tipo}</td>
             <td>${row.visibilidad}</td>
             <td class="d-flex justify-content-center">
             <a onclick="guardarDatosUpdate(${row.id_tipo_acabado},${row.visibilidad},'${row.nombre_tipo}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
               <img  src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
             <a onclick="guardarDatosDelete(${row.id_tipo_acabado})" class="btn edit_add_deleteButtons delete"  id="button_ver_mas">
               <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
             <a onclick="generarReporteTipoAcabado(${row.id_tipo_acabado})" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">Generar Reporte</a>
         </td>
         </tr>
        `;

        // cargando todos los ID tipo acabado en el array
        tiposAcabados.push(row.id_tipo_acabado)
    });
    //Se inserta las información de la tabla a un elemento html
    getElementById("tbody-tipo-acabado").innerHTML = content;
}