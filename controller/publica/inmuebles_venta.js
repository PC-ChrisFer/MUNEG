//@ts-check
//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, searchRows } from "../components.js";
import { SERVER } from "../constants/api_constant.js";
import { getElementById, getFormData } from "../constants/functions.js";
//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_PROPIEDAD = SERVER + "publica/propiedad.php?action=";

let datos_propiedad = {
  id_departamento: 0,
  id_municipio: 0,
  id_categoria: 0,
  id_tipo_propiedad: 0
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  // Se busca en la URL las variables (parámetros) disponibles.
  let params = new URLSearchParams(location.search);
  // Se obtienen los datos localizados por medio de las variables.
  const ID_DEPARTAMENTO = params.get("id_departamento");
  const ID_MUNICIPIO = params.get("id_municipio");
  const ID_CATEGORIA = params.get("id_categoria");
  const ID_TIPO_PROPIEDAD = params.get("id_tipo_propiedad");
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  await guardarParametro(ID_DEPARTAMENTO, ID_MUNICIPIO, ID_CATEGORIA, ID_TIPO_PROPIEDAD);
});

// FUNCION PARA ABRIR CATEGORIAS
// @ts-ignore
async function guardarParametro(id_departamento, id_municipio, id_categoria, id_tipo_propiedad) {
  //Captura el id
  datos_propiedad.id_departamento = id_departamento;
  datos_propiedad.id_municipio = id_municipio;
  datos_propiedad.id_categoria = id_categoria;
  datos_propiedad.id_tipo_propiedad = id_tipo_propiedad;

  if(id_categoria){
    //Crea el endpoint
    console.log(datos_propiedad);
    let APIEndpoint = API_PROPIEDAD;
    //Se envian el parametro del id para realizar la busqueda
    let parameters = getFormData(datos_propiedad);
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    var object = {};
parameters.forEach(function(value, key){
    object[key] = value;
});
var json = JSON.stringify(object);
console.log(json);
    await searchRows(APIEndpoint, null, fillPropiedad, parameters);    
  } else{
    abrirSinParametros();
  }
}

// FUNCION PARA DESCUENTOS
// @ts-ignore
async function abrirSinParametros() {
  await readRows(API_PROPIEDAD, fillPropiedad);
}; 



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
              <h5 class="card-title">${row.municipio}</h5>
              <p>${row.habitaciones} Habitaciones</p>
              <p>${row.sanitario} Baños</p>
              <h5 class="card-title">PRECIO:${row.precio}$</h5>
            </div>
            <div id="color">
            <a href="detalle_inmueble.html?id=${row.id_propiedad}">VER DETALLES</a>
            </div>
          </div>
        </div>
            `;
  });
  // Se muestran cada filas de los registros
  //@ts-ignore
  getElementById("cards_propiedades").innerHTML = content;
}
