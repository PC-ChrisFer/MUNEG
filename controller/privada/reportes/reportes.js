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
  validateExistenceOfUser,
} from "../../constants/helpers.js";
import { fillInquilinosComboBox, fillTableReportes } from "./fill.js";
import { datos_reporte } from "./windowFunctions.js";
import { inactivityTime } from "../../soporte/soporte.js";

const API_REPORTES = SERVER + "privada/reporte.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();

  await readRows(API_REPORTES, fillTableReportes);

  await fillInquilinosComboBox();

  inactivityTime();
});

getElementById("search-bar")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  await searchRows(API_REPORTES, "search-bar", fillTableReportes);
});

getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("insert_form"));

  parameters.append("inquilino", datos_reporte.id_inquilino);

  parameters.append("estado", true);

  await saveRow(API_REPORTES, API_CREATE, parameters, fillTableReportes);

  closeModal("#agregar");
});

// ACTUALIZAR REPORTE
getElementById("form_update")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("form_update"));

  parameters.append("reporte_id", datos_reporte.id_reporte);
  parameters.append("estado_update", datos_reporte.estado);
  parameters.append("inquilino_update", datos_reporte.id_inquilino);
  parameters.append("imageName", datos_reporte.imagen);

  // API REQUEST
  await saveRow(API_REPORTES, API_UPDATE, parameters, fillTableReportes);

  closeModal("#actualizar");
});

getElementById("insert_form")?.addEventListener("submit", async (event) => {
  // pendiente a inquilinos
});

getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();
  parameters.append("id_reporte", datos_reporte.id_reporte);

  await deleteRow(API_REPORTES, parameters, fillTableReportes);

  closeModal("#eliminar");
});
