//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow, pieGraph } from "../components.js";
import { API_SUCESS_REQUEST, POST_METHOD, SERVER } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { API_CREATE, API_UPDATE, GET_METHOD } from "../constants/api_constant.js";
import { APIConnection } from "../APIConnection.js";

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
  id_inquilino: " ",
};

let datos_inquilino = {
  id_inquilino: 0,
  nombre: " ",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_FACTURA, fillTableFactura);
  //Cargar combo box de Inquilino
  await fillComboBoxInquilino();
});

//Obtener los datos de combobox tipo empleado
async function fillComboBoxInquilino() {
  //Se crea un endpoint especifico para el caso de leer tipo empleado
  let APIEndpoint = SERVER + "privada/factura.php?action=readInquilino";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta                
    getElementById("id_inquilino").innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
  });
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta                
    getElementById("id_inquilino_update").innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
  });
  APIResponse.dataset.map((element) => {
    //Cargar los datos obtenidos de la consulta                
    getElementById("cmb_inquilino").innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
  });
}


//Función para cambiar la visibilidad con un checkbox
window.seleccionarInquilino = () => {
  datos_inquilino.id_inquilino = document.getElementById("id_inquilino").value;
};

//Función para guardar los datos cambiados en el combobox
window.selectInquilino = (id_inquilino) => {
  datos_factura.id_inquilino = document.getElementById(id_inquilino).value;
};


//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableFactura(dataset) {
  //Se define el contenido html
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
                              <a onclick="guardarDatosUpdate(${row.id_factura},'${row.codigo_factura}', '${row.descripcion}', '${row.direccion}', '${row.subtotal}', '${row.IVA}', '${row.venta_gravada}', '${row.fecha}', '${row.id_inquilino}')" class="btn" id="button_ver_mas">
                              <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                              <a  onclick="guardarDatosDelete(${row.id_factura})"  class="btn" id="button_ver_mas"  
                              name="search" >
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
window.guardarDatosUpdate = (
  id_factura,
  codigo_factura,
  descripcion,
  direccion,
  subtotal,
  IVA,
  venta_gravada,
  fecha,
  inquilino
) => {
  //Se transfieren los datos del boton al json global
  datos_factura.id = id_factura;
  //Se llama el modal de actualizar
  $("#actualizar").modal("show");
  //Desarrollando los select
  getElementById("id_inquilino_update").value = "61";
  //Se imprime la información en el modal
  getElementById("codigo_factura_update").value = String(codigo_factura);
  getElementById("descripcion_update").value = String(descripcion);
  getElementById("direccion_update").value = String(direccion);
  getElementById("subtotal_update").value = String(subtotal);
  getElementById("IVA_update").value = String(IVA);
  getElementById("venta_gravada_update").value = String(venta_gravada);
  getElementById("fecha_emision_update").value = String(fecha);
  getElementById("id_inquilino_update").value = String(inquilino);
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_factura) => {
  //Se transfieren los datos del boton al json global
  datos_factura.id = id_factura;
   //Se llama el modal de borra
  $("#eliminar").modal("show");
};

// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_FACTURA, "search-bar", fillTableFactura);
});

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert-form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#agregar").modal("hide");
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"
  let parameters = new FormData(getElementById("insert-form"));
  // Se llama a la función que realiza la inserción. Se encuentra en el archivo components.js
  await saveRow(API_FACTURA, API_CREATE, parameters, fillTableFactura);
});

//EVENTO PARA UPDATE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("update-form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#actualizar").modal("hide");
  // Se toman los datos del modal y los convierte a formData
  let parameters = new FormData(getElementById("update-form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datos_factura.id);
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow(API_FACTURA, API_UPDATE, parameters, fillTableFactura);
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete-form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datos_factura["id"]);
  // Se llama a la función que realiza la borrar. Se encuentra en el archivo components.js
  await deleteRow(API_FACTURA, parameters, fillTableFactura);
});

// Función para crear el grafico que, "La cantidad  de inquilinos por municipio segun el departamento"
export async function graphPieFacturaInquilino(id_inquilino) {
  //Creo un formData para los parametros
  let parameters = new FormData();
  //Inserto el id_producto a los parametros
  parameters.append("id_inquilino", id_inquilino);
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_FACTURA + "graphFactura";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a gráficar.
      let nombre_estado  = [];
      let num_factura = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        nombre_estado.push(row.nombre_estado);
        num_factura.push(row.count);
      });
      getElementById('graph_contrato').innerHTML = '<canvas id="chartFactura" style="background-color: white; border-radius: 20px"></canvas>'
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      pieGraph(
        "chartFactura",
        nombre_estado,
        num_factura,
        "Cantidad de Facturas emitidas a un inquilino ."
      );
    } else {
      console.log(response.exception);
    }
  }
}

//Funcion para generar grafico a traves del click de un boton
window.generarGrafico = async () => {
  console.log(datos_factura.id_inquilino);
  await graphPieFacturaInquilino(datos_factura.id_inquilino);
};
