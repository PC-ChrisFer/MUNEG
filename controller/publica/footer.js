//@ts-check
import { getElementById } from "../constants/helpers.js";
import {
  SERVER,
  API_CREATE
} from "../constants/api_constant.js";

import { saveRow } from "../components.js";



// Constante para establecer la ruta y parámetros de comunicación con la API.

const API_CLIENTE = SERVER + "publica/cliente.php?action=";



// EVENTO PARA INSERT

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.

//@ts-ignore

getElementById("insert-modal").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  //@ts-ignore
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"
  let parameters = new FormData(getElementById("insert-modal"));
  var object = {};
  parameters.forEach(function(value, key){
    object[key] = value;
  });
    var json = JSON.stringify(object);
  console.log(json);
  // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERSION DE DATOS
  await saveRow(API_CLIENTE, API_CREATE, parameters, null);

});