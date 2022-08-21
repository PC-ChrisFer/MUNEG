<<<<<<< Updated upstream
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
=======
//@ts-check
//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow, obtenerFechaActual, generatePDF } from "../components.js";
import { POST_METHOD, SERVER } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
>>>>>>> Stashed changes
import { API_CREATE, API_UPDATE, GET_METHOD } from "../constants/api_constant.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_FACTURA = SERVER + "privada/factura.php?action=";
const API_REPORTES = SERVER + "privada/pdf.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';

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

let datos_inquilino = {
    id_inquilino: 0,
    nombre: " "
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
    //Valida que el usuario este logeado
    await validateExistenceOfUser();
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    await readRows(API_FACTURA, fillTableFactura);
    //Cargar combo box de Factura
    await fillComboBoxInquilino();
});

//Obtener los datos de combobox tipo empleado
async function fillComboBoxInquilino() {
    //Se crea un endpoint especifico para el caso de leer tipo empleado
    let APIEndpoint = SERVER + 'privada/factura.php?action=readInquilino'
    //Se utiliza como api connection para realizar la consulta
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null)
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map(element => {
        getElementById('id_inquilino').innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`
    })
    APIResponse.dataset.map(element => {
        getElementById('id_inquilino_update').innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`
    })
}

//@ts-ignore
window.seleccionarInquilino = () => {
    //@ts-ignore
    datos_inquilino.id_inquilino = document.getElementById('id_inquilino').value
}

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
                              <a onclick="guardarDatosFacturaUpdate(${row.id_factura},'${row.codigo_factura}', '${row.descripcion}', '${row.direccion}', '${row.subtotal}', '${row.IVA}', '${row.venta_gravada}', '${row.fecha}', '${row.id_inquilino}')" class="btn btn-primary">
                              <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                              <a  onclick="guardarDatosFacturaDelete(${row.id_factura})"  class="btn btn-primary"  
                              name="search">
                              <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                              <a onclick="generarReporteFactura(${row.id_factura})" class="btn" id="button_ver_mas">generar reporte</a>
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
    $("#actualizar").modal("show");
  
    // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE ELINPUT TENGA
    //EL ATRIBUTO "value="""
    //@ts-ignore
    getElementById("codigo_factura_update").value = String(codigo_factura);
    getElementById("descripcion_update").value = String(descripcion);
    getElementById("direccion_update").value = String(direccion);
    getElementById("subtotal_update").value = String(subtotal);
    getElementById("IVA_update").value = String(IVA);
    getElementById("venta_gravada_update").value = String(venta_gravada);
    getElementById("fecha_emision_update").value = String(fecha);

<<<<<<< Updated upstream
=======
//Función para cargar el id para el delete
window.guardarDatosDelete = (id_factura) => {
  //Se transfieren los datos del boton al json global
  datos_factura.id = id_factura;
  //Se llama el modal de borra
  $("#eliminar").modal("show");
>>>>>>> Stashed changes
};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE PROPIETARIO
// @ts-ignore
window.guardarDatosFacturaDelete = (id_factura) => {
    datos_factura.id = id_factura;
    $("#eliminar").modal("show");
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
getElementById("insert-form").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se cierra el formulario de registro
    $("#agregar").modal("hide");
    //@ts-ignore
    //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"
    let parameters = new FormData(getElementById("insert-form"));
  
    // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERSION DE DATOS
    await saveRow(API_FACTURA, API_CREATE, parameters, fillTableFactura);
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
    parameters.append("id", datos_factura["id"]);
  
    // API REQUEST
    await saveRow(API_FACTURA, API_UPDATE, parameters, fillTableFactura);
});


//EVENTO PARA DELETE
getElementById("delete-form").addEventListener("submit", async (event) => {
<<<<<<< Updated upstream
    event.preventDefault();
    // Se cierra el formulario de registro
    $("#eliminar").modal("hide");
    // CONVIRTIENDO EL JSON A FORMDATA
    let parameters = new FormData();
    //@ts-ignore
    parameters.append("id", datos_factura["id"]);
  
    //API REQUEST
    await deleteRow(API_FACTURA, parameters, fillTableFactura);
});
  
=======
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datos_factura.id);
  // Se llama a la función que realiza la borrar. Se encuentra en el archivo components.js
  await deleteRow(API_FACTURA, parameters, fillTableFactura);
});

//CREACIÓN DEL PDF

window.generarReporteFactura = async (id_factura) => {
  console.log(id_factura)
  let tableContent = ""
  let apiEndpoint = API_REPORTES + "factura"
  let APIEndpointObtenerUsuarioActual = API_USUARIO + 'getUser';

  let parameters = new FormData()
  parameters.append("id_factura", id_factura)
  let obetenerFacturaRespuesta = await APIConnection(apiEndpoint, POST_METHOD, parameters)
  console.log("AAAA")
  console.log(obetenerFacturaRespuesta)
  let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);


  obetenerFacturaRespuesta.dataset.forEach(element => {
    tableContent += `
          <tr>
      <td>${element.codigo_factura}</td>
       <td>${element.descripcion}</td>
      <td>${element.subtotal}</td>
      <td>${element.IVA}</td>
      <td>${element.venta_gravada}</td>
      <td>${element.fecha}</td>
      <td>${element.nombre}</td>
      <td>${element.apellido}</td>
      </tr>
    `
  })

  let generatedHTML = `<!doctype html>
  <html lang="es">
  
  <head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <style>
          body {
              display: flex;
              justify-content: center;
              text-align: center;
  
          }
  
          #tabla-header {
              background-color: #007D84;
              color: aliceblue;
              padding: 10px;
              font-size: 40px;
              padding-bottom: 20px;
              margin-bottom: 10px;
  
          }
  
          #tabla-footer {
              background-color: #007D84;
              color: aliceblue;
              padding: 10px;
              text-align: right;
          }
  
          #tabla-header img {
              max-width: 65px;
          }
  
          /*Tabla de datos*/
          #tabla_datos {
              margin-top: 3%;
              margin-bottom: 3%;
              font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  
          }
  
          /*Colores al encabezado*/
          #tabla_datos th {
              color: white;
              background-color: #018080;
          }
  
          /*Colores al cuerpo*/
          #tabla_datos tr {
              border: solid black 1px;
              background-color: #A1A39F;
          }
  
          #tabla_reporte {
              width: 100%;
              height: 60%;
              margin-top: 20px;
  
          }
  
          #tabla_reporte th,
          td {
              text-align: left;
              padding-left: 5px;
          }
  
          .text-footer {
              font-size: 10px;
              margin-top: 10px;
          }
      </style>
      <title>MUNEG S.A C.V</title>
  
  </head>
  
  <body>
      <!-- Tabla de Datos -->
      <div class="container-fluid" id="tabla_datos" style="width: 100%">
          <div class="container-fluid" id="tabla-header">
              <a>MUNEG</a>
          </div>
          <div class="container-fluid" id="tabla-header">
              <a>FACTURA</a>
          </div>
          <table class="table table-responsive table-bordered" id="tabla_reporte">
              <thead>
                  <tr>
                      <th>Creado por:</th>
                       <td>${ObtenerUsuarioActualResponse.username}</td>
                  </tr>
                  <tr>
                      <th>Fecha:</th>
                      <td>${obtenerFechaActual()}</td>
                  </tr>
                  <tr>
                  <th>Codigo</th>
                    <th>Descripción</th>
                    <th>SubTotal</th>
                    <th>IVA</th>
                    <th>Venta gravada</th>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                  </tr>
              </thead>
              <tbody>
                  ${tableContent}
              </tbody>
          </table>
          <div class="container-fluid" id="tabla-footer">
              <a class="text-footer">MUNEG S.A C.V</a>
          </div>
      </div>
      </main>
  
  </body>
  
  </html>`;
  await generatePDF(generatedHTML, "factura_" + id_factura + ".pdf")

  window.open("../../api/reporte/" + "factura_" + id_factura + ".pdf");

}
>>>>>>> Stashed changes
