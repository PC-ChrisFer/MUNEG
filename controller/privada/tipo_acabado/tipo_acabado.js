//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { deleteRow, readRows, saveRow, searchRows } from "../../components.js";
import { SERVER, API_CREATE, API_UPDATE, GET_METHOD, API_SUCESS_REQUEST } from "../../constants/api_constant.js";
import { closeModal, getElementById, uncheckButton } from "../../constants/helpers.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { fillTableGestionAcabado } from "./fill.js";
import { datos_gestion_acabado,resetIsWatchingDeletedData } from "./windowFunctions.js";
import { inactivityTime } from "../../soporte/soporte.js";


const API_GESTION_ACABADO = SERVER + "privada/tipo_acabado.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';

document.addEventListener("DOMContentLoaded", async () => {

  await validateExistenceOfUser();

  await readRows(API_GESTION_ACABADO, fillTableGestionAcabado);

  getElementById('textoSwitch').innerHTML = "Hacer invisible"

  inactivityTime();
});

// EVENTO PARA READ
getElementById("search-bar").addEventListener("submit", async (event) => {

  event.preventDefault();

  await searchRows(API_GESTION_ACABADO, "search-bar", fillTableGestionAcabado);
});  

// EVENTO PARA INSERT
getElementById("insert_form")?.addEventListener("submit", async (event) => {

  event.preventDefault();

  let parameters = new FormData(getElementById("insert_form"));

  await saveRow( API_GESTION_ACABADO, API_CREATE, parameters, fillTableGestionAcabado );

  closeModal("#agregar")
});

//EVENTO PARA UPDATE
getElementById("update_form")?.addEventListener("submit", async (event) => {

  event.preventDefault();

  let parameters = new FormData(getElementById("update_form"));

  // Se adhieren datos al arreglo que se envia al update
  parameters.append("visibilidad", datos_gestion_acabado.visibilidad);

  parameters.append("id_tipo_acabado", datos_gestion_acabado.id_gestion_acabado);

  await saveRow( API_GESTION_ACABADO, API_UPDATE, parameters, fillTableGestionAcabado );

  // reinicia el crud
  getElementById('textoSwitch').innerHTML = "Hacer invisible"
  
  resetIsWatchingDeletedData()

  uncheckButton("verDatosliminados")
  closeModal("#actualizar")
});

//EVENTO PARA DELETE
getElementById("delete_form")?.addEventListener("submit", async (event) => {

  event.preventDefault();

  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al delete
  parameters.append("id_tipo_acabado", datos_gestion_acabado.id_gestion_acabado);

  await deleteRow( API_GESTION_ACABADO, parameters, fillTableGestionAcabado );

  closeModal("#eliminar")
});
