import { getElementById, showModal } from "../constants/helpers.js";
import { sqlErrors } from "./sqlErrors.js";

export function showErrorModal(errorCode) {
  let sqlError = sqlErrors.find((element) => {
    return String(element["Error Code"]) == String(errorCode);
  });
  // ASIGNA EL TEXTO AL PARRAFO EXPECIFICADO
  getElementById("dataBaseErrorMessage").innerText =
    sqlError.Significado ?? "ALGO SALIO MAL";

  // ABRE MODAL DE ERROR
  showModal("#modalErrorDeBaseDeDatos")
}

export function showGenericErrorModal(error) {
  // ASIGNA EL TEXTO AL PARRAFO EXPECIFICADO
  getElementById("dataBaseErrorMessage").innerText = error;
  // ABRE MODAL DE ERROR
  showModal("#modalErrorDeBaseDeDatos")
}

//Creando un temporarizador interno para contar el tiempo idle de un usuario
//Al superar 5 minutos el usuario sera devuelto al login
var inactivityTime = function () {
  //variable de tiempo, guardara el tiempo transcurrido
  var time;
  //Restear el temporarizador
  window.onload = resetTimer;
  //Al hacer click
  document.onclick = resetTimer;
  //Al mover el mouse
  document.onmousemove = resetTimer;
  document.onmouseup = resetTimer;
  document.onmousedown = resetTimer;
  //Al presionar el teclado
  document.onkeydown = resetTimer;
  //Al presionar la pantalla tactil
  document.ontouchstart = resetTimer;
  //Al scrollear
  window.addEventListener("scroll", resetTimer, true);

  async function logOut() {
    let APIEndpoint = API_USUARIOS + "logOut";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);

    if (APIResponse.status == API_SUCESS_REQUEST) {
      return;
    }
  }

  //Función para resetear el temporizador
  async function resetTimer() {
    //Borra el tiempo actual en el temporizador
    clearTimeout(time);
    //Le asigna un nuevo valor al tiempo
    time = setTimeout(await logOut(), 3000);
    //1000 milisegundos a 1 segundo
  }
};
