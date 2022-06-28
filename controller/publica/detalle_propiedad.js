//@ts-check

//Importar las constantes y metodos de components.js y api_constant.js
// @ts-ignore
import { readRows, saveRow, searchRows, deleteRow } from "../components.js";
import { SERVER, GET_METHOD } from "../constants/api_constant.js";
import { getElementById, getFormData } from "../constants/functions.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_PROPIEDAD = SERVER + "publica/detalle_propiedad.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_propiedad = {
  id_propiedad: 0
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  // Se busca en la URL las variables (parámetros) disponibles.
  let params = new URLSearchParams(location.search);
  // Se obtienen los datos localizados por medio de las variables.
  const ID = params.get("id");
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await guardarPropiedad(ID);
});

// FUNCION PARA ABRIR CATEGORIAS
// @ts-ignore
async function guardarPropiedad(id_propiedad) {
  //Captura el id
  datos_propiedad.id_propiedad = id_propiedad;
  if (id_propiedad) {
    let APIEndpoint = API_PROPIEDAD;
    //Se envian el parametro del id para realizar la busqueda
    let parameters = getFormData(datos_propiedad);

    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    await searchRows(APIEndpoint, null, fillDetallePropiedad, parameters);
  }
}

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillDetallePropiedad(dataset) {
  let content = "";
  let desc_content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += ` 
        <div class="card1 mb-6" id="card_detalle">
            <div class="row" id="contenero_cartas12">
                <div class="col-md-5" id="separado123">
                    <img src="../../api/imagenes/empleado/${row.imagen}"
                        class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-5 " id="completo12">
                    <div class="card-body" id="precio11">
                        <h5 class="card-title">${row.direccion} - ${row.habitaciones} Habitaciones -3 ${row.sanitario} Baños
                        </h5>
                        <div class="gallery">
                            <div class="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
                                <div class="col">
                                    <img src="../../api/imagenes/empleado/${row.imagen}"
                                        class="gallery-item" alt="gallery">
                                </div>
                                <div class="col">
                                    <img src="../../api/imagenes/empleado/${row.imagen}"
                                        class="gallery-item" alt="gallery">
                                </div>
                                <div class="col">
                                    <img src="../../api/imagenes/empleado/${row.imagen}"
                                        class="gallery-item" alt="gallery">
                                </div>
                                <div class="col">
                                    <img src="../../api/imagenes/empleado/${row.imagen}"
                                        class="gallery-item" alt="gallery">
                                </div>
                            </div>
                        </div>
                        <h5 class="card-title">PRECIO: ${row.precio} USD$</h5>
                        <h5 class="card-title">ALQUILER: ${row.alquiler} USD$</h5>
                        <div class="gallery">
                        </div>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="gallery-modal" tabindex="-1"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <!-- <h5 class="modal-title">Modal title</h5> -->
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close">
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <img src="../../api/imagenes/empleado/${row.imagen}"
                                        class="modal-img" alt="modal img">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    desc_content += `                
        <div class="col">
            <div class="card_descripcion">
                <div class="card-body">
                    <h5 class="card-title">Detalles:</h5>
                    <p class="card-text">Codigo de Inmueble: ${row.codigo} </p>
                    <p class="card-text">Tipo de acabado: ${row.nombre_tipo} </p>
                    <p class="card-text">Area de contrucción: ${row.area_contruccion} vr2</p>
                    <p class="card-text">Area de Propiedad: ${row.area_propiedad} vr2</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card_descripcion">
                <div class="card-body">
                    <h5 class="card-title">Detalles:</h5>
                    <p class="card-text">N° de Plantas: ${row.plantas} </p>
                    <p class="card-text">N° de Parqueos: ${row.espacio_parqueo} </p>
                    <p class="card-text">N° de Habitaciones: ${row.habitaciones} </p>
                    <p class="card-text">N° de Sanitarios: ${row.sanitario} </p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card_descripcion">
                <div class="card-body">
                    <h5 class="card-title">Detalles:</h5>
                    <p class="card-text">Tipo de acabado: ${row.descripcion} </p>
                </div>
            </div>
        </div>`;
  });
  // Se muestran cada filas de los registros
  //@ts-ignore
  getElementById("row_detalle_inmueble").innerHTML = content;
  //@ts-ignore
  getElementById("separadoF").innerHTML = desc_content;
}
