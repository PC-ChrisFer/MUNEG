//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { GET_METHOD, SERVER } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

const API_INQUILINOS = SERVER + "privada/inquilino.php?action=";

export function fillTableReportes(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
        <tr>
            <td>${row.id_reporte}</td>
            <td>${row.asunto}</td>
            <td>${row.descripcion}</td>
            <td><img src="../../api/imagenes/reporte/${row.imagen}" width="50%" height="50%"></td>
            <td class="d-flex justify-content-center">
                <a onclick="guardarDatosUpdate(${row.id_reporte},'${row.asunto}','${row.descripcion}', '${row.id_inquilino}','${row.estado}','${row.imagen}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
                  <img  src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                <a onclick="guardarDatosDelete(${row.id_reporte})" class="btn edit_add_deleteButtons delete"  id="button_ver_mas">
                  <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
            </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  getElementById("tbody-reportes").innerHTML = content;
}

export async function fillInquilinosComboBox() {
  let APIEndpoint = API_INQUILINOS + "readAll";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  console.log(APIResponse);
  APIResponse.dataset.map((element) => {
    getElementById(
      "inquilinos"
    ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;

    getElementById(
      "inquilinos_u"
    ).innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
  });
}
