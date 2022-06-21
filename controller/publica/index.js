//@ts-check
//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, searchRows } from "../components.js";
import { SERVER } from "../constants/api_constant.js";
import {
  getElementById,
  getFormData,
  validateExistenceOfUserPublic,
} from "../constants/functions.js";
//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_PROPIEDAD = SERVER + "publica/propiedad.php?action=";

let datos_propiedad = {
  id: 0,
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  validateExistenceOfUserPublic(null);
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await readRows(API_PROPIEDAD, fillPropiedad);
});


//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillPropiedad(dataset) {
    let content = "";
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map((row) => {
      // Se crean y concatenan las filas de la tabla con los datos de cada registro.
      content += ` 
      <div class="col-md-3">
          <div class="card6 text-center">
          <img src="../../api/imagenes/propiedad/${row.imagen}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${row.id_municipio}</h5>
              <p>${row.habitaciones}</p>
              <p>${row.sanitario}</p>
              <h5 class="card-title">PRECIO:${row.precio}</h5>
            </div>
            <div id="color">
            <a href="detalle_producto.html?id=${row.id_propiedad}">VER DETALLES</a>
            </div>
          </div>
        </div>
            `;
    });
    // Se muestran cada filas de los registros
    getElementById("cuerpopropiedades").innerHTML = content;
  }