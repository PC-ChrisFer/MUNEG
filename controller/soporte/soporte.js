//@ts-check
import { APIConnection } from "../APIConnection.js";
import { API_SUCESS_REQUEST, GET_METHOD, SERVER } from "../constants/api_constant.js";

export function obtenerNumeroAleatorio(min, max) {
    return Math.floor( Math.random() * (max - min) + min);
  }

export async function envirarEmailRecuperacionContraseña(URL,correo) { 
  //Inicializadno libreria 
 emailjs.init("XvdiLPYrw4ZVNcvss");

  //INICIALIZANDO PARAMETROS
  let parameters = {
      url:URL,
      "to":correo     
  }

  // ENVIO DE INFORMACION
   await emailjs.send("service_48tm3u4","recuperacion_template",parameters);
}


export var inactivityTime = function () {
  const API_USUARIO = SERVER + "privada/usuario.php?action=";

  // var time;
  // window.onload = resetTimer;
  // // DOM Events
  // document.onmousemove = resetTimer;
  // document.onkeydown = resetTimer;

  // async function logout() {
  //   let APIEndpoint = API_USUARIO + "logOut";
  //   let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  
  //   if (APIResponse.status == API_SUCESS_REQUEST) {
  //     location.href = "index.html";
  //     return;
  //   }
  // }

  // function resetTimer() {
  //     clearTimeout(time);
  //     time = setTimeout(logout, 30000000000000)
  //     // 1000 milliseconds = 1 second
  // }
};