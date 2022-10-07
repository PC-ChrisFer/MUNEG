//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { GET_METHOD, SERVER } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

const API_MUNICIPIO = SERVER + "privada/municipios.php?action=";
const API_INQUILINO = SERVER + "privada/inquilino.php?action=";


//Obtener los datos de combobox tipo inquilino
export async function fillComboBoxTipoInquilino() {
    let APIEndpoint = API_INQUILINO + "readTipoInquilino";

    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    APIResponse.dataset.map((element) => {
      getElementById("tipo_inquilino_u").innerHTML += `<option value="${element.id_tipo_inquilino}" > ${element.nombre_tipo} </option>`;
    });
      APIResponse.dataset.map((element) => { 
      getElementById("tipo_inquilino_i").innerHTML += `<option value="${element.id_tipo_inquilino}" > ${element.nombre_tipo} </option>`;
    });
  }
  
  //Obtener los datos de combobox estado inquilino
  export async function fillComboxEstadoInquilino() {
    let APIEndpoint = API_INQUILINO + "readEstadoInquilino";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);

    APIResponse.dataset.map((element) => { 
      getElementById("estado_inquilino_i").innerHTML += `<option value="${element.id_estado_inquilino}" > ${element.nombre_estado} </option>`; });
    APIResponse.dataset.map((element) => { 
      getElementById("estado_inquilino_u").innerHTML += `<option value="${element.id_estado_inquilino}" > ${element.nombre_estado} </option>`;
    });
  }
  
  //Obtener los datos de combobox estado inquilino
  export async function fillComboboxDepartamento() {
    let APIEndpoint = API_MUNICIPIO + "read_departamento";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);

    APIResponse.dataset.map((element) => { 
      getElementById("cmb_departamento").innerHTML += `<option value="${element.id_departamento}" > ${element.departamento} </option>`;
     });
  }
  
  
  //Metodo para llenar las tablas de datos, utiliza la función readRows()
  export function fillTableInquilino(dataset) {
    
    let content = "";
    dataset.map((row) => {
      content += ` 
              <tr>
                  <td><img src="../../api/imagenes/inquilino/${row.imagen}" width=100></td>
                  <td>${row.nombre}</td>
                  <td>${row.apellido}</td>
                  <td>${row.numero_telefono}</td>
                  <td>${row.correo_electronico}</td>
                  <td>${row.fecha_nacimiento}</td>
                  <td>${row.DUI}</td>
                  <td>${row.NIT}</td>
                  <td>${row.NRC}</td>
                  <td class="d-flex justify-content-center">
                      <a onclick="guardarDatosUpdate(${row.id_inquilino},'${row.nombre}','${row.apellido}','${row.DUI}','${row.NIT}','${row.NRC}','${row.numero_telefono}','${row.correo_electronico}','${row.genero}','${row.fecha_nacimiento}',${row.id_estado_inquilino},${row.id_tipo_inquilino},'${row.imagen}')" class="btn edit_add_deleteButtons edit"  href="#" id="button_ver_mas" data-bs-toggle="modal"
                      data-bs-target="#actualizar"><img
                          src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                      <a onclick="guardarDatosEliminar(${row.id_inquilino})" class="btn edit_add_deleteButtons delete"  href="#" id="button_ver_mas" data-bs-toggle="modal"
                      data-bs-target="#eliminar"><img
                          src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
                  </td>
              </tr>
          `;
    });
    // Se muestran cada filas de los registros
    getElementById("tbody-tipoInquilino").innerHTML = content;
  }
  