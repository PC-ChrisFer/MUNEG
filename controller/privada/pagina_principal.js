//Importar las constantes y metodos de components.js y api_constant.js
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { generatePDF, obtenerFechaActual } from "../components.js";
import { APIConnection } from "../APIConnection.js";
import { SERVER, GET_METHOD, API_SUCESS_REQUEST, POST_METHOD } from "../constants/api_constant.js";

// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_USUARIOS = SERVER + 'privada/usuario.php?action=';
const API_REPORTES = SERVER + "privada/pdf.php?action=";
const API_USUARIO = SERVER + 'privada/usuario.php?action=';
const API_PROPIEDAD = SERVER + "privada/propiedad.php?action=";

let datosPropiedad = {
    id_propiedad: "",
    direccion_propiedad: "",
    area_propiedad: "",
    area_construccion_propiedad: "",
    codigo: "",
    precio: 0,
    alquiler: "",
    habitaciones: 0,
    plantas: 0,
    sanitario: 0,
    espacioParqueo: 0,
    descripcion: "",
    tipo_acabadoID: "",
    municipioID: 0,
    tipoPropiedadID: 0,
    inquilinoID: 0,
    empleadoID: 0,
    visibilidad: true
};


// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    //Función Para validar que exista un usuario en sesión
    await validateExistenceOfUser();
});


//CREANDO FUNCTION LOGOUT
//@ts-ignore
window.logOut = async () => {
    let APIEndpoint = API_USUARIOS + 'logOut'
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null)

    if (APIResponse.status == API_SUCESS_REQUEST) {
        location.href = "index.html";
        return
    }
    console.log("SOMETING WENT WRONG")
}


//CREACIÓN DE PDF
window.createPropiedadesBajosPDF = async () => {
    let APIEnpointReadPropiedad = API_REPORTES + "propiedades_accesibles";
    let APIEndpointObtenerUsuarioActual = API_USUARIO + 'getUser';

    let readPropiedadResponse = await APIConnection(APIEnpointReadPropiedad, POST_METHOD);
    let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);

    let tableContent = ``;

    readPropiedadResponse.dataset.forEach((element) => {
        tableContent += `
    <tr>
    <td>$${element.precio}</td>
    <td>${element.direccion}</td>
    <td>${element.codigo}</td>
    <td>${element.municipio}, ${element.departamento}</td>
    <td>${element.nombre} ${element.apellido}</td>


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
                        <th>Precio</th>
                        <th>Dirección</th>
                        <th>Código de propiedad</th>
                        <th>Municipio/Departamento</th>
                        <th>Nombre del Inquilino</th>

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
    let res = await generatePDF(generatedHTML, "propiedades_accesibles" + ".pdf")

    window.open("../../api/reporte/" + "propiedades_accesibles" + ".pdf");
}

//CREACIÓN DE PDF
window.createPropiedadesAltosPDF = async () => {
    let APIEnpointReadPropiedad = API_REPORTES + "propiedades_valiosas";
    let APIEndpointObtenerUsuarioActual = API_USUARIO + 'getUser';

    let readPropiedadResponse = await APIConnection(APIEnpointReadPropiedad, POST_METHOD);
    let ObtenerUsuarioActualResponse = await APIConnection(APIEndpointObtenerUsuarioActual, GET_METHOD, null);

    let tableContent = ``;

    readPropiedadResponse.dataset.forEach((element) => {
        tableContent += `
    <tr>
    <td>$${element.precio}</td>
    <td>${element.direccion}</td>
    <td>${element.codigo}</td>
    <td>${element.municipio}, ${element.departamento}</td>
    <td>${element.nombre} ${element.apellido}</td>


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
                <a>PROPIEDADES  CON LOS PRECIOS MÁS ALTOS</a>
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
                        <th>Precio</th>
                        <th>Dirección</th>
                        <th>Código de propiedad</th>
                        <th>Municipio/Departamento</th>
                        <th>Nombre del Inquilino</th>

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
