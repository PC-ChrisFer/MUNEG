//@ts-check

import { APIConnection } from "../APIConnection.js";
import { deleteRow, readRows, saveRow } from "../components.js";
import {
  SERVER,
  API_CREATE,
  API_UPDATE,
  API_SUCESS_REQUEST,
  GET_METHOD,
} from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";

const API_GESTION_TIPO_PROPIEDAD =
  SERVER + "privada/tipo_propiedad.php?action=";

let datos_tipoPropiedad = {
  id_tipo_propiedad: "",
  nombre_tipo_propiedad: "",
  visibilidad: true,
  id_categoria: "",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_TIPO_PROPIEDAD, fillTableTipoPropiedad);
  await fillCategoriaCombobox("listado_categorias_id");
  await fillCategoriaCombobox("listado_categorias_id_u");
});

async function fillCategoriaCombobox(fieldID) {
  let APIEndpoint = API_GESTION_TIPO_PROPIEDAD + "readAllCategorias";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    APIResponse.dataset.map((element) => {
      //@ts-ignore
      getElementById(
        fieldID
      ).innerHTML += `<option value="${element.id_categoria}" > ${element.nombre_categoria} </option>`;
    });
    return;
  }
  console.log("all bad");
}

function fillTableTipoPropiedad(dataset) {
  let content = "";
  console.log(dataset);
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
             <tr>
             <td>${row.nombre_tipo}</td>
             <td>${row.visibilidad}</td>
             <td class="d-flex justify-content-center">
             <a onclick="guardarDatosUpdate(${row.id_tipo_propiedad},${row.visibilidad},'${row.nombre_tipo}')" class="btn" id="button_ver_mas">
               <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
             <a onclick="guardarDatosDelete(${row.id_tipo_propiedad})" class="btn" id="button_ver_mas">
               <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
         </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  //@ts-ignore
  getElementById("tbody-tipo-propiedad").innerHTML = content;
}

//@ts-ignore
window.selectIdCategoria = (idCategoriaCmb) => {
  //@ts-ignore
  datos_tipoPropiedad.id_categoria = getElementById(idCategoriaCmb).value;
};

//@ts-ignore
window.guardarDatosUpdate = async (
  id_tipoPropiedad,
  visibilidad,
  nombre_tipo_propiedad
) => {
  datos_tipoPropiedad.id_tipo_propiedad = id_tipoPropiedad;
  datos_tipoPropiedad.visibilidad = visibilidad;

  //@ts-ignore
  getElementById("tipo_propiedad_update").value = String(nombre_tipo_propiedad);

  //@ts-ignore
  getElementById("switchButton").value = datos_tipoPropiedad.visibilidad
    ? "visible"
    : "invisible";

  //@ts-ignore
  $("#actualizar").modal("show");
};

//@ts-ignore
window.guardarDatosDelete = (id_tipoPropiedad) => {
  datos_tipoPropiedad.id_tipo_propiedad = id_tipoPropiedad;
  //@ts-ignore
  $("#eliminar").modal("show");
};

//@ts-ignore
window.cambiarEstadoTipoPropiedad = () => {
  datos_tipoPropiedad.visibilidad = !datos_tipoPropiedad.visibilidad;
  // @ts-ignore
  getElementById("switchButton").value = datos_tipoPropiedad.visibilidad
    ? "visible"
    : "invisible";
};

getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("insert_form"));
  parameters.append("categoria", datos_tipoPropiedad.id_categoria);

  await saveRow(
    API_GESTION_TIPO_PROPIEDAD,
    API_CREATE,
    parameters,
    fillTableTipoPropiedad
  );

  // @ts-ignore
  $("#agregar").modal("hide");
});

getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("update_form"));
  //@ts-ignore
  parameters.append("visibilidad", datos_tipoPropiedad.visibilidad);
  parameters.append("id_tipo_propiedad", datos_tipoPropiedad.id_tipo_propiedad);
  parameters.append("categoria", datos_tipoPropiedad.id_categoria);

  await saveRow(
    API_GESTION_TIPO_PROPIEDAD,
    API_UPDATE,
    parameters,
    fillTableTipoPropiedad
  );

  // @ts-ignore
  $("#actualizar").modal("hide");
});

getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData();
  //@ts-ignore
  parameters.append("id_tipo_propidad", datos_tipoPropiedad.id_tipo_propiedad);

  await deleteRow(
    API_GESTION_TIPO_PROPIEDAD,
    parameters,
    fillTableTipoPropiedad
  );

  // @ts-ignore
  $("#eliminar").modal("hide");
});
