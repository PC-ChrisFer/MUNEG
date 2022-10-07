//@ts-check
import { API_SUCESS_REQUEST, GET_METHOD, SERVER } from "./api_constant.js";
import { APIConnection } from "../APIConnection.js";

const API_USUARIOS = SERVER + "privada/usuario.php?action=";
const API_USUARIOS_PUBLIC = SERVER + "publica/usuario.php?action=";

export function getElementById(elementID) {
  // se toma en cuenta que se comporte como un "HTMLInputElement"
  //@ts-ignore
  return  document.getElementById(elementID)  ;
}

export async function validateExistenceOfUser() {
  //CODIGO PARA VALIDAR SI HAY UNA SESION ACTIVA
  // SE DEBE DE PEGAR EN TODOS LOS EVENTOS QUE SE EJECUTAN CUANDO SE CARGA LA PAGINA
  let APIEndpoint = API_USUARIOS + "checkSession";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    window.location.href = "http://localhost/MUNEG/views/privada/index.html";
  }
}

export async function getUser() {
  let APIEndpoint = API_USUARIOS_PUBLIC + "getUser";
  let APIResponseGetUset = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponseGetUset == API_SUCESS_REQUEST) {
    return APIResponseGetUset;
  }
}

//Convierte el datos del id de json a formData
export function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  console.log(formData);
  return formData;
}

export function uncheckButton(checkButtonID) {
  $(checkButtonID).prop("checked", false);
}

export function checkButton(checkButtonID) {
  $(checkButtonID).prop("checked", true);
}

export function showModal(modalID) {
  $(modalID).modal("show");
}

export function closeModal(modalID) {
  $(modalID).modal("hide");
}

//CREANDO FUNCTION LOGOUT
window.logOut = async () => {};
