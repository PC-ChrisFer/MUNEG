//@ts-check

import { APIConnection } from "../APIConnection.js";
import { deleteRow, readRows, saveRow } from "../components.js";
import { SERVER, API_CREATE, API_UPDATE, GET_METHOD, API_SUCESS_REQUEST } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";

const API_GESTION_ACABADO = SERVER + "privada/tipo_acabado.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';


let datos_gestion_acabado = {
  id_gestion_acabado: "",
  nombre_gestion_acabado: "",
  visibilidad: true,
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_ACABADO, fillTableGestionAcabado);
  inactivityTime();
});

function fillTableGestionAcabado(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
             <tr>
             <td>${row.nombre_tipo}</td>
             <td>${row.visibilidad}</td>
             <td class="d-flex justify-content-center">
             <a onclick="guardarDatosUpdate(${row.id_tipo_acabado},${row.visibilidad},'${row.nombre_tipo}')" class="btn" id="button_ver_mas">
               <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
             <a onclick="guardarDatosDelete(${row.id_tipo_acabado})" class="btn" id="button_ver_mas">
               <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
         </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  //@ts-ignore
  getElementById("tbody-tipo-acabado").innerHTML = content;
}

//@ts-ignore
window.guardarDatosUpdate = (
  id_gestion_acabado,
  visibilidad,
  nombre_tipo_acabado
) => {
  datos_gestion_acabado.id_gestion_acabado = id_gestion_acabado;
  datos_gestion_acabado.visibilidad = visibilidad;

  //@ts-ignore
  getElementById("tipo_acabado_update").value = String(nombre_tipo_acabado);

  //@ts-ignore
  getElementById("visibilidad").value = datos_gestion_acabado.visibilidad
    ? "visible"
    : "invisible";
  //@ts-ignore
  $("#actualizar").modal("show");
};

//@ts-ignore
window.guardarDatosDelete = (id_gestion_acabado) => {
  datos_gestion_acabado.id_gestion_acabado = id_gestion_acabado;
  //@ts-ignore
  $("#eliminar").modal("show");
};

//@ts-ignore
window.cambiarEstadoGestionAcabado = () => {
  datos_gestion_acabado.visibilidad = !datos_gestion_acabado.visibilidad;
  // @ts-ignore
  getElementById("visibilidad").value = datos_gestion_acabado.visibilidad
    ? "visible"
    : "invisible";
};

getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("insert_form"));

  await saveRow(
    API_GESTION_ACABADO,
    API_CREATE,
    parameters,
    fillTableGestionAcabado
  );

  // @ts-ignore
  $("#agregar").modal("hide");
});

getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("update_form"));
  //@ts-ignore
  parameters.append("visibilidad", datos_gestion_acabado.visibilidad);
  //@ts-ignore
  parameters.append(
    "id_tipo_acabado",
    datos_gestion_acabado.id_gestion_acabado
  );

  await saveRow(
    API_GESTION_ACABADO,
    API_UPDATE,
    parameters,
    fillTableGestionAcabado
  );

  // @ts-ignore
  $("#actualizar").modal("hide");
});

getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData();
  //@ts-ignore
  parameters.append(
    "id_tipo_acabado",
    datos_gestion_acabado.id_gestion_acabado
  );

  await deleteRow(API_GESTION_ACABADO, parameters, fillTableGestionAcabado);

  // @ts-ignore
  $("#eliminar").modal("hide");
});

var inactivityTime = function () {
  var time;
  window.onload = resetTimer;
  // DOM Events
  document.onmousemove = resetTimer;
  document.onkeydown = resetTimer;

  async function logout() {
    let APIEndpoint = API_USUARIO + "logOut";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  
    if (APIResponse.status == API_SUCESS_REQUEST) {
      location.href = "index.html";
      return;
    }
    console.log("SOMETHING WENT WRONG");
  }

  function resetTimer() {
      clearTimeout(time);
      time = setTimeout(logout, 300000)
      // 1000 milliseconds = 1 second
  }
};