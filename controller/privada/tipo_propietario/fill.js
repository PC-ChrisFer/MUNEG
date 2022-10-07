import { getElementById } from "../../constants/helpers.js";

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableTipoPropietario(dataset) {
    let content = "";
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map((row) => {
      console.log(row)
      // Se crean y concatenan las filas de la tabla con los datos de cada registro.
      content += ` 
              <tr>  
                  <td>${row.nombre_tipo}</td>
                  <td>${row.visibilidad}</td> 
                  
                  <td class="d-flex justify-content-center">
                      <div class="btn-group" role="group">
                              <a onclick="guardarDatosTipoPropietarioUpdate('${row.id_tipo_propietario}', '${row.nombre_tipo}', '${row.visibilidad}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
                                  <img src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;" data-bs-toggle="modal"
                                  data-bs-target="#actualizar"></a>
                              <a  onclick="guardarDatosTipoPropietarioDelete(${row.id_tipo_propietario})"  class="btn edit_add_deleteButtons delete"   id="button_ver_mas"
                              name="search">
                                  <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;" data-bs-toggle="modal"
                                  data-bs-target="#eliminar"></a>
                      </div>
                  </td>
              </tr>
          `;
    });
    // Se muestran cada filas de los registros
    getElementById("tbody-TipoPropietario").innerHTML = content;
  }