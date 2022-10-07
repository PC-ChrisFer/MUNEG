//@ts-check
//Importar las constantes y metodos de components.js y api_constant.js
import {
  readRows,
  saveRow,
  searchRows,
  deleteRow,
  readDeletedRowns,
} from "../../components.js";
import { SERVER } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/functions.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { API_CREATE, API_UPDATE } from "../../constants/api_constant.js";
import { datos_categoria } from "./windowFunctions.js";
import { fillTableCategoria } from "./fill.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_CATEGORIA = SERVER + "privada/categoria.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Función Para validar que exista un usuario en sesión
  await validateExistenceOfUser(); 
  //Endpoint para la lectura de todas las tablas de infromación
  await readRows(API_CATEGORIA, fillTableCategoria);
});

// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_CATEGORIA, "search-bar", fillTableCategoria);
});

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert-form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se toman los datos del modal y los convierte a formData
  let parameters = new FormData(getElementById("insert-form"));
  // Se llama a la función que realiza la inserción. Se encuentra en el archivo components.js
  await saveRow(API_CATEGORIA, API_CREATE, parameters, fillTableCategoria);
  // Cerrar el modal de agregar
  $("#agregar").modal("hide");
});

//EVENTO PARA UPDATE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("update-form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se toman los datos del modal y los convierte a formData
  let parameters = new FormData(getElementById("update-form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datos_categoria.id);
  parameters.append(
    "visibilidad_update",
    datos_categoria.visibilidad ? "1" : "0"
  );
  document.getElementById("verDatosliminados").checked = false;
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow(API_CATEGORIA, API_UPDATE, parameters, fillTableCategoria);
  // Cerrar el modal de actualizar
  $("#actualizar").modal("hide");
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete-form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datos_categoria.id);
  // Se llama a la función que realiza la borrar. Se encuentra en el archivo components.js
  await deleteRow(API_CATEGORIA, parameters, fillTableCategoria);
});
