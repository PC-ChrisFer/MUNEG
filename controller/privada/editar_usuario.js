//Importar las constantes y metodos de components.js y api_constant.js
import {
  deleteRow,
  readRows,
  saveRow,
  readDeletedRowns,
} from "../components.js";
import {
  SERVER,
  API_UPDATE,
  API_SUCESS_REQUEST,
  GET_METHOD,
} from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_URUSARIO = SERVER + "privada/usuario.php?action=";
const API_EDICION_USUARIO = SERVER + "privada/editar_usuario.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATElet
let datosUsuario = {
  id_usuario: "",
  nombre_usuario: "",
  password: "",
  tipo_usuario: "",
  propiedatio_id: "",
  empleado_id: "",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  let APIEndpoint = API_GESTION_URUSARIO + "readOne";
  // haciendo coneccion con la API pormedio del enpoint
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  console.log(APIResponse);
  // valida session activa
  inactivityTime();
  if (APIResponse.session == API_SUCESS_REQUEST) {
    // REENVIA A LA PAGINA ASIGNADA
    getElementById("nombre_usuario").value = APIResponse.dataset.nombre_usuario;
    getElementById("password_user").value = APIResponse.dataset.password;
    datosUsuario.id_usuario = APIResponse.dataset.id_usuario;
  }
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
  var object = {};
  parameters.forEach(function (value, key) {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  console.log(json)
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow(API_EDICION_USUARIO, API_UPDATE, parameters);
  // Se cierra el formulario de registro
  $("#actualizar").modal("hide");
});

var inactivityTime = function () {
  var time;
  window.onload = resetTimer;
  // DOM Events
  document.onmousemove = resetTimer;
  document.onkeydown = resetTimer;

  async function logout() {
    let APIEndpoint = API_USUARIO + "logOut";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  
    if (APIResponse.status == API_SUCESS_REQUEST) {
      location.href = "index.html";
      return;
    }
    console.log("SOMETHING WENT WRONG");
  }

  function resetTimer() {
      clearTimeout(time);
      time = setTimeout(logout, 300000)
      // 1000 milliseconds = 1 second
  }
};