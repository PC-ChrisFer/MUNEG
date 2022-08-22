// @ts-ignore
//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow, obtenerFechaActual, generatePDF } from "../components.js";
import {
  INSERT_MODAL,
  POST_METHOD,
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
const API_PROPIETARIO = SERVER + "privada/propietario.php?action=";
const API_REPORTES = SERVER + "privada/pdf.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';

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

let datos_tipo_propietario = {
  id_tipo_propietario: " ",
  nombre_tipo: " "
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
   await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_PROPIETARIO, fillTablePropietario);
  //Cargar combo box de Factura
  await fillComboBoxTipoPropietario();
});


//Obtener los datos de combobox tipo empleado
async function fillComboBoxTipoPropietario() {
  //Se crea un endpoint especifico para el caso de leer tipo empleado
  let APIEndpoint = SERVER + 'privada/propietario.php?action=readTipoPropietario'
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null)
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map(element => {
      getElementById('id_tipo_propietario').innerHTML += `<option value="${element.id_tipo_propietario}" > ${element.nombre_tipo} </option>`
  })
  APIResponse.dataset.map(element => {
      getElementById('id_tipo_propietario_update').innerHTML += `<option value="${element.id_tipo_propietario}" > ${element.nombre_tipo} </option>`
  })
}

//@ts-ignore
window.seleccionarTipoPropietario = () => {
  //@ts-ignore
  datos_tipo_propietario.id_tipo_propietario = document.getElementById('id_tipo_propietario').value
}

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTablePropietario(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
            <tr>  
                <td><img src="../../api/imagenes/propietario/${row.imagen}" width=100></td> 
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
                            <a onclick="guardarDatosPropietarioUpdate('${row.id_propietario}','${row.nombre}', '${row.apellido}', '${row.numero_telefono}', '${row.correo_electronico}', '${row.fecha_nacimiento}', '${row.genero}', '${row.DUI}', '${row.id_tipo_propietario}')" class="btn" id="button_ver_mas" >
                            <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                            <a  onclick="guardarDatosPropietarioDelete(${row.id_propietario})"  class="btn" id="button_ver_mas"  
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
window.guardarDatosPropietarioUpdate = (id_propietario, nombre, apellido, numero_telefono, correo_electronico, fecha_nacimiento, genero, DUI, id_tipo_propietario) => {
  datos_propietario.id = id_propietario;
  $("#actualizar").modal("show");

  // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE ELINPUT TENGA
  //EL ATRIBUTO "value="""
  //@ts-ignore
  getElementById("nombre_update").value = String(nombre);
  getElementById("apellido_update").value = String(apellido);
  getElementById("telefono_update").value = String(numero_telefono);
  getElementById("correo_electronico_update").value = String(correo_electronico);
  getElementById("fecha_nacimiento_update").value = String(fecha_nacimiento);
  getElementById("genero_update").value = String(genero);
  getElementById("DUI_update").value = String(DUI);
  getElementById("id_tipo_propietario_update").value = String(id_tipo_propietario);

};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE PROPIETARIO
// @ts-ignore
window.guardarDatosPropietarioDelete = (id_propietario) => {
  datos_propietario.id = id_propietario;
  $("#eliminar").modal("show");
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
getElementById("insert_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#agregar").modal("hide");
  //@ts-ignore
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"
  let parameters = new FormData(getElementById("insert_form"));

  // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERSION DE DATOS
  await saveRow(API_PROPIETARIO, API_CREATE, parameters, fillTablePropietario);
});


// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#actualizar").modal("hide");
  //@ts-ignore
  let parameters = new FormData(getElementById("update_form"));
  //@ts-ignore
  parameters.append("id", datos_propietario["id"]);

  // API REQUEST
  await saveRow(API_PROPIETARIO, API_UPDATE, parameters, fillTablePropietario);
});

//EVENTO PARA DELETE
getElementById("delete_form").addEventListener("submit", async (event) => {
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  //@ts-ignore
  parameters.append("id", datos_propietario["id"]);

  //API REQUEST
  await deleteRow(API_PROPIETARIO, parameters, fillTablePropietario);
});


window.abrirModalReportes = () => {
  $("#reportes").modal("show");
};

//CREACIÓN DE PDF
window.createPropietarioPDF = async () => {
  let APIEnpointReadPropietario = API_REPORTES + "propietario_tipo_propietario";
  let APIEndpointObtenerUsuarioActual = API_USUARIO + 'getUser';
  let parameters = new FormData()
  parameters.append("id_tipo_propietario", getElementById("id_tipo_propietario").value)

  let readPropietarioResponse = await APIConnection(APIEnpointReadPropietario, POST_METHOD, parameters);
  let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);

  let tableContent = ``;

  readPropietarioResponse.dataset.forEach((element) => {
      tableContent += `
  <tr>
  <td>${element.nombre_tipo}</td>
  <td>${element.nombre} ${element.apellido}</td>
  <td>${element.correo_electronico}</td>
  <td>${element.fecha_nacimiento}</td>
  <tr>
  `;
  });

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
              <a>PROPIETARIOS SEGÚN EL TIPO DE PROPIETARIO</a>
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
                      <th>Tipo de Propietario</th>
                      <th>Nombre del Propietario</th>
                      <th>Correo Electrónico</th>
                      <th>Fecha de Nacimiento</th>
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
  let res = await generatePDF(generatedHTML, "propiedades_valiosas_" + ".pdf")

  window.open("../../api/reporte/" + "propiedades_valiosas_" + ".pdf");
}