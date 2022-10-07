//@ts-check
import { readRows, saveRow, searchRows, deleteRow } from "../../components.js";
import {
  API_SUCESS_REQUEST,
  GET_METHOD,
  SERVER,
} from "../../constants/api_constant.js";
import { closeModal, getElementById, uncheckButton } from "../../constants/helpers.js";
import { API_CREATE, API_UPDATE } from "../../constants/api_constant.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { fillTableTipoInquilino } from "./fill.js";
import { APIConnection } from "../../APIConnection.js";
import { datos_tipo_inquilino } from "./windowFunctions.js";
import { inactivityTime } from "../../soporte/soporte.js";


const API_TIPO_INQUILINO = SERVER + "privada/tipo_inquilino.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_TIPO_INQUILINO, fillTableTipoInquilino);
  inactivityTime();
});

getElementById("search-bar")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  await searchRows(API_TIPO_INQUILINO, "search-bar", fillTableTipoInquilino);
});

// EVENTO PARA INSERT
getElementById("insert-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("insert-form"));

  await saveRow(
    API_TIPO_INQUILINO,
    API_CREATE,
    parameters,
    fillTableTipoInquilino
  );

  closeModal("#agregar")
});

// EVENTO PARA UPDATE
getElementById("update-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();


  let parameters = new FormData(getElementById("update-form"));
  parameters.append("id_tipo_inquilino", datos_tipo_inquilino.id);
  parameters.append(
    "visibilidad_update",
    getElementById("visibilidad_update").checked == true ? "1" : "0"
  );

  await saveRow(
    API_TIPO_INQUILINO,
    API_UPDATE,
    parameters,
    fillTableTipoInquilino
  );

  closeModal("#actualizar")
  uncheckButton("#verDatosliminados");
});

//EVENTO PARA DELETE
getElementById("delete-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();
  parameters.append("id_tipo_inquilino", datos_tipo_inquilino.id);

  await deleteRow(API_TIPO_INQUILINO, parameters, fillTableTipoInquilino);

  closeModal("#eliminar")
});
