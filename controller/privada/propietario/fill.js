// @ts-check
import { APIConnection } from "../../APIConnection.js";
import { GET_METHOD, SERVER } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

//Obtener los datos de combobox tipo empleado
export async function fillComboBoxTipoPropietario() {
  let APIEndpoint =
    SERVER + "privada/propietario.php?action=readTipoPropietario";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);

  APIResponse.dataset.map((element) => {
    getElementById(
      "id_tipo_propietario"
    ).innerHTML += `<option value="${element.id_tipo_propietario}" > ${element.nombre_tipo} </option>`;
  });
  APIResponse.dataset.map((element) => {
    getElementById(
      "id_tipo_propietario_update"
    ).innerHTML += `<option value="${element.id_tipo_propietario}" > ${element.nombre_tipo} </option>`;
  });
  APIResponse.dataset.map((element) => {
    getElementById(
      "id_tipo_propietario_rep"
    ).innerHTML += `<option value="${element.id_tipo_propietario}" > ${element.nombre_tipo} </option>`;
  });
}

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTablePropietario(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
              <tr>  
                  <td><img src="../../api/imagenes/propietario/${row.imagen}" width=100></td> 
                  <td>${row.nombre} ${row.apellido}</td>
                  <td>${row.numero_telefono}</td> 
                  <td>${row.correo_electronico}</td> 
                  <td>${row.fecha_nacimiento}</td> 
                  <td>${row.genero}</td> 
                  <td>${row.DUI}</td> 
                  <td>${row.id_tipo_propietario}</td> 
  
                  <td class="d-flex justify-content-center">
                      <div class="btn-group" role="group">
                          <form method="post" id="read-one">
                              <a onclick="guardarDatosPropietarioUpdate('${row.id_propietario}','${row.nombre}', '${row.apellido}', '${row.numero_telefono}', '${row.correo_electronico}', '${row.fecha_nacimiento}', '${row.genero}', '${row.DUI}', '${row.id_tipo_propietario}','${row.imagen}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas" >
                              <img src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                              <a  onclick="guardarDatosPropietarioDelete(${row.id_propietario})"  class="btn edit_add_deleteButtons delete"  id="button_ver_mas"  
                              name="search">
                              <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
                              </form>
                      </div>
                  </td>
              </tr>
          `;
  });
  // Se muestran cada filas de los registros
  getElementById("tbody-Propietario").innerHTML = content;
}
