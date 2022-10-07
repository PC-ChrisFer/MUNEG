// @ts-check
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
import { fillComboBoxInquilino, fillTableFactura } from "./fills.js";
import { datos_factura } from "./windowFunctions.js";
import { inactivityTime } from "../../soporte/soporte.js";


//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_FACTURA = SERVER + "privada/factura.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_FACTURA, fillTableFactura);
  await fillComboBoxInquilino();
  inactivityTime();
});

// EVENTO PARA READ
getElementById("search-bar")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchRows(API_FACTURA, "search-bar", fillTableFactura);
});

// EVENTO PARA INSERT
getElementById("insert-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData(getElementById("insert-form"));
  await saveRow(API_FACTURA, API_CREATE, parameters, fillTableFactura);

  closeModal("#agregar");
});

//EVENTO PARA UPDATE
getElementById("update-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData(getElementById("update-form"));
  parameters.append("id", datos_factura.id);
  await saveRow(API_FACTURA, API_UPDATE, parameters, fillTableFactura);

  closeModal("#actualizar")
});

//EVENTO PARA DELETE
getElementById("delete-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData();
  parameters.append("id", datos_factura.id);
  await deleteRow(API_FACTURA, parameters, fillTableFactura);

  closeModal("#eliminar")
});
