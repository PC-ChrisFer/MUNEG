//Importar las constantes y metodos de components.js y api_constant.js
import { APIConnection } from "../APIConnection.js";
import { getElementById } from "../constants/functions.js";
import {
  API_SUCESS_REQUEST,
  GET_METHOD,
  POST_METHOD,
  SERVER,
  API_LOG_IN
} from "../constants/api_constant.js";

// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_USUARIOS = SERVER + 'privada/usuario.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
  let APIEndpoint = API_USUARIOS + 'checkSession';
  // haciendo coneccion con la API pormedio del enpoint
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  // valida session activa
  if (APIResponse.session == API_SUCESS_REQUEST) {
    // REENVIA A LA PAGINA ASIGNADA
    window.location.href = "pagina_principal.html";
  } 
});


// Método manejador de eventos que se ejecuta cuando se envía el formulario de iniciar sesión.
getElementById('logInForm')?.addEventListener('submit', async (event) => {
    // EVITA RECARGAR LAS PAGINA DESPUES DE ENVIAR EL FORM
    event.preventDefault();
    // Se crea un end point para consultar la información de los usuarios
    let APIEndpoint = API_USUARIOS + API_LOG_IN;
    // CONVIRTIENDO EL JSON A FORMDATA
    let parameters = new FormData(getElementById('logInForm'))
    // Petición para revisar si el administrador se encuentra registrado.
    let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);
    // Si la respuesta posee un valor positivo
    if (APIResponse.status) {
      //Redirecciona a la pagina principal de caso positivo
      window.location.href ="pagina_principal.html"
    } else {
      // Se muestra que hubo error a la hora de loggearse
      $('#error_proceso').modal('show');
      console.log("USER DOESNT EXIST");
    }
  });