//@ts-check
import { readRows, saveRow, searchRows, deleteRow } from "../../components.js";
import { getElementById } from "../../constants/helpers.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { API_SUCESS_REQUEST, API_UPDATE, GET_METHOD, SERVER } from "../../constants/api_constant.js";
import {fillTableCliente} from "./fill.js"
import {datos_cliente} from "./windowFunctions.js"
import { APIConnection } from "../../APIConnection.js";
import { inactivityTime } from "../../soporte/soporte.js";


//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_CLIENTE = SERVER + "privada/cliente.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';


document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_CLIENTE, fillTableCliente);
  inactivityTime();
});


// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchRows(API_CLIENTE, "search-bar", fillTableCliente);
});

//EVENTO PARA UPDATE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  $("#actualizar").modal("hide");
  // Se toman los datos del modal y los convierte a formData
  let parameters = new FormData(getElementById("update_form"));
  parameters.append("id_cliente", datos_cliente.id_cliente);
  await saveRow(API_CLIENTE, API_UPDATE, parameters, fillTableCliente);
});

//EVENTO PARA DELETE
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  $("#eliminar").modal("hide");
  let parameters = new FormData();
  parameters.append("id_cliente", datos_cliente.id_cliente);
  await deleteRow(API_CLIENTE, parameters, fillTableCliente);
});
