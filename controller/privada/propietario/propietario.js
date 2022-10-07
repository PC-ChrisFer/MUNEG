// @ts-check
//Importar las constantes y metodos de components.js y api_constant.js
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
  validateExistenceOfUser,
} from "../../constants/helpers.js";
import { fillComboBoxTipoPropietario, fillTablePropietario } from "./fill.js";
import { datos_propietario } from "./windowFunctions.js";
import { inactivityTime } from "../../soporte/soporte.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_PROPIETARIO = SERVER + "privada/propietario.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_PROPIETARIO, fillTablePropietario);
  await fillComboBoxTipoPropietario();
  inactivityTime();
});

// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchRows(API_PROPIETARIO, "search-bar", fillTablePropietario);
});

// EVENTO PARA INSERT
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"
  let parameters = new FormData(getElementById("insert_form"));
  await saveRow(API_PROPIETARIO, API_CREATE, parameters, fillTablePropietario);
  closeModal("#agregar");
});

// EVENTO PARA UPDATE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Se cierra el formulario de registro
  let parameters = new FormData(getElementById("update_form"));
  parameters.append("id", datos_propietario.id);
  parameters.append("nombre_archivo", datos_propietario.imagen);
  // API REQUEST
  await saveRow(API_PROPIETARIO, API_UPDATE, parameters, fillTablePropietario);
  closeModal("#actualizar");
});

//EVENTO PARA DELETE
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Se cierra el formulario de registro
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  //@ts-ignore
  parameters.append("id", datos_propietario.id);

  //API REQUEST
  await deleteRow(API_PROPIETARIO, parameters, fillTablePropietario);
  closeModal("#eliminar");
});
