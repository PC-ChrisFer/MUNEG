// @ts-ignore
//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, saveRow, searchRows, deleteRow } from "../components.js";
import {
    SEARCH_BAR,
    SERVER,
    SUBMIT,
    UPDATE_MODAL,
} from "../constants/api_constant.js";
import {
    getElementById,
    validateExistenceOfUser,
} from "../constants/functions.js";
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
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    await readRows(API_CONTRATO, fillTableContrato);
    await fillComboBoxPropietario();
    await fillComboBoxPropiedad();
    await fillComboBoxEmpleado();
    await fillComboBoxInquilino();
});

//Obtener los datos de combobox tipo empleado
async function fillComboBoxPropietario() {
    //Se crea un endpoint especifico para el caso de leer propietario
    let APIEndpoint = SERVER + 'privada/contrato.php?action=readPropietario'
    //Se utiliza como api connection para realizar la consulta
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null)
    //Obtiene todos los valores y los ordena en un array, presentandolos en el select
    APIResponse.dataset.map(element => {
        getElementById('id_propietario').innerHTML += `<option value="${element.id_propietario}" > ${element.nombre} </option>`
    })
    APIResponse.dataset.map(element => {
        getElementById('id_propietario_update').innerHTML += `<option value="${element.id_propietario}" > ${element.nombre} </option>`
    })
}

//@ts-ignore
window.seleccionarPropietario = () => {
    //@ts-ignore
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
        getElementById('id_propiedad').innerHTML += `<option value="${element.id_propiedad}" > ${element.codigo} </option>`
    })
    APIResponse.dataset.map(element => {
        getElementById('id_propiedad_update').innerHTML += `<option value="${element.id_propiedad}" > ${element.codigo} </option>`
    })
}

//@ts-ignore
window.seleccionarPropiedad = () => {
    //@ts-ignore
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
        getElementById('id_empleado').innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`
    })
    APIResponse.dataset.map(element => {
        getElementById('id_empleado_update').innerHTML += `<option value="${element.id_empleado}" > ${element.nombre} </option>`
    })
}

//@ts-ignore
window.seleccionarEmpleado = () => {
    //@ts-ignore
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
        getElementById('id_inquilino').innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`
    })
    APIResponse.dataset.map(element => {
        getElementById('id_inquilino_update').innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`
    })
}

//@ts-ignore
window.seleccionarInquilino = () => {
    //@ts-ignore
    datos_inquilino.id_inquilino = document.getElementById('id_inquilino').value
}

//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableContrato(dataset) {
    let content = "";
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map((row) => {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += ` 
              <tr>  
                  <td><img src="../../api/imagenes/contrato/${row.imagen}" width=100></td> 
                  <td>${row.descripcion}</td>
                  <td>${row.fecha_firma}</td> 
                  <td>${row.id_propietario}</td> 
                  <td>${row.id_propiedad}</td> 
                  <td>${row.id_empleado}</td> 
                  <td>${row.id_inquilino}</td> 
                  <td class="d-flex justify-content-center">
                      <div class="btn-group" role="group">
                          <form method="post" id="read-one">
                              <a onclick="guardarDatosContratoUpdate('${row.id_contrato}', '${row.descripcion}', '${row.fecha_firma}', '${row.id_propietario}', '${row.id_propiedad}', '${row.id_empleado}', '${row.id_inquilino}')" class="btn btn-primary">
                              <img src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                              <a  onclick="guardarDatosContratoDelete('${row.id_contrato}')" class="btn btn-primary"  
                              name="search">
                              <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
                              </form>
                      </div>
                  </td>
              </tr>
          `;
    });
    // Se muestran cada filas de los registros
    getElementById("tbody-Contrato").innerHTML = content;
}

// FUNCION PARA GUARDAR LOS DATOS DEL CATEGORIA
// @ts-ignore
window.guardarDatosContratoUpdate = (id_contrato, descripcion, fecha_firma, id_propietario, id_propiedad, id_empleado, id_inquilino) => {
    datos_contrato.id = id_contrato;
    $("#actualizar").modal("show");

    // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE ELINPUT TENGA
    //EL ATRIBUTO "value="""
    //@ts-ignore
    getElementById("descripcion_update").value = String(descripcion);
    //@ts-ignore
    getElementById("fecha_firma_update").value = String(fecha_firma);
    //@ts-ignore
    getElementById("id_propietario_update").value = String(id_propietario);
    //@ts-ignore
    getElementById("id_propiedad_update").value = String(id_propiedad);
    //@ts-ignore
    getElementById("id_empleado_update").value = String(id_empleado);
    //@ts-ignore
    getElementById("id_inquilino_update").value = String(id_inquilino);

};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE PROPIETARIO
// @ts-ignore
window.guardarDatosContratoDelete = (id_contrato) => {
    datos_contrato.id = id_contrato;
    $("#eliminar").modal("show");
};

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
    //@ts-ignore
    //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "'insert-modal'"
    let parameters = new FormData(getElementById("insert_form"));

    // PETICION A LA API POR MEDIO DEL ENPOINT, Y LOS PARAMETROS NECESARIOS PARA LA INSERSION DE DATOS
    await saveRow(API_CONTRATO, API_CREATE, parameters, fillTableContrato);
});

// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update_form").addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se cierra el formulario de registro
    $("#actualizar").modal("hide");
    //@ts-ignore
    let parameters = new FormData(getElementById("update_form"));
    //@ts-ignore
    parameters.append("id", datos_contrato["id"]);
  
    // API REQUEST
    await saveRow(API_CONTRATO, API_UPDATE, parameters, fillTableContrato);
});

//EVENTO PARA DELETE
getElementById("delete_form").addEventListener("submit", async (event) => {
    event.preventDefault();
    // Se cierra el formulario de registro
    console.log('prueba')
    // CONVIRTIENDO EL JSON A FORMDATA
    let parameters = new FormData();
    //@ts-ignore
    parameters.append("id", datos_contrato.id);
  
    //API REQUEST
    await deleteRow(API_CONTRATO, parameters, fillTableContrato);
    $("#eliminar").modal("hide");

});

