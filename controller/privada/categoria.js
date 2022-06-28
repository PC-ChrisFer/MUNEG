//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow } from "../components.js";
import {
  SERVER,
} from "../constants/api_constant.js";
import {
  getElementById,
  validateExistenceOfUser,
} from "../constants/functions.js";
import { API_CREATE, API_UPDATE } from "../constants/api_constant.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_CATEGORIA = SERVER + "privada/categoria.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_categoria = {
  id: 0,
  nombre_categoria: " ",
  visibilidad: " ",
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Valida que el usuario este logeado
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_CATEGORIA, fillTableCategoria);
});

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableCategoria(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
            <tr>
                <td>${row.id_categoria}</td>  
                <td>${row.nombre_categoria}</td>
                <td>${row.visibilidad}</td> 
                
                <td class="d-flex justify-content-center">
                    <div class="btn-group" role="group">
                        <form method="post" id="read-one">
                            <a onclick="guardarDatosCategoriaUpdate(${row.id_categoria},'${row.nombre_categoria}')" class="btn btn-primary">
                                <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                            <a  onclick="guardarDatosCategoriaDelete(${row.id_categoria})" class="btn btn-primary"  
                            name="search">
                                <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                        </form>
                    </div>
                </td>
            </tr>
        `;
  });
  // Se muestran cada filas de los registros
  getElementById("tbody-Categoria").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL CATEGORIA
// @ts-ignore
window.guardarDatosCategoriaUpdate = (id_categoria, nombre_categoria) => {
  datos_categoria.id = id_categoria;
  //@ts-ignore
  console.log("UPDATE EJECUTANDOSE");
  $("#actualizar").modal("show");
  
  // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE ELINPUT TENGA
  //@ts-ignore
  getElementById("nombre_categoria_update").value = String(nombre_categoria);
};

// FUNCION PARA GUARDAR LOS DATOS DEL CATEGORIA
// @ts-ignore
window.guardarDatosCategoriaDelete = (id_categoria) => {
  datos_categoria.id = id_categoria;
  $("#eliminar").modal("show");
};  

// Método que se ejecuta al enviar un formulario de busqueda
getElementById("busqueda").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  await searchRows(API_CATEGORIA, "busqueda", fillTableCategoria);
});

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert-form").addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se cierra el formulario de registro
  $("#agregar").modal("hide");
  //@ts-ignore
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-form'"
  let parameters = new FormData(getElementById("insert-form"));
  //@ts-ignore
  parameters.append("visibilidad", getElementById("visibilidad").checked == true ? '1' : '0');


  // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERSION DE DATOS
  await saveRow(API_CATEGORIA, API_CREATE, parameters, fillTableCategoria);
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
  parameters.append("id", datos_categoria["id"]);

  // API REQUEST
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
