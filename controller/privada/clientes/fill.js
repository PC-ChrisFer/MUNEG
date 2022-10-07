//@ts-check
import { getElementById } from "../../constants/helpers.js";

export function fillTableCliente(dataset) {
    //Se define el contenido html
    let content = "";
    //Se llenan los elementos con la información proporcionada por la base de datos
    dataset.map((row) => {
      //El cuerpo del elemento html
      content += ` 
          <tr>
              <td>${row.nombre_cliente}</td>
              <td>${row.correo}</td>
              <td class="d-flex justify-content-center">
                  <a onclick="guardarDatosUpdate(${row.id_cliente},'${row.nombre_cliente}','${row.correo}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
                    <img  src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                  <a onclick="guardarDatosDelete(${row.id_cliente})" class="btn edit_add_deleteButtons delete"  id="button_ver_mas">
                    <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
              </td>
           </tr>
          `;
    });
    //Se escribe el id del contendor que se quiere llenar con el elemento html
    getElementById("tbody-cliente").innerHTML = content;
  }