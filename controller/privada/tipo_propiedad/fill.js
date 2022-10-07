import { APIConnection } from "../../APIConnection.js";
import { API_SUCESS_REQUEST, GET_METHOD, SERVER } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

const API_GESTION_TIPO_PROPIEDAD = SERVER + "privada/tipo_propiedad.php?action=";

let IDsTiposPropiedad = [];

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableTipoPropiedad(dataset) {
    let content = "";
    console.log(dataset);
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map((row) => {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += ` 
               <tr>
               <td>${row.nombre_tipo}</td>
               <td>${row.visibilidad}</td>
               <td class="d-flex justify-content-center">
               <a onclick="guardarDatosUpdate(${row.id_tipo_propiedad},${row.visibilidad},'${row.nombre_tipo}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
                 <img  src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
               <a onclick="guardarDatosDelete(${row.id_tipo_propiedad})" class="btn edit_add_deleteButtons delete"  id="button_ver_mas">
                 <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
                      <a onclick="generarReporteTipoPropiedad(${row.id_tipo_propiedad})" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">Generar Reporte</a>
           </td>
           </tr>
          `;

        IDsTiposPropiedad.push(row.id_tipo_propiedad)
    });
    //Se inserta las información de la tabla a un elemento html
    getElementById("tbody-tipo-propiedad").innerHTML = content;
};


//Obtener los datos de combobox categoria
export async function fillCategoriaCombobox(fieldID) {
    //Se crea un endpoint especifico para el caso de leer categoria
    let APIEndpoint = API_GESTION_TIPO_PROPIEDAD + "readAllCategorias";
    //Se utiliza como api connection para realizar la consulta
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    if (APIResponse.status == API_SUCESS_REQUEST) {
        //Obtiene todos los valores y los ordena en un array, presentandolos en el select
        APIResponse.dataset.map((element) => {
            getElementById(
                fieldID
            ).innerHTML += `<option value="${element.id_categoria}" > ${element.nombre_categoria} </option>`;
        });
        return;
    }
};
