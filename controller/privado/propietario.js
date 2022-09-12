// @ts-ignore
//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow } from "../components.js";
import {
  DELETE_FORM,
  DOM_CONTENT_LOADED,
  INSERT_MODAL,
  SEARCH_BAR,
  SERVER,
  SUBMIT,
  UPDATE_MODAL,
} from "../constants/api_constant.js";
import {
  getElementById,
  validateExistenceOfUser,
} from "../constants/functions.js";
import { API_CREATE, API_UPDATE } from "../constants/api_constant.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_PROPIETARIO = SERVER + "privada/propietario.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_propietario = {
    id: 0,
    nombre: " ",
    apellido: " ",
    numero_telefono : " ",
    correo_electronico : " ",
    fecha_nacimiento : " ",
    genero : " ",
    DUI : " ",
    imagen : " ",
    id_tipo_propietario : " "
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_PROPIETARIO, fillTablePropietario);
});

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTablePropietario(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
            <tr>  
                <td>${row.imagen}</td> 
                <td>${row.nombre} ${row.apellido}</td>
                <td>${row.numero_telefono}</td> 
                <td>${row.correo_electronico}</td> 
                <td>${row.fecha_nacimiento}</td> 
                <td>${row.genero}</td> 
                <td>${row.DUI}</td> 
                <td>${row.id_tipo_propietario}</td> 

                <td class="d-flex justify-content-center">
                    <div class="btn-group" role="group">
                        <form method="post" id="read-one">
                            <a onclick="guardarDatosCategoriaUpdate(${row.id_propietario},'${row.nombre}, ${row.apellido}, ${row.numero_telefono}, ${row.correo_electronico}, ${row.fecha_nacimiento}, ${row.genero}, ${row.DUI}, ${row.imagen}, ${row.id_tipo_propietario}')" class="btn btn-primary">
                            <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                            <a  onclick="guardarDatosCategoriaDelete(${row.id_propietario})"  class="btn btn-primary"  
                            name="search">
                            <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                            </form>
                    </div>
                </td>
            </tr>
        `;
  });
  // Se muestran cada filas de los registros
  getElementById("tbody-Propietario").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL CATEGORIA
// @ts-ignore
window.guardarDatosPropietarioUpdate = (id_propietario, nombre, apellido, numero_telefono, correo_electronico, fecha_nacimiento, genero, DUI, imagen, id_tipo_propietario) => {
  datos_propietario.id = id_propietario;
  $("#actualizarform").modal("show");

  // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE ELINPUT TENGA
  //EL ATRIBUTO "value="""
  //@ts-ignore
  getElementById("nombre_update").value = String(nombre);
  getElementById("apellido_update").value = String(apellido);
  getElementById("numero_telefono_update").value = String(numero_telefono);
  getElementById("correo_electronico_update").value = String(correo_electronico);
  getElementById("fecha_nacimiento_update").value = String(fecha_nacimiento);
  getElementById("genero_update").value = String(genero);
  getElementById("DUI_update").value = String(DUI);
  getElementById("imagen_update").value = String(imagen);
  getElementById("id_tipo_propietario_update").value = String(id_tipo_propietario);

};

// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_PROPIETARIO, "search-bar", fillTablePropietario);
});


// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert-modal").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#agregarform").modal("hide");
  //@ts-ignore
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"
  let parameters = new FormData(getElementById("insert-modal"));

  // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERSION DE DATOS
  await saveRow(API_PROPIETARIO, API_CREATE, parameters, fillTablePropietario);
});


// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update-modal").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#actualizarform").modal("hide");
  //@ts-ignore
  let parameters = new FormData(getElementById("update-modal"));
  //@ts-ignore
  parameters.append("id", datos_propietario["id"]);

  // API REQUEST
  await saveRow(API_PROPIETARIO, API_UPDATE, parameters, fillTablePropietario);
});

//EVENTO PARA DELETE
getElementById("delete-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#eliminarForm").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  //@ts-ignore
  parameters.append("id", datos_propietario["id"]);

  //API REQUEST
  await deleteRow(API_PROPIETARIO, parameters, fillTablePropietario);
});
