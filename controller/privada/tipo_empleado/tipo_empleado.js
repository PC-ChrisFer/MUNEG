//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { deleteRow, readRows, saveRow, searchRows } from "../../components.js";
import {
  API_CREATE,
  API_SUCESS_REQUEST,
  API_UPDATE,
  GET_METHOD,
  SERVER,
} from "../../constants/api_constant.js";
import {
  closeModal,
  getElementById,
  showModal,
  uncheckButton,
} from "../../constants/helpers.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { fillTableTipoEmpleado } from "./fill.js";
import { datos_tipo_empleado } from "./windowFunctions.js";
import { inactivityTime } from "../../soporte/soporte.js";


const API_TIPO_EMPLEADO = SERVER + "privada/tipo_empleado.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_TIPO_EMPLEADO, fillTableTipoEmpleado);
  inactivityTime();
});

getElementById("search-bar")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchRows(API_TIPO_EMPLEADO, "search-bar", fillTableTipoEmpleado);
});

// EVENTO PARA INSERT
getElementById("insert-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("insert-form"));
  await saveRow(
    API_TIPO_EMPLEADO,
    API_CREATE,
    parameters,
    fillTableTipoEmpleado
  );

  showModal("#agregar");
});

// EVENTO PARA UPDATE
getElementById("update-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("update-form"));
  parameters.append("id_tipo_empleado", datos_tipo_empleado.id);
  parameters.append(
    "visibilidad_update",
    getElementById("visibilidad_update").checked == true ? "1" : "0"
  );

  await saveRow(
    API_TIPO_EMPLEADO,
    API_UPDATE,
    parameters,
    fillTableTipoEmpleado
  );

  closeModal("#actualizar");
  uncheckButton("#verDatosliminados");
});

//EVENTO PARA DELETE
getElementById("delete-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();
  parameters.append("id_tipo_empleado", datos_tipo_empleado.id);

  await deleteRow(API_TIPO_EMPLEADO, parameters, fillTableTipoEmpleado);

  closeModal("#eliminar");
});
