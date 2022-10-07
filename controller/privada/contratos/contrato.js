//@ts-check
import { APIConnection } from "../../APIConnection.js";
import {
  deleteRow, readRows,
  saveRow,
  searchRows
} from "../../components.js";
import {
  API_CREATE, API_SUCESS_REQUEST, API_UPDATE,
  GET_METHOD, SERVER
} from "../../constants/api_constant.js";
import { closeModal, getElementById } from "../../constants/helpers.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { inactivityTime } from "../../soporte/soporte.js";
import { fillComboBoxEmpleado, fillComboBoxInquilino, fillComboBoxPropiedad, fillComboBoxPropietario, fillTableContrato } from "./fill.js";
import { datos_contrato, datos_propiedad } from "./windowFunctions.js";


const API_CONTRATO = SERVER + "privada/contrato.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_CONTRATO, fillTableContrato);
  await fillComboBoxPropietario();
  await fillComboBoxPropiedad();
  await fillComboBoxEmpleado();
  await fillComboBoxInquilino();
  inactivityTime();
});

// EVENTO PARA READ
getElementById("search-bar")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchRows(API_CONTRATO, "search-bar", fillTableContrato);
});

// EVENTO PARA INSERT
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData(getElementById("insert_form"));
  await saveRow(API_CONTRATO, API_CREATE, parameters, fillTableContrato);

  closeModal("#agregar")
});

// EVENTO PARA UPDATE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData(getElementById("update_form"));
  parameters.append("id", datos_contrato.id);
  parameters.append("imageName",datos_contrato.imagen)

  await saveRow(API_CONTRATO, API_UPDATE, parameters, fillTableContrato);
  
  closeModal("#actualizar")
});

//EVENTO PARA DELETE
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData();
  parameters.append("id", datos_contrato.id);
  await deleteRow(API_CONTRATO, parameters, fillTableContrato);

  closeModal("#eliminar")
});

//EVENTO PARA DELETE
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData();
  parameters.append("id_propiedad", datos_propiedad.id_propiedad);
  await deleteRow(API_CONTRATO, parameters, fillTableContrato);
  closeModal("#eliminar")

});
