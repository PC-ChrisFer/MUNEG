import {
    SERVER,
    GET_METHOD,
    API_SUCESS_REQUEST,
    API_CHECK_SESSION,
  } from "../../controller/constants/api_constant.js";
  import { APIConnection } from "../APIConnection.js";


  const API_USUARIOS = SERVER + "privada/usuario.php?action=";


export async function validateExistenceOfUser() {
    //CODIGO PARA VALIDAR SI HAY UNA SESION ACTIVA
    // SE DEBE DE PEGAR EN TODOS LOS EVENTOS QUE SE EJECUTAN CUANDO SE CARGA LA PAGINA
    let APIEndpoint = API_USUARIOS + "checkSession";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    if (APIResponse.session
        
        
        
        == API_SUCESS_REQUEST) {
      console.log("all good")
      return;
    }
    window.location.href = "../privada/index.html";
  }