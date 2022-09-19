//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow } from "../components.js";
import { SERVER } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { API_CREATE, API_UPDATE, GET_METHOD } from "../constants/api_constant.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_PROPIETARIO = SERVER + "privada/propietario.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE
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
  //Cargar combo box de tipo propietario
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

//Función para guardar los datos cambiados en el combobox
window.seleccionarTipoPropietario = () => {
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
                            <a onclick="guardarDatosUpdate('${row.id_propietario}','${row.nombre}', '${row.apellido}', '${row.numero_telefono}', '${row.correo_electronico}', '${row.fecha_nacimiento}', '${row.genero}', '${row.DUI}', '${row.id_tipo_propietario}')" class="btn" id="button_ver_mas" >
                            <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                            <a  onclick="guardarDatosDelete(${row.id_propietario})"  class="btn" id="button_ver_mas"  
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

// FUNCION PARA GUARDAR LOS DATOS DEL propietario
window.guardarDatosUpdate = (id_propietario, nombre, apellido, numero_telefono, correo_electronico, fecha_nacimiento, genero, DUI, id_tipo_propietario) => {
  //Se transfieren los datos del boton al json global  
  datos_propietario.id = id_propietario;
  //Se llama el modal de actualizar
  $("#actualizar").modal("show");
  //Se imprime la información en el modal
  getElementById("nombre_update").value = String(nombre);
  getElementById("apellido_update").value = String(apellido);
  getElementById("telefono_update").value = String(numero_telefono);
  getElementById("correo_electronico_update").value = String(correo_electronico);
  getElementById("fecha_nacimiento_update").value = String(fecha_nacimiento);
  getElementById("genero_update").value = String(genero);
  getElementById("DUI_update").value = String(DUI);
  getElementById("id_tipo_propietario_update").value = String(id_tipo_propietario);
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_propietario) => {
  //Se transfieren los datos del boton al json global  
  datos_propietario.id = id_propietario;
  //Se llama el modal de borrar
  $("#eliminar").modal("show");
};

// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busquedagetElementById("search-bar")
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
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert_form'"
  let parameters = new FormData(getElementById("insert_form"));
  // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERCION DE DATOS
  await saveRow(API_PROPIETARIO, API_CREATE, parameters, fillTablePropietario);
});


// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#actualizar").modal("hide");
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'update_form'"
  let parameters = new FormData(getElementById("update_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datos_propietario["id"]);
  // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA ACTUALIZACION DE DATOS
  await saveRow(API_PROPIETARIO, API_UPDATE, parameters, fillTablePropietario);
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al delete
  parameters.append("id", datos_propietario["id"]);
  // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA ELIMINACIÓN DE DATOS
  await deleteRow(API_PROPIETARIO, parameters, fillTablePropietario);
});
