import { APIConnection } from "../APIConnection.js";
import {
  API_SUCESS_REQUEST, GET_METHOD, POST_METHOD, SERVER
} from "../constants/api_constant.js";
import { getElementById } from "../constants/helpers.js";

// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_USUARIOS = SERVER + "privada/usuario.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
  let APIEndpoint = API_USUARIOS + 'readEmpleado';
  // haciendo coneccion con la API pormedio del enpoint
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  // valida session activa
  console.log(APIEndpoint);
  console.log(APIResponse);
  if (APIResponse.session) {
    // REENVIA A LA PAGINA ASIGNADA
    location.href = "pagina_principal.html";
    console.log('hay sesion iniciada')
    // VALIDA QUE EXISTA UN USUARIO
  } else if (APIResponse.status == API_SUCESS_REQUEST) {
    location.href = "index.html";
    console.log('si hay usuario')
  }
});

getElementById('singUp-form')?.addEventListener('submit', async(event) =>{
  //Evitar que se recargue la pagina
  event.preventDefault();
  //Creando el endpoint para registrar el primer usuario
  let APIEndpoint = API_USUARIOS + "registerEmpleadoUser";
  //Parametros para registrar el usuario (nombre del user, contraseña y confirmación de contra)
  let parameters = new FormData(getElementById('singUp-form'));
  //Petición para enviar la información de el usuario
  let APIResponse = await APIConnection( APIEndpoint, POST_METHOD, parameters );
  //
  if (APIResponse.status) { 
    console.log("REGISTRADO")
    location.href = "index.html";
  } else {
    console.log("no se pudo registrar usuario");
  }
});