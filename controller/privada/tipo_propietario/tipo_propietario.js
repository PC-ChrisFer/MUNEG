//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow } from "../../components.js";
import { SERVER } from "../../constants/api_constant.js";
import { getElementById, validateExistenceOfUser } from "../../constants/helpers.js";
import { API_CREATE, API_UPDATE } from "../../constants/api_constant.js";
import { fillTableTipoPropietario } from "./fill.js";
import { inactivityTime } from "../../soporte/soporte.js";


//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_TIPO_PROPIETARIO = SERVER + "privada/tipo_propietario.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
    //Valida que el usuario este logeado
    await validateExistenceOfUser();
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    await readRows(API_TIPO_PROPIETARIO, fillTableTipoPropietario);
    inactivityTime();
});

// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    await searchRows(API_TIPO_PROPIETARIO, "search-bar", fillTableTipoPropietario);
});  


// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert-form").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se cierra el formulario de registro
    $("#agregar").modal("hide");
    //@ts-ignore
    //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"
    let parameters = new FormData(getElementById("insert-form"));
  
    // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERSION DE DATOS
    await saveRow(API_TIPO_PROPIETARIO, API_CREATE, parameters, fillTableTipoPropietario);
});

// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update-form").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se cierra el formulario de registro
    $("#actualizar").modal("hide");
    //@ts-ignore
    let parameters = new FormData(getElementById("update-form"));
    //@ts-ignore
    parameters.append("id_tipo_propietario", datos_tipo_propietario.id);
    parameters.append("visibilidad_update", getElementById("visibilidad_update").checked == true ? '1' : '0');

  
    // API REQUEST
    await saveRow(API_TIPO_PROPIETARIO, API_UPDATE, parameters, fillTableTipoPropietario);
});

//EVENTO PARA DELETE
getElementById("delete-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    // Se cierra el formulario de registro
    console.log('prueba')
    // CONVIRTIENDO EL JSON A FORMDATA
    let parameters = new FormData();
    //@ts-ignore
    parameters.append("id_tipo_propietario", datos_tipo_propietario.id);
  
    //API REQUEST
    await deleteRow(API_TIPO_PROPIETARIO, parameters, fillTableTipoPropietario);
    $("#eliminar").modal("hide");

});
