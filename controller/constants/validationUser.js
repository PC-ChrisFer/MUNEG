import {
  SERVER,
  GET_METHOD,
  API_SUCESS_REQUEST,
  POST_METHOD,
} from "../../controller/constants/api_constant.js";
import { APIConnection } from "../APIConnection.js";

const API_USUARIOS = SERVER + "privada/usuario.php?action=";

export async function validateExistenceOfUser() {
  //CODIGO PARA VALIDAR SI HAY UNA SESION ACTIVA
  // SE DEBE DE PEGAR EN TODOS LOS EVENTOS QUE SE EJECUTAN CUANDO SE CARGA LA PAGINA
  let APIEndpoint = API_USUARIOS + "checkSession";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.session == API_SUCESS_REQUEST) {
    let APIEndpoint2 = API_USUARIOS + "readDate";
    let APIResponse2 = await APIConnection(APIEndpoint2, POST_METHOD, null);
    // Obteniedno fecha actual
    let fechaActual = moment(new Date());
    let fechaPass = APIResponse2.dataset.fecha_cambio_contra;
    let differenceDays = fechaActual.diff(fechaPass, "days")


    if (differenceDays >= 90) {
      console.log("hola");
      window.location.href = "http://localhost/MUNEG/views/privada/cambiar_password.html";
      //return;
    }
    console.log("all good");
    return;
  }
  window.location.href = "../privada/index.html";
}
