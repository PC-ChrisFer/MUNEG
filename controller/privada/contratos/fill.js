//@TS-CHECK

import { APIConnection } from "../../APIConnection.js";
import { GET_METHOD, SERVER } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

//Obtener los datos de combobox tipo propietario
export async function fillComboBoxPropietario() {
  //Se crea un endpoint especifico para el caso de leer propietario
  let APIEndpoint = SERVER + "privada/contrato.php?action=readPropietario";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_propietario"
    ).innerHTML += `<option value="${element.id_propietario}" > ${element.nombre} </option>`;
  });
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_propietario_update"
    ).innerHTML += `<option value="${element.id_propietario}" > ${element.nombre} </option>`;
  });
}

//Obtener los datos de combobox tipo empleado
export async function fillComboBoxPropiedad() {
  //Se crea un endpoint especifico para el caso de leer propietario
  let APIEndpoint = SERVER + "privada/contrato.php?action=readPropiedad";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_propiedad"
    ).innerHTML += `<option value="${element.id_propiedad}" > ${element.codigo} </option>`;
  });
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_propiedad_update"
    ).innerHTML += `<option value="${element.id_propiedad}" > ${element.codigo} </option>`;
  });
}

//Obtener los datos de combobox tipo empleado
export async function fillComboBoxEmpleado() {
  //Se crea un endpoint especifico para el caso de leer propietario
  let APIEndpoint = SERVER + "privada/contrato.php?action=readEmpleado";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_empleado"
    ).innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;
  });
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_empleado_update"
    ).innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;
  });
}

//Obtener los datos de combobox tipo empleado
export async function fillComboBoxInquilino() {
  //Se crea un endpoint especifico para el caso de leer propietario
  let APIEndpoint = SERVER + "privada/contrato.php?action=readInquilino";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_inquilino"
    ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
  });
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta
    getElementById(
      "id_inquilino_update"
    ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
  });
}

//Función (ReadAll) llenar las tablas de información
export function fillTableContrato(dataset) {
  //Se define el contenido html
  let content = "";
  //Se llenan los elementos con la información proporcionada por la base de datos
  dataset.map((row) => {
    //El cuerpo del elemento html
    content += ` 
              <tr>  
                  <td><img src="../../api/imagenes/contrato/${row.imagen}" width=100></td> 
                  <td>${row.descripcion}</td>
                  <td>${row.fecha_firma}</td> 
                  <td class="d-flex justify-content-center">
                      <div class="btn-group" role="group">
                          <form method="post" id="read-one">
                              <a onclick="guardaDatosUpdate('${row.id_contrato}', '${row.descripcion}', '${row.fecha_firma}', '${row.id_propietario}', '${row.id_propiedad}', '${row.id_empleado}', '${row.id_inquilino}','${row.imagen}')" class="btn edit_add_deleteButtons edit"   id="button_ver_mas">
                              <img src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                              <a  onclick="guardaDatosDelete('${row.id_contrato}')" class="btn edit_add_deleteButtons delete"   id="button_ver_mas"
                              name="search">
                              <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
                          </form>
                      </div>
                  </td>
              </tr>
          `;
  });
  //Se escribe el id del contendor que se quiere llenar con el elemento html
  getElementById("tbody-Contrato").innerHTML = content;
}
