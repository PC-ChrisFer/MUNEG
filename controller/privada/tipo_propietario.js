// @ts-ignore
//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow } from "../components.js";
import {
    INSERT_MODAL,
    SEARCH_BAR,
    SERVER,
    SUBMIT,
} from "../constants/api_constant.js";
import {
    getElementById,
     validateExistenceOfUser,
} from "../constants/functions.js";
import { API_CREATE, API_UPDATE, GET_METHOD } from "../constants/api_constant.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_TIPO_PROPIETARIO = SERVER + "privada/tipo_propietario.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_tipo_propietario = {
    id: 0,
    nombre_tipo: " ",
    visibilidad: " ",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
    //Valida que el usuario este logeado
    await validateExistenceOfUser();
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    await readRows(API_TIPO_PROPIETARIO, fillTableTipoPropietario);
    inactivityTime();
});

//Metodo para llenar las tablas de datos, utiliza la función readRows()
 function fillTableTipoPropietario(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    console.log(row)
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
            <tr>  
                <td>${row.nombre_tipo}</td>
                <td>${row.visibilidad}</td> 
                
                <td class="d-flex justify-content-center">
                    <div class="btn-group" role="group">
                            <a onclick="guardarDatosTipoPropietarioUpdate('${row.id_tipo_propietario}', '${row.nombre_tipo}', '${row.visibilidad}')" class="btn btn-primary">
                                <img src="../../resources/img/iconos_formularios/edit_35px.png" data-bs-toggle="modal"
                                data-bs-target="#actualizar"></a>
                            <a  onclick="guardarDatosTipoPropietarioDelete(${row.id_tipo_propietario})"  class="btn btn-primary"  
                            name="search">
                                <img src="../../resources/img/iconos_formularios/trash_can_35px.png" data-bs-toggle="modal"
                                data-bs-target="#eliminar"></a>
                    </div>
                </td>
            </tr>
        `;
  });
  // Se muestran cada filas de los registros
  getElementById("tbody-TipoPropietario").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE PROPIETARIO
// @ts-ignore
window.guardarDatosTipoPropietarioUpdate = (id_tipo_propietario, nombre_tipo, visibilidad) => {
    datos_tipo_propietario.id = id_tipo_propietario;
    $("#actualizar").modal("show");
  
    // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE EL INPUT TENGA
    //EL ATRIBUTO "value="""
    //@ts-ignore
    getElementById("tipo_propietario_update").value = String(nombre_tipo);
    getElementById("visibilidad_update").value = String(visibilidad);
};
  
// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE PROPIETARIO
// @ts-ignore
window.guardarDatosTipoPropietarioDelete = (id_tipo_propietario) => {
datos_tipo_propietario.id = id_tipo_propietario;
$("#eliminarForm").modal("show");
};

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

var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
  
    async function logout() {
      let APIEndpoint = API_USUARIO + "logOut";
      let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    
      if (APIResponse.status == API_SUCESS_REQUEST) {
        location.href = "index.html";
        return;
      }
      console.log("SOMETHING WENT WRONG");
    }
  
    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 300000)
        // 1000 milliseconds = 1 second
    }
  };