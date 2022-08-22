//@ts-ignore

//Importar las constantes y metodos de components.js y api_constant.js
import {
  readRows,
  saveRow,
  searchRows,
  deleteRow,
  readDeletedRowns,
} from "../components.js";
import { SERVER } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { API_CREATE, API_UPDATE } from "../constants/api_constant.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_CATEGORIA = SERVER + "privada/categoria.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_categoria = {
  id: 0,
  nombre_categoria: " ",
  visibilidad: true,
};

document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_CATEGORIA, fillTableCategoria);
});

function fillTableCategoria(dataset) {
  let content = "";
  dataset.map((row) => {
    content += ` 
            <tr>
                <td>${row.id_categoria}</td>  
                <td>${row.nombre_categoria}</td>
                <td>${row.visibilidad}</td> 
                
                <td class="d-flex justify-content-center">
                    <div class="btn-group" role="group">
                        <form method="post" id="read-one">
                            <a onclick="guardarDatosCategoriaUpdate(${row.id_categoria},'${row.nombre_categoria}')" class="btn" id="button_ver_mas">
                                <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                            <a  onclick="guardarDatosCategoriaDelete(${row.id_categoria})"  class="btn" id="button_ver_mas"
                            name="search">
                                <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                        </form>
                    </div>
                </td>
            </tr>
        `;
  });
  getElementById("tbody-Categoria").innerHTML = content ?? "";
}

// @ts-ignore
window.guardarDatosCategoriaUpdate = (id_categoria, nombre_categoria) => {
  datos_categoria.id = id_categoria;
  document.getElementById("checkBocVisibilidad").checked = false;

  //@ts-ignore
  $("#actualizar").modal("show");
  getElementById("nombre_categoria_update").value = String(nombre_categoria);
};

// @ts-ignore
window.guardarDatosCategoriaDelete = (id_categoria) => {
  datos_categoria.id = id_categoria;
  $("#eliminar").modal("show");
};

window.cambiarVisibilidadDeResgistro = () => {
  getElementById("verDatosliminados").checked === true ?  datos_categoria.visibilidad = true :  datos_categoria.visibilidad = false 

};

// @ts-ignore
window.leerDatosEliminados = async () => {
  getElementById("verDatosliminados").checked === true
    ? await readDeletedRowns(API_CATEGORIA, fillTableCategoria)
    : await readRows(API_CATEGORIA, fillTableCategoria);
};


// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_CATEGORIA, "search-bar", fillTableCategoria);
});
// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert-form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  //@ts-ignore
  let parameters = new FormData(getElementById("insert-form"));
  await saveRow(API_CATEGORIA, API_CREATE, parameters, fillTableCategoria);
  $("#agregar").modal("hide");

});

getElementById("update-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  //@ts-ignore
  let parameters = new FormData(getElementById("update-form"));
  //@ts-ignore
  parameters.append("id", datos_categoria.id);
  parameters.append("visibilidad_update", datos_categoria.visibilidad ? "1" : "0");

  document.getElementById("verDatosliminados").checked = false;


  $("#actualizar").modal("hide");
  await saveRow(API_CATEGORIA, API_UPDATE, parameters, fillTableCategoria);
});

//EVENTO PARA DELETE
getElementById("delete-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#eliminar").modal("hide");
  // CONVIRTIENDO EL JSON A FORMDATA
  let parameters = new FormData();
  //@ts-ignore
  parameters.append("id", datos_categoria["id"]);

  //API REQUEST
  await deleteRow(API_CATEGORIA, parameters, fillTableCategoria);
});
