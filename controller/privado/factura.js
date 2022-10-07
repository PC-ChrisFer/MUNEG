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
const API_FACTURA = SERVER + "privada/factura.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_factura = {
    id: 0,
    codigo_factura: " ",
    descripcion: " ",
    direccion: " ",
    subtotal: " ",
    IVA: " ",
    venta_gravada: " ",
    fecha: " ",
    id_inquilino: " "
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
    //Valida que el usuario este logeado
    validateExistenceOfUser();
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    await readRows(API_FACTURA, fillTableFactura);
});

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableFactura(dataset) {
    let content = "";
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map((row) => {
      // Se crean y concatenan las filas de la tabla con los datos de cada registro.
      content += ` 
              <tr>  
                  <td>${row.codigo_factura}</td>
                  <td>${row.descripcion}</td> 
                  <td>${row.direccion}</td> 
                  <td>${row.subtotal}</td> 
                  <td>${row.IVA}</td> 
                  <td>${row.venta_gravada}</td> 
                  <td>${row.fecha}</td> 
                  <td>${row.id_inquilino}</td> 

                  <td class="d-flex justify-content-center">
                      <div class="btn-group" role="group">
                          <form method="post" id="read-one">
                              <a onclick="guardarDatosCategoriaUpdate(${row.id_factura},'${row.codigo_factura}, ${row.descripcion}, ${row.direccion}, ${row.subtotal}, ${row.IVA}, ${row.venta_gravada}, ${row.fecha}, ${row.id_inquilino}')" class="btn btn-primary">
                              <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                              <a  onclick="guardarDatosCategoriaDelete(${row.id_categoria})"  class="btn btn-primary"  
                              name="search">
                              <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                              </form>
                      </div>
                  </td>
              </tr>
          `;
    });
    // Se muestran cada filas de los registros
    getElementById("tbody-Factura").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL CATEGORIA
// @ts-ignore
window.guardarDatosFacturaUpdate = (id_factura, codigo_factura, descripcion, direccion, subtotal, IVA, venta_gravada, fecha) => {
    datos_factura.id = id_factura;
    $("#actualizarform").modal("show");
  
    // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE ELINPUT TENGA
    //EL ATRIBUTO "value="""
    //@ts-ignore
    getElementById("codigo_factura_update").value = String(codigo_factura);
    getElementById("descripcion_update").value = String(descripcion);
    getElementById("direccion_update").value = String(direccion);
    getElementById("subtotal_update").value = String(subtotal);
    getElementById("IVA_update").value = String(IVA);
    getElementById("venta_gravada_update").value = String(venta_gravada);
    getElementById("fecha_update").value = String(fecha);

};

// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    await searchRows(API_FACTURA, "search-bar", fillTableFactura);
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
    await saveRow(API_FACTURA, API_CREATE, parameters, fillTableFactura);
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
    parameters.append("id", datos_factura["id"]);
  
    // API REQUEST
    await saveRow(API_FACTURA, API_UPDATE, parameters, fillTableFactura);
});


//EVENTO PARA DELETE
getElementById("delete-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    // Se cierra el formulario de registro
    $("#eliminarForm").modal("hide");
    // CONVIRTIENDO EL JSON A FORMDATA
    let parameters = new FormData();
    //@ts-ignore
    parameters.append("id", datos_factura["id"]);
  
    //API REQUEST
    await deleteRow(API_FACTURA, parameters, fillTableFactura);
});
  