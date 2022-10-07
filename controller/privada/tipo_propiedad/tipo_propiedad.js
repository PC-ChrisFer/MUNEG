//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { deleteRow, readRows, saveRow, searchRows } from "../../components.js";
import {
  SERVER,
  API_CREATE,
  API_UPDATE,
  GET_METHOD,
  API_SUCESS_REQUEST,
} from "../../constants/api_constant.js";
import { closeModal, getElementById } from "../../constants/helpers.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { inactivityTime } from "../../soporte/soporte.js";
import { fillTableTipoInquilino } from "../tipo_inquilino/fill.js";
import { fillCategoriaCombobox, fillTableTipoPropiedad } from "./fill.js";
import {
  datos_tipoPropiedad,
  resetIsWatchingDeletedDataValue,
} from "./windowFunctions.js";


const API_GESTION_TIPO_PROPIEDAD =
  SERVER + "privada/tipo_propiedad.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();

  await readRows(API_GESTION_TIPO_PROPIEDAD, fillTableTipoPropiedad);

  await fillCategoriaCombobox("listado_categorias_id");

  await fillCategoriaCombobox("listado_categorias_id_u");

  getElementById("textoSwitch").innerHTML = "Hacer invisible";

  inactivityTime();

  datos_tipoPropiedad;
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

// EVENTO PARA INSERT
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("insert_form"));

  parameters.append("categoria", datos_tipoPropiedad.id_categoria);

  await saveRow(
    API_GESTION_TIPO_PROPIEDAD,
    API_CREATE,
    parameters,
    fillTableTipoPropiedad
  );

  closeModal("#agregar");
});

// EVENTO PARA UPDATE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("update_form"));

  // Se adhieren datos al arreglo que se envia al update
  parameters.append("visibilidad", datos_tipoPropiedad.visibilidad);

  parameters.append("id_tipo_propiedad", datos_tipoPropiedad.id_tipo_propiedad);

  parameters.append("categoria", datos_tipoPropiedad.id_categoria);

  await saveRow(
    API_GESTION_TIPO_PROPIEDAD,
    API_UPDATE,
    parameters,
    fillTableTipoPropiedad
  );

  // reinicia el crud
  getElementById("verDatosliminados").checked = false;

  getElementById("textoSwitch").innerHTML = "Hacer invisible";

  resetIsWatchingDeletedDataValue();

  closeModal("#actualizar");
});

//EVENTO PARA DELETE
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData();

  parameters.append("id_tipo_propidad", datos_tipoPropiedad.id_tipo_propiedad);

  await deleteRow(
    API_GESTION_TIPO_PROPIEDAD,
    parameters,
    fillTableTipoPropiedad
  );

  closeModal("#eliminar");
});
