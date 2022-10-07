//@ts-check
import { deleteRow, readRows, saveRow, searchRows } from "../../components.js";
import {
  API_CREATE,
  API_UPDATE,
  SERVER,
} from "../../constants/api_constant.js";
import {
  closeModal,
  getElementById,
  uncheckButton,
} from "../../constants/helpers.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { fillTableCategoria } from "./fill.js";
import { datos_categoria } from "./windowFunctions.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_CATEGORIA = SERVER + "privada/categoria.php?action=";

document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_CATEGORIA, fillTableCategoria);
});

// EVENTO PARA READ
getElementById("search-bar")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchRows(API_CATEGORIA, "search-bar", fillTableCategoria);
});

// EVENTO PARA INSERT
getElementById("insert-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData(getElementById("insert-form"));
  await saveRow(API_CATEGORIA, API_CREATE, parameters, fillTableCategoria);

  closeModal("#agregar");
});

//EVENTO PARA UPDATE
getElementById("update-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  let parameters = new FormData(getElementById("update-form"));
  parameters.append("id", datos_categoria.id);
  parameters.append(
    "visibilidad_update",
    datos_categoria.visibilidad ? "1" : "0"
  );

  await saveRow(API_CATEGORIA, API_UPDATE, parameters, fillTableCategoria);

  // reseteando valores
  closeModal("#actualizar");
  uncheckButton("#verDatosliminados");
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  let parameters = new FormData();
  parameters.append("id", datos_categoria.id);
  await deleteRow(API_CATEGORIA, parameters, fillTableCategoria);

  closeModal("#eliminar");
});
