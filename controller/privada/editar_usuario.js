//Importar las constantes y metodos de components.js y api_constant.js
import { deleteRow, readRows, saveRow, readDeletedRowns } from "../components.js";
import { SERVER, API_UPDATE, API_SUCESS_REQUEST, GET_METHOD } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_URUSARIO = SERVER + "privada/usuario.php?action=";
const API_TIPO_USUARIO = SERVER + "privada/tipo_usuario.php?action=";
const API_EMPLEADO = SERVER + "privada/empleado.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATElet 
let datosUsuario = {
  id_usuario: "",
  nombre_usuario: "",
  password: "",
  tipo_usuario: "",
  propiedatio_id: "",
  empleado_id: ""
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado  
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_URUSARIO, fillTableUsarios);
});


// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_GESTION_TIPO_PROPIEDAD, "search-bar", fillTableTipoInquilino);
});  

// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "update_form'"  
  let parameters = new FormData(getElementById("update_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datosUsuario.id_usuario);
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow(API_GESTION_URUSARIO, API_UPDATE, parameters, fillTableUsarios);
  // Se cierra el formulario de registro
  $("#actualizar").modal("hide");
});
