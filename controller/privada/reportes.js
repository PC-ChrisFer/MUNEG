//@ts-check

import { APIConnection } from "../APIConnection.js";
import { deleteRow, readRows, saveRow } from "../components.js";
import { API_CREATE, API_UPDATE, GET_METHOD, SERVER } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";

const API_REPORTES = SERVER + "privada/reporte.php?action=";

let datos_reporte = {
  id_reporte: "",
  asunto: "",
  descripcion: "",
  estado: true,
  id_inquilino: "",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_REPORTES, fillTableReportes);
  await fillInquilinosComboBox();
});

function fillTableReportes(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
        <tr>
            <td>${row.id_reporte}</td>
            <td>${row.asunto}</td>
            <td>${row.descripcion}</td>
            <td>${row.correo}</td>
            <td class="d-flex justify-content-center">
                <a onclick="guardarDatosUpdate(${row.id_reporte},'${row.asunto}','${row.descripcion}', '${row.id_inquilino}','${row.estado}')" class="btn" id="button_ver_mas">
                  <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                <a onclick="guardarDatosDelete(${row.id_reporte})" class="btn" id="button_ver_mas">
                  <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
            </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  //@ts-ignore
  getElementById("tbody-reportes").innerHTML = content;
}

async function fillInquilinosComboBox() {
  let APIEndpoint = API_REPORTES + "readInquilinos";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  APIResponse.dataset.map((element) => {
    //@ts-ignore
    getElementById(
      "inquilinos"
    ).innerHTML += `<option value="${element.idInquilino}" > ${element.nombreInquilino} </option>`;
  });
}

//@ts-ignore
window.seleccionarInquilino = () => {
  //@ts-ignore
  datos_reporte.id_inquilino = document.getElementById("inquilinos").value;
};


// FUNCION PARA ACTUALIZAR
// @ts-ignore
window.guardarDatosUpdate = (
  id_reporte,
  asunto,
  descripcion,
  id_inquilino,
  estado
) => {
  datos_reporte.id_reporte = id_reporte;
  datos_reporte.id_inquilino = id_inquilino;
  datos_reporte.estado = estado;
  //@ts-ignore
  getElementById("asunto_update").value = asunto;
  //@ts-ignore
  getElementById("descripcion_update").value = descripcion;
  //@ts-ignore
  getElementById("switchButton").value = estado ? "activo" : "inactivo";

  // @ts-ignore
  $("#actualizar").modal("show");
};

// @ts-ignore
window.cambiarEstadoReporte = () => {
  datos_reporte.estado = !datos_reporte.estado;
  // @ts-ignore
  getElementById("switchButton").value = datos_reporte.estado
    ? "activo"
    : "inactivo";
};

// FUNCION PARA ELIMINAR
// @ts-ignore
window.guardarDatosDelete = (id_reporte) => {
  datos_reporte.id_reporte = id_reporte;
  // @ts-ignore
  $("#eliminar").modal("show");
};


getElementById("insert_form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    // @ts-ignore
    let parameters = new FormData(getElementById("insert_form"));
    //@ts-ignore
    parameters.append("inquilino", datos_reporte.id_inquilino);
    //@ts-ignore
    parameters.append("estado", true)
  
    await saveRow(API_REPORTES , API_CREATE, parameters, fillTableReportes);
  
    // @ts-ignore
    $("#agregar").modal("hide");
  });
  

// ACTUALIZAR REPORTE
getElementById("form_update")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // @ts-ignore
  $("#actualizar").modal("hide");
  //@ts-ignore
  let parameters = new FormData(getElementById("form_update"));
  //@ts-ignore
  parameters.append("reporte_id", datos_reporte.id_reporte);
  //@ts-ignore
  parameters.append("estado_update", datos_reporte.estado);
  parameters.append("inquilino_update", datos_reporte.id_inquilino);

  // API REQUEST
  await saveRow(API_REPORTES, API_UPDATE, parameters, fillTableReportes);
});

getElementById("insert_form")?.addEventListener("submit", async (event) => {
// pendiente a inquilinos
});

getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();
  parameters.append("id_reporte", datos_reporte.id_reporte);

  await deleteRow(API_REPORTES, parameters, fillTableReportes);

  // @ts-ignore
  $("#eliminar").modal("hide");
});
