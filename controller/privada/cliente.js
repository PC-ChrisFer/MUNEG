//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow } from "../components.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { API_UPDATE, SERVER } from "../constants/api_constant.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_CLIENTE = SERVER + "privada/cliente.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL CLIENTE, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosUpdate/guardarDatosDelete"
let datos_cliente = {
  id_cliente: 0,
  nombre_cliente: "",
  correo: "",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Función Para validar que exista un usuario en sesión
  await validateExistenceOfUser();
  //Endpoint para la lectura de todas las tablas de infromación
  await readRows(API_CLIENTE, fillTableCliente);
  inactivityTime();
});

// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_CLIENTE, "search-bar", fillTableCliente);
});

//Función (ReadAll) llenar las tablas de información
export function fillTableCliente(dataset) {
  //Se define el contenido html
  let content = "";
  //Se llenan los elementos con la información proporcionada por la base de datos
  dataset.map((row) => {
    //El cuerpo del elemento html
    content += ` 
        <tr>
            <td>${row.nombre_cliente}</td>
            <td>${row.correo}</td>
            <td class="d-flex justify-content-center">
                <a onclick="guardarDatosUpdate(${row.id_cliente},'${row.nombre_cliente}','${row.correo}')" class="btn" id="button_ver_mas">
                  <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                <a onclick="guardarDatosDelete(${row.id_cliente})" class="btn" id="button_ver_mas">
                  <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
            </td>
         </tr>
        `;
  });
  //Se escribe el id del contendor que se quiere llenar con el elemento html
  getElementById("tbody-cliente").innerHTML = content;
}

//Función para cargar los datos del update
window.guardarDatosUpdate = (id_cliente, nombre_cliente, correo) => {
  //Se transfieren los datos del boton al json global  
  datos_cliente.id_cliente = id_cliente;
  //Se llama el modal de actualizar
  $("#actualizar").modal("show");
  //Se imprime la información en el modal
  document.getElementById("nombre_cliente_update").value = String(nombre_cliente);
  document.getElementById("correo_update").value = String(correo);
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_cliente) => {
  //Se transfieren los datos del boton al json global
  datos_cliente.id_cliente = id_cliente;
  //Se llama el modal de borrar
  $("#eliminar").modal("show");
};

//EVENTO PARA UPDATE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("update_form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de actualizar
  $("#actualizar").modal("hide");
  // Se toman los datos del modal y los convierte a formData
  let parameters = new FormData(getElementById("update_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id_cliente", datos_cliente["id_cliente"]);
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow(API_CLIENTE, API_UPDATE, parameters, fillTableCliente);
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
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id_cliente", datos_cliente["id_cliente"]);
  // Se llama a la función que realiza la borrar. Se encuentra en el archivo components.js
  await deleteRow(API_CLIENTE, parameters, fillTableCliente);
});

//Tiempo de inactividad
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