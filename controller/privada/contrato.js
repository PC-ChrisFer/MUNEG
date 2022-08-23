//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow } from "../components.js";
import { SERVER } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { API_CREATE, API_UPDATE, GET_METHOD } from "../constants/api_constant.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_CONTRATO = SERVER + "privada/contrato.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_contrato = {
    id: 0,
    descripcion: " ",
    fecha_firma: " ",
    imagen: " ",
    id_propietario: " ",
    id_propiedad: " ",
    id_empleado: " ",
    id_inquilino: " "
};

let datos_propietario = {
    id_propietario: 0,
    nombre: " "
};

let datos_propiedad = {
    id_propiedad: 0,
    codigo: " "
};

let datos_empleado = {
    id_empleado: 0,
    nombre: " "
};

let datos_inquilino = {
    id_inquilino: 0,
    nombre: " "
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
    //Valida que el usuario este logeado
     await validateExistenceOfUser();  
    //Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    await readRows(API_CONTRATO, fillTableContrato);
    //Se llama las funciones de combobox de propietario
    await fillComboBoxPropietario();
    //Se llama las funciones de combobox de propiedad
    await fillComboBoxPropiedad();
    //Se llama las funciones de combobox de empleado
    await fillComboBoxEmpleado();
    //Se llama las funciones de combobox de inquilino
    await fillComboBoxInquilino();
});

//Obtener los datos de combobox tipo propietario
async function fillComboBoxPropietario() {
    //Se crea un endpoint especifico para el caso de leer propietario
    let APIEndpoint = SERVER + 'privada/contrato.php?action=readPropietario'
    //Se utiliza como api connection para realizar la consulta
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null)
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map(element => {
        //Cargar los datos obtenidos de la consulta
        getElementById('id_propietario').innerHTML += `<option value="${element.id_propietario}" > ${element.nombre} </option>`
    })
    APIResponse.dataset.map(element => {
        //Cargar los datos obtenidos de la consulta
        getElementById('id_propietario_update').innerHTML += `<option value="${element.id_propietario}" > ${element.nombre} </option>`
    })
}

//Función para guardar los datos cambiados en el combobox
window.seleccionarPropietario = () => {
    datos_propietario.id_propietario = document.getElementById('id_propietario').value
}

//Obtener los datos de combobox tipo empleado
async function fillComboBoxPropiedad() {
    //Se crea un endpoint especifico para el caso de leer propietario
    let APIEndpoint = SERVER + 'privada/contrato.php?action=readPropiedad'
    //Se utiliza como api connection para realizar la consulta
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null)
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map(element => {
        //Cargar los datos obtenidos de la consulta        
        getElementById('id_propiedad').innerHTML += `<option value="${element.id_propiedad}" > ${element.codigo} </option>`
    })
    APIResponse.dataset.map(element => {
        //Cargar los datos obtenidos de la consulta
        getElementById('id_propiedad_update').innerHTML += `<option value="${element.id_propiedad}" > ${element.codigo} </option>`
    })
}

//Función para guardar los datos cambiados en el combobox
window.seleccionarPropiedad = () => {
    datos_propiedad.id_propiedad = document.getElementById('id_propiedad').value
}

//Obtener los datos de combobox tipo empleado
async function fillComboBoxEmpleado() {
    //Se crea un endpoint especifico para el caso de leer propietario
    let APIEndpoint = SERVER + 'privada/contrato.php?action=readEmpleado'
    //Se utiliza como api connection para realizar la consulta
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null)
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map(element => {
        //Cargar los datos obtenidos de la consulta        
        getElementById('id_empleado').innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`
    })
    APIResponse.dataset.map(element => {
        //Cargar los datos obtenidos de la consulta        
        getElementById('id_empleado_update').innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`
    })
}

//Función para guardar los datos cambiados en el combobox
window.seleccionarEmpleado = () => {
    datos_empleado.id_empleado = document.getElementById('id_empleado').value
}

//Obtener los datos de combobox tipo empleado
async function fillComboBoxInquilino() {
    //Se crea un endpoint especifico para el caso de leer propietario
    let APIEndpoint = SERVER + 'privada/contrato.php?action=readInquilino'
    //Se utiliza como api connection para realizar la consulta
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null)
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map(element => {
        //Cargar los datos obtenidos de la consulta                
        getElementById('id_inquilino').innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`
    })
    APIResponse.dataset.map(element => {
        //Cargar los datos obtenidos de la consulta        
        getElementById('id_inquilino_update').innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`
    })
}

//Función para guardar los datos cambiados en el combobox
window.seleccionarInquilino = () => {
    datos_inquilino.id_inquilino = document.getElementById('id_inquilino').value
}

//Función (ReadAll) llenar las tablas de información
export function fillTableContrato(dataset) {
    //Se define el contenido html
    let content = "";
    //Se llenan los elementos con la información proporcionada por la base de datos
    dataset.map((row) => {
        //El cuerpo del elemento html
        content += ` 
            <tr>  
                <td><img src="../../api/imagenes/contrato/${row.imagen}" width=100></td> 
                <td>${row.descripcion}</td>
                <td>${row.fecha_firma}</td> 
                <td class="d-flex justify-content-center">
                    <div class="btn-group" role="group">
                        <form method="post" id="read-one">
                            <a onclick="guardaDatosUpdate('${row.id_contrato}', '${row.descripcion}', '${row.fecha_firma}', '${row.id_propietario}', '${row.id_propiedad}', '${row.id_empleado}', '${row.id_inquilino}')" class="btn"  id="button_ver_mas">
                            <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                            <a  onclick="guardaDatosDelete('${row.id_contrato}')" class="btn"  id="button_ver_mas"
                            name="search">
                            <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                        </form>
                    </div>
                </td>
            </tr>
        `;
    });
    //Se escribe el id del contendor que se quiere llenar con el elemento html
    getElementById("tbody-Contrato").innerHTML = content;
}

//Función para cargar los datos del update
window.guardaDatosUpdate = (id_contrato, descripcion, fecha_firma, id_propietario, id_propiedad, id_empleado, id_inquilino) => {
    //Se transfieren los datos del boton al json global  
    datos_contrato.id = id_contrato;
    //Se llama el modal de actualizar
    $("#actualizar").modal("show");
    //Se imprime la información en el modal
    getElementById("descripcion_update").value = String(descripcion);
    getElementById("fecha_firma_update").value = String(fecha_firma);
    getElementById("id_propietario_update").value = String(id_propietario);
    getElementById("id_propiedad_update").value = String(id_propiedad);
    getElementById("id_empleado_update").value = String(id_empleado);
    getElementById("id_inquilino_update").value = String(id_inquilino);
};

//Función para cargar el id para el delete
window.guardaDatosDelete = (id_contrato) => {
    //Se transfieren los datos del boton al json global
    datos_contrato.id = id_contrato;
    //Se llama el modal de borrar
    $("#eliminar").modal("show");
};

// EVENTO PARA READ
// Método que se ejecuta al enviar un formulario de busqueda
getElementById("search-bar").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    await searchRows(API_CONTRATO, "search-bar", fillTableContrato);
});  

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert_form").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se cierra el formulario de registro
    $("#agregar").modal("hide");
    // Se toman los datos del modal y los convierte a formData
    let parameters = new FormData(getElementById("insert_form"));
    // Se llama a la función que realiza la inserción. Se encuentra en el archivo components.js
    await saveRow(API_CONTRATO, API_CREATE, parameters, fillTableContrato);
});

// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update_form").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.  
     event.preventDefault();
    // Se toman los datos del modal y los convierte a formData
    let parameters = new FormData(getElementById("update_form"));
    // Se adhieren datos al arreglo que se envia al update
    parameters.append("id", datos_contrato["id"]);
    // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
    await saveRow(API_CONTRATO, API_UPDATE, parameters, fillTableContrato);
    // Cerrar el modal de actualizar
    $("#actualizar").modal("hide");
});

//EVENTO PARA DELETE
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("delete_form").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.  
    event.preventDefault();
    // CONVIRTIENDO EL JSON A FORMDATA
    let parameters = new FormData();
    // Se adhieren datos al arreglo que se envia al update
    parameters.append("id", datos_contrato.id);
    // Se llama a la función que realiza la borrar. Se encuentra en el archivo components.js
    await deleteRow(API_CONTRATO, parameters, fillTableContrato);
    // Se cierra el formulario de registro
    $("#eliminar").modal("hide");
});

