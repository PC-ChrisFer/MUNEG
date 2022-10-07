//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { GET_METHOD, SERVER } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

//Obtener los datos de combobox tipo empleado
export async function fillComboBoxTipoEmpleado() {
    let APIEndpoint = SERVER + "privada/empleado.php?action=readTipoEmpleado";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);

    APIResponse.dataset.map((element) => {
      getElementById(
        "tipo_empleado"
      ).innerHTML += `<option value="${element.id_tipo_empleado}" > ${element.nombre_tipo} </option>`;
    });
    APIResponse.dataset.map((element) => {
      getElementById(
        "tipo_empleado_update"
      ).innerHTML += `<option value="${element.id_tipo_empleado}" > ${element.nombre_tipo} </option>`;
    });
  }
  
  //Obtener los datos de combobox estado empleado
  export async function fillComboxEstadoEmpleado() {
    let APIEndpoint = SERVER + "privada/empleado.php?action=readEstadoEmpleado";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    
    APIResponse.dataset.map((element) => {
      getElementById(
        "estado_empleado"
      ).innerHTML += `<option value="${element.id_estado_empleado}" > ${element.nombre_estado} </option>`;
    });
    APIResponse.dataset.map((element) => {
      getElementById(
        "estado_empleado_update"
      ).innerHTML += `<option value="${element.id_estado_empleado}" > ${element.nombre_estado} </option>`;
    });
  }

  
//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableEmpleado(dataset) {
    let content = "";
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map((row) => {
      // Se crean y concatenan las filas de la tabla con los datos de cada registro.
      content += ` 
              <tr>
                  <td> <img src="../../api/imagenes/empleado/${row.imagen}" width=100></td>
                  <td>${row.nombre}</td>
                  <td>${row.apellido}</td>
                  <td>${row.numero_telefono}</td>
                  <td>${row.correo_electronico}</td>
                  <td>${row.fecha_nacimiento}</td>
                  <td>${row.genero}</td>
                  <td>${row.DUI}</td>
                  <td>${row.NIT}</td>
                  <td class="d-flex justify-content-center">
                      <a onclick="guardarDatosEmpleadoUpdate(${row.id_empleado},'${row.nombre}','${row.apellido}','${row.DUI}','${row.NIT}','${row.numero_telefono}','${row.correo_electronico}','${row.genero}','${row.fecha_nacimiento}',${row.id_estado_empleado},${row.id_tipo_empleado},'${row.imagen}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas"
                      data-bs-target="#actualizar"><img
                          src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                      <a onclick="guardarDatosinquilinoEliminar(${row.id_empleado})" class="btn edit_add_deleteButtons delete"  href="#" id="button_ver_mas"><img
                          src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
                  </td>
              </tr>
          `;
    });
    // Se muestran cada filas de los registros
    getElementById("tbody_empleado").innerHTML = content;
  }