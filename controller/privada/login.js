//@ts-check
//Importar las constantes y metodos de components.js y api_constant.js
import { APIConnection } from "../APIConnection.js";
import { getElementById } from "../constants/functions.js";
import {
  API_SUCESS_REQUEST,
  GET_METHOD,
  POST_METHOD,
  SERVER,
  API_LOG_IN,
} from "../constants/api_constant.js";
import { sendEmail } from "./segundoFactor_Autentificacion/segundoFactor_autentificacion.js";

let userData = {
  logInTryCount: 0,
  userName: null,
};

// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_USUARIOS = SERVER + "privada/usuario.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  let APIEndpoint = API_USUARIOS + "checkSession";
  // haciendo coneccion con la API pormedio del enpoint
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Verifica la existencia de usuarios
  let APIEndpoint2 = API_USUARIOS + "readEmpleado";
  // haciendo coneccion con la API pormedio del enpoint
  let APIResponse2 = await APIConnection(APIEndpoint2, GET_METHOD, null);
  // valida session activa
  if (APIResponse.session == API_SUCESS_REQUEST) {
    // REENVIA A LA PAGINA ASIGNADA
   // window.location.href = "pagina_principal.html";
  } else if (APIResponse2.status != API_SUCESS_REQUEST) {
    //REENVIA A LA PAGINA DE PRIMER USUARIO
    //location.href = "primer_uso.html";
    console.log("NO hay usuarios en existencia");
  } else {
    console.log("Hay usuarios en existencia");
  }
});

getElementById("logInForm")?.addEventListener("submit", async (event) => {
  // EVITA RECARGAR LAS PAGINA DESPUES DE ENVIAR EL FORM
  event.preventDefault();
  // Se crea un end point para consultar la información de los usuarios
  let APIEndpoint = API_USUARIOS + API_LOG_IN;
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData(getElementById("logInForm"));
  // Petición para revisar si el administrador se encuentra registrado.
  let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);
  // Si la respuesta posee un valor positivo
  if (APIResponse.status) {
    //Consulta el correo electronico del usuario
    let APIMailRequest = API_USUARIOS + 'readMail';
    //Realizando la consulta
    let APIMailResponse = await APIConnection(APIMailRequest, POST_METHOD, parameters);
    //Abriendo formulario al encontrar información
    if(APIMailResponse.status == API_SUCESS_REQUEST){
      console.log('NICE')
      // Se muestra que hubo error a la hora de loggearse
        console.log(APIMailResponse.dataset.correo_electronic)

      await sendEmail(APIMailResponse.dataset.correo_electronico);
      $("#modalConfirmacion").modal("show");
    } else{
      console.log('NOT NICE')
    }

    
    //Redirecciona a la pagina principal de caso positivo
    } else {
    let getUserEnpoint = API_USUARIOS + "userExist";
    let getUserInformation = new FormData();
    getUserInformation.append( "nombre_usuario", getElementById("userNameInput").value );
    //OBTENIENDO DATOS
    let validateUserExistence = await APIConnection(
      getUserEnpoint,
      POST_METHOD,
      getUserInformation
    );

    if (validateUserExistence.status == API_SUCESS_REQUEST) {
      // Validando que el usuario ingresado sea el mismo de los diferentes intentos
      if ( getElementById("userNameInput").value == userData.userName || userData.userName == null ) {
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
      // Se muestra que hubo error a la hora de loggearse
      $("#error_proceso").modal("show");
    } else {
      //RESETEANDO DATOS
      userData.userName = null;
      userData.logInTryCount = 0;
      console.log("No existe");
    }
  }
});

 async function envirarEmailRecuperacionContraseña(URL,correo ) { 
  //Inicializadno libreria 
 emailjs.init("JSwLPixUlUBv4PZXA");

  //INICIALIZANDO PARAMETROS
  let parameters = {
      url:URL,
      "to":correo     
  }

  // ENVIO DE INFORMACION
   await emailjs.send("service_icg8p0a","resetPassword",parameters);
}

// @ts-ignore
window.abrirGuardarDato = () => {
  // @ts-ignore
  $("#correo_enviado").modal("show");
};

window.comprobarDato = async () => {
  let endpointEmail = API_USUARIOS + 'readMail'
  let parametros = new FormData()
  parametros.append('nombre_usuario', getElementById('nombre_usuario').value)
  let respuesta = await APIConnection(endpointEmail, POST_METHOD, parametros)

  console.log(respuesta)

  let URL = "http://localhost/MUNEG/views/privada/cambiar.html?id="+respuesta.dataset.id_empleado;

  //ENVIANDO EMAIL
    //Inicializadno libreria 
 emailjs.init("JSwLPixUlUBv4PZXA");

 //INICIALIZANDO PARAMETROS
 let parameters = {
     url:URL,
     "to": respuesta.dataset.correo_electronico    
 }

 // ENVIO DE INFORMACION
  let res = await emailjs.send("service_icg8p0a","resetPassword",parameters);

  console.log(res)

  if  (res.status = 200){
    $("#proceso_bien").modal("show");
  } else {
    $("#error_proceso").modal("show");
  }

}



