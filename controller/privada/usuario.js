//@ts-check

import { deleteRow, readRows, saveRow } from "../components.js";
import {
  SERVER,
  API_CREATE,
  API_UPDATE,
  API_SUCESS_REQUEST,
  GET_METHOD,
} from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { APIConnection } from "../APIConnection.js";

const API_GESTION_URUSARIO = SERVER + "privada/usuario.php?action=";
const API_TIPO_USUARIO = SERVER + "privada/tipo_usuario.php?action=";

let datosUsuario = {
  id_usuario: "",
  nombre_usuario: "",
  password: "",
  tipo_usuario: "",
  propiedatio_id: "",
  empleado_id: "",
};

document.addEventListener("DOMContentLoaded", async () => {
  console.log("hiiii")
  //validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_URUSARIO, fillTableUsarios);
  await fillCategoriaCombobox();
  await fillTipoUsuarioCombobox()
});

async function fillTipoUsuarioCombobox() {
  let APIEndpoint = API_TIPO_USUARIO + "readAll";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    APIResponse.dataset.map((element) => {
      //@ts-ignore
      getElementById(
        "cmbtipo_usuario_update"
      ).innerHTML += `<option value="${element.id_tipo_usuario}" > ${element.nombre_tipo} </option>`;
    });
    return;
  }
  console.log("all bad");
}

async function fillCategoriaCombobox() {
  let APIEndpoint = API_GESTION_URUSARIO + "readAllCategorias";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    APIResponse.dataset.map((element) => {
      //@ts-ignore
      getElementById(
        "cmb_empleado_update"
      ).innerHTML += `<option value="${element.id_categoria}" > ${element.nombre_categoria} </option>`;
    });
    return;
  }
  console.log("all bad");
}

function fillTableUsarios(dataset) {
  let content = "";
  console.log(dataset);
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
               <tr>
               <td>${row.nombre_usuario}</td>
               <td>${row.nombre_tipo}</td>
               <td>${row.apellido}, ${row.nombre}</td>
               <td class="d-flex justify-content-center">
               <a onclick="guardarDatosUpdate(${row.id_usuario})" class="btn" id="button_ver_mas">
                 <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
               <a onclick="guardarDatosDelete(${row.id_usuario})" class="btn" id="button_ver_mas">
                 <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
           </td>
           </tr>
          `;
  });

  //@ts-ignore
  getElementById("tbody-usuario").innerHTML = content;
}

//@ts-ignore
window.selectTipoUsuario = (id_tipo_usuario) => {
  datosUsuario.tipo_usuario = id_tipo_usuario;
};

//@ts-ignore
window.selectEmpleado = (id_empleado) => {
  datosUsuario.empleado_id = id_empleado;
};

//@ts-ignore
window.guardarDatosUpdate = (id_usuario) => {
  datosUsuario.id_usuario = id_usuario;
  //@ts-ignore
  $("#actualizar").modal("show");
};

//@ts-ignore
window.guardarDatosDelete = (id_usuario) => {
  datosUsuario.id_usuario = id_usuario;
  //@ts-ignore
  $("#eliminar").modal("show");
};

getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  //@ts-ignore
  let parameters = new FormData(getElementById("update_form"));
  parameters.append("id", datosUsuario.id_usuario);
  parameters.append("tipo_usuario", datosUsuario.tipo_usuario);
  parameters.append("empleado", datosUsuario.empleado_id);

  await saveRow(API_GESTION_URUSARIO, API_UPDATE, parameters, fillTableUsarios);

  // @ts-ignore
  $("#agregar").modal("hide");
});

getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();
  parameters.append("id", datosUsuario.id_usuario);

  await deleteRow(API_GESTION_URUSARIO, parameters, fillTableUsarios);

  // @ts-ignore
  $("#agregar").modal("hide");
});
