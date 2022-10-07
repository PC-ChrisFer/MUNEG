//@ts-check
//Importar las constantes y metodos de components.js y api_constant.js
import { APIConnection } from "../../APIConnection.js";
import {
  API_LOG_IN,
  API_SUCESS_REQUEST,
  GET_METHOD,
  POST_METHOD,
  SERVER,
} from "../../constants/api_constant.js";
import { getElementById, showModal } from "../../constants/helpers.js";
import { sendEmail } from "../segundoFactor_Autentificacion/segundoFactor_autentificacion.js";
import {  } from "./windowFunctions.js";

let userData = {
  logInTryCount: 0,
  userName: null,
};

// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_USUARIOS = SERVER + "privada/usuario.php?action=";

document.addEventListener("DOMContentLoaded", async () => {
  let APIEndpoint = API_USUARIOS + "checkSession";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  let APIEndpoint2 = API_USUARIOS + "readEmpleado";

  let APIResponse2 = await APIConnection(APIEndpoint2, GET_METHOD, null);
  if (APIResponse.session == API_SUCESS_REQUEST) {
    window.location.href = "pagina_principal.html";
  } else if (APIResponse2.status != API_SUCESS_REQUEST) {
    location.href = "primer_uso.html";
  }

});

getElementById("logInForm")?.addEventListener("submit", async (event) => {
  // EVITA RECARGAR LAS PAGINA DESPUES DE ENVIAR EL FORM
  event.preventDefault();

  //Consulta el correo electronico del usuario
  let APIMailRequest = API_USUARIOS + "readMail";
  let parameters = new FormData();
  parameters.append("nombre_usuario", getElementById("userNameInput").value);

  //Realizando la consulta
  let APIMailResponse = await APIConnection(
    APIMailRequest,
    POST_METHOD,
    parameters
  );

  // Si la respuesta posee un valor positivo
  if (APIMailResponse.status == API_SUCESS_REQUEST) {
    //Abriendo formulario al encontrar información
    if (APIMailResponse.status == API_SUCESS_REQUEST) {
      await sendEmail(APIMailResponse.dataset.correo_electronico);
      showModal("#modalConfirmacion");
    }
    //Redirecciona a la pagina principal de caso positivo
  } else {
    let getUserEnpoint = API_USUARIOS + "userExist";
    let getUserInformation = new FormData();

    getUserInformation.append(
      "nombre_usuario",
      getElementById("userNameInput").value
    );

    //OBTENIENDO DATOS
    let validateUserExistence = await APIConnection(
      getUserEnpoint,
      POST_METHOD,
      getUserInformation
    );

    if (validateUserExistence.status == API_SUCESS_REQUEST) {
      // Validando que el usuario ingresado sea el mismo de los diferentes intentos
      if (
        getElementById("userNameInput").value == userData.userName ||
        userData.userName == null
      ) {
        userData.logInTryCount += 1;

        // VALIDANDO SI LOS INTENTOS SON IGUALES A 3

        if (userData.logInTryCount == 3) {
          let enpointBlockUser = API_USUARIOS + "blockUser";
          let parameters = new FormData();
          parameters.append(
            "nombre_usuario",
            getElementById("userNameInput").value
          );

          await APIConnection(enpointBlockUser, POST_METHOD, parameters);

          // RESETEANDO LOS INTENTOS DESPUES DE BLOQUEAR
          userData.userName = null;
          userData.logInTryCount = 0;
        }
        //Caso contrario el contador se reinicia
      } else {
        userData.logInTryCount = 0;
      }

      userData.userName = getElementById("userNameInput").value;
      showModal("#error_proceso");
    } else {
      //RESETEANDO DATOS
      userData.userName = null;
      userData.logInTryCount = 0;
    }
  }
});
