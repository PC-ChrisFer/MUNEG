//@ts-check

import { APIConnection } from "../../APIConnection.js";
import {
  API_SUCESS_REQUEST,
  GET_METHOD,
  SERVER,
} from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

const API_TIPO_USUARIO = SERVER + "privada/tipo_usuario.php?action=";
const API_EMPLEADO = SERVER + "privada/empleado.php?action=";

//Obtener los datos de combobox tipo usuario
export async function fillTipoUsuarioCombobox() {
  //Se crea un endpoint especifico para el caso de leer tipo de usuario
  let APIEndpoint = API_TIPO_USUARIO + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById(
        "cmbtipo_usuario_update"
      ).innerHTML += `<option value="${element.id_tipo_usuario}" > ${element.nombre_tipo} </option>`;
    });
    return;
  }
}

//Obtener los datos de combobox empleado
export async function fillEmpleadoCMB() {
  //Se crea un endpoint especifico para el caso de leer empleado
  let APIEndpoint = API_EMPLEADO + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById(
        "cmb_empleado_update"
      ).innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;
    });
    return;
  }
}

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableUsarios(dataset) {
  let content = "";
  console.log(dataset)
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
            <tr>
                <td>${row.nombre_usuario}</td>
                <td>${row.nombre_tipo}</td>
                <td>${row.apellido}, ${row.nombre}</td>
                <td class="d-flex justify-content-center">
                 <a onclick="guardarDatosUpdate(${row.id_usuario}, '${row.nombre_usuario}','${row.id_empleado}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
                   <img  src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                 <a onclick="guardarDatosDelete(${row.id_usuario})" class="btn edit_add_deleteButtons delete"  id="button_ver_mas">
                   <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
                </td>
            </tr>
          `;
  });
  //Se inserta las información de la tabla a un elemento html
  getElementById("tbody-usuario").innerHTML = content;
}
