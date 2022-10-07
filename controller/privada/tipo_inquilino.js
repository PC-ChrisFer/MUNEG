// @ts-check
//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow, readDeletedRowns } from "../components.js";
import { SERVER } from "../constants/api_constant.js";
import { getElementById } from "../constants/helpers.js";
import { API_CREATE, API_UPDATE } from "../constants/api_constant.js"; 
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { inactivityTime } from "../soporte/soporte.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_TIPO_INQUILINO = SERVER + "privada/tipo_inquilino.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_tipo_inquilino = {
    id: 0,
    nombre_tipo: " ",
    visibilidad: " ",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
    await validateExistenceOfUser();
    await readRows(API_TIPO_INQUILINO, fillTableTipoInquilino);
    inactivityTime();
});

//Metodo para llenar las tablas de datos, utiliza la función readRows()
 function fillTableTipoInquilino(dataset) {
  let content = "";
  dataset.map((row) => {
    console.log(row)
    content += ` 
            <tr>  
                <td>${row.nombre_tipo}</td>
                <td>${row.visibilidad}</td> 
                
                <td class="d-flex justify-content-center">
                    <div class="btn-group" role="group">
                            <a onclick="guardarDatosTipoInquilinoUpdate('${row.id_tipo_inquilino}', '${row.nombre_tipo}', '${row.visibilidad}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
                                <img src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                            <a  onclick="guardarDatosTipoInquilinoDelete('${row.id_tipo_inquilino}')"  class="btn edit_add_deleteButtons delete"   id="button_ver_mas"
                            name="search">
                                <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
                    </div>
                </td>
            </tr>
        `;
  });
  // Se muestran cada filas de los registros
  getElementById("tbody-TipoInquilino").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE INQUILINO
// @ts-ignore
window.guardarDatosTipoInquilinoUpdate = (id_tipo_inquilino, nombre_tipo, visibilidad) => {
    datos_tipo_inquilino.id = id_tipo_inquilino;
    $("#actualizar").modal("show");

    //@ts-ignore
    getElementById("tipo_inquilino_update").value = String(nombre_tipo);
    getElementById("visibilidad_update").value = String(visibilidad);
};
  
// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE INQUILINO
// @ts-ignore
window.guardarDatosTipoInquilinoDelete = (id_tipo_inquilino) => {
datos_tipo_inquilino.id = id_tipo_inquilino;
$("#eliminarForm").modal("show");
}; 

window.cambiarVisibilidadDeResgistro = () => {
    getElementById("verDatosliminados").checked === true ?  datos_tipo_inquilino.visibilidad = true :  datos_tipo_inquilino.visibilidad = false 
  
  };
  
  // @ts-ignore
  window.leerDatosEliminados = async () => {
    getElementById("verDatosliminados").checked === true
      ? await readDeletedRowns(API_TIPO_INQUILINO, fillTableTipoInquilino)
      : await readRows(API_TIPO_INQUILINO, fillTableTipoInquilino);
  };

// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    await searchRows(API_TIPO_INQUILINO, "search-bar", fillTableTipoInquilino);
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
    await saveRow(API_TIPO_INQUILINO, API_CREATE, parameters, fillTableTipoInquilino);
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
    parameters.append("id_tipo_inquilino", datos_tipo_inquilino.id);
    parameters.append("visibilidad_update", getElementById("visibilidad_update").checked == true ? '1' : '0');

  
    // API REQUEST
    await saveRow(API_TIPO_INQUILINO, API_UPDATE, parameters, fillTableTipoInquilino);
});

//EVENTO PARA DELETE
getElementById("delete-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    // Se cierra el formulario de registro
    console.log('prueba')
    // CONVIRTIENDO EL JSON A FORMDATA
    let parameters = new FormData();
    //@ts-ignore
    parameters.append("id_tipo_inquilino", datos_tipo_inquilino.id);
  
    //API REQUEST
    await deleteRow(API_TIPO_INQUILINO, parameters, fillTableTipoInquilino);
    $("#eliminar").modal("hide");

});
