//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { deleteRow, readRows, saveRow, searchRows } from "../../components.js";
import {
  API_SUCESS_REQUEST,
  API_UPDATE,
  GET_METHOD,
  SERVER,
} from "../../constants/api_constant.js";
import { closeModal, getElementById } from "../../constants/helpers.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { fillTableTipoInquilino } from "../tipo_inquilino/fill.js";
import {
  fillEmpleadoCMB,
  fillTableUsarios,
  fillTipoUsuarioCombobox,
} from "./fill.js";
import { datosUsuario } from "./windowFunctions.js";
import { inactivityTime } from "../../soporte/soporte.js";


//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_URUSARIO = SERVER + "privada/usuario.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';
const API_GESTION_TIPO_PROPIEDAD =  SERVER + 'privada/tipo_propiedad.php?action='; 

document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_GESTION_URUSARIO, fillTableUsarios);
  await fillEmpleadoCMB();
  await fillTipoUsuarioCombobox();

  getElementById("textoSwitch").innerHTML = "Hacer invisible";
  inactivityTime();
});

// EVENTO PARA READ
getElementById("search-bar")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchRows(
    API_GESTION_TIPO_PROPIEDAD,
    "search-bar",
    fillTableTipoInquilino
  );
});

// EVENTO PARA UPDATE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData(getElementById("update_form"));
  parameters.append("id", datosUsuario.id_usuario);
  await saveRow(API_GESTION_URUSARIO, API_UPDATE, parameters, fillTableUsarios);
  closeModal("#actualizar")

});

//EVENTO PARA DELETE
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData();
  parameters.append("id", datosUsuario.id_usuario);
  await deleteRow(API_GESTION_URUSARIO, parameters, fillTableUsarios);

  closeModal("#borrar")
});

