//@ts-check
import { APIConnection } from "../../APIConnection.js";
import {
  API_SUCESS_REQUEST,
  GET_METHOD,
  SERVER,
} from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

const API_TIPO_ACABADO = SERVER + "privada/tipo_acabado.php?action=";
const API_MUNICIPIO = SERVER + "privada/municipios.php?action=";
const API_TIPO_PROPIEDAD = SERVER + "privada/tipo_propiedad.php?action=";
const API_EMPLEADO = SERVER + "privada/empleado.php?action=";
const API_INQUILINOS = SERVER + "privada/inquilino.php?action=";
const API_PROPIETARIO = SERVER + "privada/propietario.php?action=";

//Obtener los datos de combobox tipo inquilino
export function fillTablePropiedad(dataset) {
  //Se define el contenido html
  let content = "";

  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
        <tr>
            <td><img src="${row.imagen}" width="50%" height="50%"></td>
            <td>${row.direccion ?? "NO ASIGNADA"}</td>
            <td>${row.codigo ?? "NO ASIGNADO"}</td>
            <td>${row.precio ?? "NO ASIGNADO"}</td>
            <td>${row.alquiler ?? "NO ASIGNADO"}</td>
            <td>${row.descripcion ?? "NO ASIGNADO"}</td>
            <td>${row.habitaciones ?? "NO ASIGNADO"}</td>
            <td>${row.plantas ?? "NO ASIGNADO"}</td>
            <td class="d-flex justify-content-center">
              <a onclick="guardarDatosUpdate(${row.id_propiedad},'${
      row.direccion
    }','${row.area_propiedad}','${row.area_contruccion}','${row.codigo}','${
      row.precio
    }','${row.alquiler}','${row.habitaciones}','${row.plantas}','${
      row.sanitario
    }','${row.espacio_parqueo}','${row.descripcion}','${row.visibilidad}', '${
      row.id_tipo_acabado
    }', '${row.id_municipio}', '${row.id_tipo_propiedad}', '${
      row.id_inquilino
    }', '${row.id_empleado}','${row.imagen}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
                <img  src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;" ></a>
              <a onclick="guardarDatosDelete(${
                row.id_propiedad
              })" class="btn edit_add_deleteButtons delete"  id="button_ver_mas">
                <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
            </td>
         </tr>
              `;
  });
  // Se muestran cada filas de los registros
  getElementById("tbody-propiedad").innerHTML = content;
}

//Obtener los datos de combobox tipo acabado
export async function fillTipoAcabado() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_TIPO_ACABADO + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById(
        "cmb_tipo_acabado_update"
      ).innerHTML += `<option value="${element.id_tipo_acabado}" > ${element.nombre_tipo} </option>`;
      getElementById(
        "cmb_tipo_acabado"
      ).innerHTML += `<option value="${element.id_tipo_acabado}" > ${element.nombre_tipo} </option>`;
    });
    return;
  }
}

//Obtener los datos de combobox tipo municipio
export async function fillMunicipio() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_MUNICIPIO + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById(
        "cmb_municipio_update"
      ).innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;
      getElementById(
        "reporte_municipio_combobox"
      ).innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;
      getElementById(
        "cmb_municipio"
      ).innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;
    });
    return;
  }
}

//Obtener los datos de combobox tipo propiedad
export async function fillTipoPropiedad() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_TIPO_PROPIEDAD + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById(
        "cmb_tipo_propiedad_update"
      ).innerHTML += `<option value="${element.id_tipo_propiedad}" > ${element.nombre_tipo} </option>`;
      getElementById(
        "cmb_tipo_propiedad"
      ).innerHTML += `<option value="${element.id_tipo_propiedad}" > ${element.nombre_tipo} </option>`;
    });
    return;
  }
}

//Obtener los datos de combobox empleaado
export async function fillEmpleado() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_EMPLEADO + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById(
        "cmb_empleado_update"
      ).innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;
      getElementById(
        "cmb_empleado"
      ).innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;
    });
    return;
  }
}

//Obtener los datos de combobox inquilino
export async function fillInquilino() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_INQUILINOS + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById(
        "cmb_inquilino_update"
      ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
      getElementById(
        "cmb_inquilino"
      ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
    });
    return;
  }
}

//Obtener los datos de combobox empleaado
export async function fillPropietario() {
  //Se crea un endpoint especifico para el caso de leer tipo inquilino
  let APIEndpoint = API_PROPIETARIO + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById(
        "cmb_propietario"
      ).innerHTML += `<option value="${element.id_propietario}" > ${element.nombre} </option>`;
    });
    return;
  }
}
