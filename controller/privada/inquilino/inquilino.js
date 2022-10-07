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
  fillComboboxDepartamento,
  fillComboBoxTipoInquilino,
  fillComboxEstadoInquilino,
  fillTableInquilino,
} from "./fill.js";
import { datos_inquilino } from "./windowFunctions.js";
import { inactivityTime } from "../../soporte/soporte.js";

const API_INQUILINO = SERVER + "privada/inquilino.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_INQUILINO, fillTableInquilino);
  await fillComboBoxTipoInquilino();
  await fillComboxEstadoInquilino();
  await fillComboboxDepartamento();
  inactivityTime();
});

// EVENTO PARA READ
document.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchRows(API_INQUILINO, "search-bar", fillTableInquilino);
});

// EVENTO PARA INSERT
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("insert_form"));
  parameters.append("genero", getElementById("genero_update").value);
  parameters.append(
    "estado_inquilino",
    getElementById("estado_inquilino_u").value
  );

  await saveRow(API_INQUILINO, API_CREATE, parameters, fillTableInquilino);
  closeModal("#agregar");
});

//EVENTO PARA UPDATE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("update_form"));
  parameters.append("id", datos_inquilino.id);
  parameters.append("imageName", datos_inquilino.imagen);
  await saveRow(API_INQUILINO, API_UPDATE, parameters, fillTableInquilino);

  closeModal("#actualizar");
});

//EVENTO PARA DELETE
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();
  parameters.append("id", datos_inquilino.id);
  await deleteRow(API_INQUILINO, parameters, fillTableInquilino);

  closeModal("#eliminar");
});
