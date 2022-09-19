//Importar las constantes y metodos de components.js y api_constant.js
import { deleteRow, readRows, saveRow, readDeletedRowns } from "../components.js";
import { SERVER, API_UPDATE, API_SUCESS_REQUEST, GET_METHOD } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_URUSARIO = SERVER + "privada/usuario.php?action=";
const API_TIPO_USUARIO = SERVER + "privada/tipo_usuario.php?action=";
const API_EMPLEADO = SERVER + "privada/empleado.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATElet 
let datosUsuario = {
  id_usuario: "",
  nombre_usuario: "",
  password: "",
  tipo_usuario: "",
  propiedatio_id: "",
  empleado_id: ""
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado  
  await validateExistenceOfUser();
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_GESTION_URUSARIO, fillTableUsarios);
  //Cargar combo box de empleado
  await fillEmpleadoCMB();
  //Cargar combo box de tipo de usuario
  await fillTipoUsuarioCombobox();

  getElementById('textoSwitch').innerHTML = "Hacer invisible"
inactivityTime();
});

//Obtener los datos de combobox tipo usuario
async function fillTipoUsuarioCombobox() {
  //Se crea un endpoint especifico para el caso de leer tipo de usuario
  let APIEndpoint = API_TIPO_USUARIO + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {    
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById("cmbtipo_usuario_update").innerHTML += `<option value="${element.id_tipo_usuario}" > ${element.nombre_tipo} </option>`;
    });
    return;
  }
}

//Obtener los datos de combobox empleado
async function fillEmpleadoCMB() {
  //Se crea un endpoint especifico para el caso de leer empleado
  let APIEndpoint = API_EMPLEADO + "readAll";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map((element) => {
      getElementById("cmb_empleado_update").innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`;
    });
    return;
  }
}

window.leerDatosEliminados = async () => {
  getElementById("verDatosliminados").checked === true
    ? await readDeletedRowns(API_GESTION_URUSARIO, fillTableUsarios)
    : await readRows(API_GESTION_URUSARIO, fillTableUsarios);
    getElementById("verDatosliminados").checked === true ?  getElementById('textoSwitch').innerHTML = "Hacer visible" : getElementById('textoSwitch').innerHTML = "Hacer invisible"
};

window.cambiarVisibilidadDeResgistro = () => {
  getElementById("eliminarElemento").checked === true
    ? (datos_reporte.visibilidad = false)
    : (datos_reporte.visibilidad = true);
};


//Metodo para llenar las tablas de datos, utiliza la función readRows()
function fillTableUsarios(dataset) {
  let content = "";
  console.log(dataset)
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
          <tr>
              <td>${row.nombre_usuario}</td>
              <td>${row.nombre_tipo}</td>
              <td>${row.apellido}, ${row.nombre}</td>
              <td class="d-flex justify-content-center">
               <a onclick="guardarDatosUpdate(${row.id_usuario}, '${row.nombre_usuario}','${row.id_empleado}')" class="btn" id="button_ver_mas">
                 <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
               <a onclick="guardarDatosDelete(${row.id_usuario})" class="btn" id="button_ver_mas">
                 <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
              </td>
          </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  getElementById("tbody-usuario").innerHTML = content;
}

//Función para cambiar la visibilidad con un checkbox
window.selectTipoUsuario = (id_tipo_usuario) => {
  datosUsuario.tipo_usuario = getElementById(id_tipo_usuario).value;
};

//Función para cambiar la visibilidad con un checkbox
window.selectEmpleado = (id_empleado) => {
  datosUsuario.empleado_id = getElementById(id_empleado).value;
};

// FUNCION PARA GUARDAR LOS DATOS USUARIO
window.guardarDatosUpdate = (id_usuario, nombre_usuario,id_empleado) => {
  //Se transfieren los datos del boton al json global  
  datosUsuario.id_usuario = id_usuario;
  //Se imprime la información en el modal
  getElementById("nombre_usuario").value = String(nombre_usuario);  
  getElementById("nombre_usuario").value = String(nombre_usuario);
  getElementById("cmb_empleado_update").value = String(id_empleado);
  //Se llama el modal de actualizar
  $("#actualizar").modal("show");
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_usuario) => {
  //Se transfieren los datos del boton al json global  
  datosUsuario.id_usuario = id_usuario;
  //Se llama el modal de eliminar
  $("#eliminar").modal("show");
};

// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_GESTION_TIPO_PROPIEDAD, "search-bar", fillTableTipoInquilino);
});  

// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "update_form'"  
  let parameters = new FormData(getElementById("update_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datosUsuario.id_usuario);
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow(API_GESTION_URUSARIO, API_UPDATE, parameters, fillTableUsarios);
  // Se cierra el formulario de registro
  $("#actualizar").modal("hide");
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // CONVIRTIENDO EL JSON A FORMDATA  
  let parameters = new FormData();
  // Se adhieren datos al arreglo que se envia al delete
  parameters.append("id", datosUsuario.id_usuario);
  // Se llama a la función que realiza la borrar. Se encuentra en el archivo components.js
  await deleteRow(API_GESTION_URUSARIO, parameters, fillTableUsarios);
  // Se cierra el formulario de registro
  $("#borrar").modal("hide");
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