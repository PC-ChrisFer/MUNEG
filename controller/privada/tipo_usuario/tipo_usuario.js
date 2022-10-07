//@ts-check
//Importar las constantes y metodos de components.js y api_constant.js
import { APIConnection } from "../../APIConnection.js";
import { deleteRow, readRows, saveRow, searchRows } from "../../components.js";
import {
  SERVER,
  API_CREATE,
  API_UPDATE,
  GET_METHOD,
  API_SUCESS_REQUEST,
} from "../../constants/api_constant.js";
import { closeModal, getElementById, uncheckButton } from "../../constants/helpers.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { fillTableTipoUsuario } from "./fill.js";
import { datos_tipoUsuario, resetIsWatchinDeletedDataValue } from "./windowFunctions.js";
import { inactivityTime } from "../../soporte/soporte.js";


//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_TIPO_USUARIO = SERVER + "privada/tipo_usuario.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_GESTION_TIPO_USUARIO, fillTableTipoUsuario);
  inactivityTime();
});

// EVENTO PARA READ
getElementById("search-bar")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchRows(
    API_GESTION_TIPO_USUARIO,
    "search-bar",
    fillTableTipoUsuario
  );
});

// EVENTO PARA INSERT
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("insert_form"));
  await saveRow(
    API_GESTION_TIPO_USUARIO,
    API_CREATE,
    parameters,
    fillTableTipoUsuario
  );

  closeModal("#agregar");
});

// EVENTO PARA UPDATE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("update_form"));
  parameters.append("visibilidad", datos_tipoUsuario.visibilidad);
  parameters.append("id_tipo_usuario", datos_tipoUsuario.id_tipo_usuario);

  await saveRow(
    API_GESTION_TIPO_USUARIO,
    API_UPDATE,
    parameters,
    fillTableTipoUsuario
  );

  uncheckButton("verDatosliminados")
  resetIsWatchinDeletedDataValue()
  closeModal("#actualizar");

  getElementById("textoSwitch").innerHTML = "Hacer invisible";
});

//EVENTO PARA DELETE
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al delete
  parameters.append("id_tipo_usuario", datos_tipoUsuario.id_tipo_usuario);
  await deleteRow(API_GESTION_TIPO_USUARIO, parameters, fillTableTipoUsuario);

  closeModal("#eliminar");
});
