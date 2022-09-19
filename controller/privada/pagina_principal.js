//Importar las constantes y metodos de components.js y api_constant.js
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";
import { SERVER,GET_METHOD,API_SUCESS_REQUEST} from "../constants/api_constant.js";

// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_USUARIOS = SERVER + 'privada/usuario.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    //Función Para validar que exista un usuario en sesión
    await validateExistenceOfUser();
  });
  

//CREANDO FUNCTION LOGOUT
//@ts-ignore
window.logOut = async () => {
    let APIEndpoint = API_USUARIOS + 'logOut'
    let APIResponse = await APIConnection(APIEndpoint,GET_METHOD,null)

    if (APIResponse.status == API_SUCESS_REQUEST) {
        location.href = "index.html";
        return 
    }
    console.log("SOMETING WENT WRONG")
}
