//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { readRows, readDeletedRowns, obtenerFechaActual, generatePDF } from "../../components.js";
import { SERVER, GET_METHOD, POST_METHOD } from "../../constants/api_constant.js";
import { getElementById, showModal } from "../../constants/helpers.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_TIPO_PROPIEDAD = SERVER + "privada/tipo_propiedad.php?action=";
const API_REPORTES = SERVER + "privada/pdf.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";


export let datos_tipoPropiedad = {
    id_tipo_propiedad: "",
    id_tipo_acabado: 0,
    nombre_tipo_propiedad: "",
    visibilidad: true,
    id_categoria: "",
};

let isWatchinDeletedData = false;

//Función para cambiar la visibilidad con un checkbox
window.selectIdCategoria = (idCategoriaCmb) => {
    datos_tipoPropiedad.id_categoria = getElementById(idCategoriaCmb).value;
};

// FUNCION PARA GUARDAR LOS DATOS TIPO PROPIEDAD
window.guardarDatosUpdate = async (
    id_tipoPropiedad,
    visibilidad,
    nombre_tipo_propiedad,
    id_categoria
) => {
    //Se transfieren los datos del boton al json global
    datos_tipoPropiedad.id_tipo_propiedad = id_tipoPropiedad;
    datos_tipoPropiedad.visibilidad = visibilidad;
    datos_tipoPropiedad.id_categoria = id_categoria;
    //Se imprime la información en el modal
    getElementById("tipo_propiedad_update").value = String(nombre_tipo_propiedad);
    getElementById("listado_categorias_id_u").value = String(id_categoria);
    getElementById("eliminarElemento").checked = false;

    //Se llama el modal de actualizar
    showModal("#actualizar")
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_tipoPropiedad) => {
    //Se transfieren los datos del boton al json global
    datos_tipoPropiedad.id_tipo_propiedad = id_tipoPropiedad;
    //Se llama el modal de eliminar
    $("#eliminar").modal("show");
};

window.leerDatosEliminados = async () => {
    if (getElementById("verDatosliminados").checked === true) {
        await readDeletedRowns(API_GESTION_TIPO_PROPIEDAD, fillTableTipoPropiedad);
        isWatchinDeletedData = true;
    } else {
        await readRows(API_GESTION_TIPO_PROPIEDAD, fillTableTipoPropiedad);
        isWatchinDeletedData = false;
    }
    getElementById("verDatosliminados").checked === true
        ? (getElementById("textoSwitch").innerHTML = "Hacer visible")
        : (getElementById("textoSwitch").innerHTML = "Hacer invisible");
};

window.cambiarVisibilidadDeResgistro = () => {
    if (isWatchinDeletedData) {
        getElementById("eliminarElemento").checked === true
            ? (datos_tipoPropiedad.visibilidad = true)
            : (datos_tipoPropiedad.visibilidad = false);
    } else {
        getElementById("eliminarElemento").checked === true
            ? (datos_tipoPropiedad.visibilidad = false)
            : (datos_tipoPropiedad.visibilidad = true);
    }
};

//Generar Reportes
// FUNCION PARA GUARDAR LOS DATOS TIPO PROPIEDAD
window.generarReporteTipoPropiedad = async (idTipoPropiedad) => {
    let tableContent = "";
    let APIEndpointObtenerUsuarioActual = API_USUARIO + "getUser";
    let ApiEndpoint = API_REPORTES + "propiedad_tipo_propiedad";

    let parameters = new FormData();
    let ObtenerUsuarioActualResponse = await APIConnection(
        APIEndpointObtenerUsuarioActual,
        GET_METHOD,
        null
    );
    parameters.append("id_tipo_propiedad", idTipoPropiedad);
    let obtenerTipoPropiedadReporte = await APIConnection(
        ApiEndpoint,
        POST_METHOD,
        parameters
    );
    //Iterando sobre elementos de array
    obtenerTipoPropiedadReporte.dataset.forEach((element) => {
        tableContent += `
       <tr>
        <td>${element.apellido}</td>
         <td>${element.codigo}</td>
               <td>${element.departamento}</td>
         <td>${element.direccion}</td>
             <td>${element.municipio}</td>
         <td>${element.nombre}</td>
               <td>${element.nombre_tipo}</td>
         <td>${element.precio}</td>
        </tr>
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
                <a>PROPIEDADES  CON LOS PRECIOS MÁS BAJOS</a>
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
                      <th>Material</th>
                      <th>Departamento</th>
                      <th>Municipio</th>
                      <th>Direccion</th>
                      <th>Apellido</th>
                      <th>Nombre</th>
                      <th>Precio</th>
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
    await generatePDF(
        generatedHTML,
        idTipoPropiedad + "_TipoPropiedad" + ".pdf"
    );
    window.open(
        "../../api/reporte/" + idTipoPropiedad + "_TipoPropiedad" + ".pdf"
    );

};

export function resetIsWatchingDeletedDataValue() {
    isWatchinDeletedData = false
}