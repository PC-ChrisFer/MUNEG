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
import { closeModal, getElementById } from "../../constants/helpers.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import {
  fillComboBoxTipoEmpleado,
  fillComboxEstadoEmpleado,
  fillTableEmpleado,
} from "./fill.js";
import { datos_empleado } from "./windowFunctions.js";
import { inactivityTime } from "../../soporte/soporte.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_EMPLEADO = SERVER + "privada/empleado.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_EMPLEADO, fillTableEmpleado);
  await fillComboBoxTipoEmpleado();
  await fillComboxEstadoEmpleado();
  inactivityTime();
});

getElementById("search-bar")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchRows(API_EMPLEADO, "search-bar", fillTableEmpleado);
});

getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData(event.target);
  await saveRow(API_EMPLEADO, API_CREATE, parameters, fillTableEmpleado);

  closeModal("#agregar");
});

getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData(getElementById("update_form"));
  parameters.append("id", datos_empleado.id);
  parameters.append("imageName", datos_empleado.imagen);

  // API REQUEST
  await saveRow(API_EMPLEADO, API_UPDATE, parameters, fillTableEmpleado);

  closeModal("#actualizar");
});

getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();
  parameters.append("id", String(datos_empleado.id));

  await deleteRow(API_EMPLEADO, parameters, fillTableEmpleado);

  closeModal("#eliminar");
});
