//@ts-check

//Importar las constantes y metodos de components.js y api_constant.js
// @ts-ignore
import { readRows, saveRow, searchRows, deleteRow } from "../components.js";
import { SERVER, GET_METHOD } from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_PROPIEDAD = SERVER + "publica/propiedad.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATE, CON LA FUNCION "guardarDatosTipoEmpleado"
let datos_propiedad = {
  id: 0,
  direccion: "",
  area_propiedad: 0,
  area_contruccion: 0,
  codigo: "",
  precio: "",
  alquiler: "",
  habitaciones: "",
  plantas: "",
  sanitario: "",
  espacio_parqueo: "",
  descripcion: "",
  id_municipio: 0,
  id_tipo_propiedad: 0,
  id_empleado: 0,
  id_inquilino: 0,
  id_tipo_acabado: 0,
  id_departamento: 0,
  categoria: 0,
};

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
  //Cargando los combobox
  //Combobox de Departamento
  await fillComboBoxDepartamento();
  //Combobox de Municipio
  await fillComboBoxMunicipio();
  //Combobox de Tipo Propiedad
  await fillComboBoxTipoPropiedad();
  //Combobox de Categoria
  await fillComboBoxCategoria();
});

//Obtener los datos de combobox departamento
async function fillComboBoxDepartamento() {
  //Se crea un endpoint especifico para el caso de leer tipo empleado
  let APIEndpoint = SERVER + "publica/propiedad.php?action=readDepartamento";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //@ts-ignore
    getElementById(
      "departamento"
    ).innerHTML += `<option value="${element.id_departamento}" > ${element.departamento} </option>`;
  }); 
}


//Guardar el elemento seleccionado
//@ts-ignore 
window.guardarDepartamento = () => {
  //@ts-ignore
  datos_propiedad.id_departamento = document.getElementById('departamento').value
  location.href= `propiedades_venta.html?id_departamento=${datos_propiedad.id_departamento}&id_municipio=${datos_propiedad.id_municipio}&id_categoria=${datos_propiedad.categoria}&id_tipo_propiedad=${datos_propiedad.id_tipo_propiedad}`;
}

//Obtener los datos de combobox municipio
async function fillComboBoxMunicipio() {
  //Se crea un endpoint especifico para el caso de leer tipo empleado
  let APIEndpoint = SERVER + "publica/propiedad.php?action=readMunicipio";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //@ts-ignore
    getElementById(
      "municipio"
    ).innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;
  });
}

//Guardar el elemento seleccionado
//@ts-ignore 
window.guardarMunicipio = () => {
  //@ts-ignore
  datos_propiedad.id_municipio = document.getElementById('municipio').value
  location.href= `propiedades_venta.html?id_departamento=${datos_propiedad.id_departamento}&id_municipio=${datos_propiedad.id_municipio}&id_categoria=${datos_propiedad.categoria}&id_tipo_propiedad=${datos_propiedad.id_tipo_propiedad}`;
}

//Obtener los datos de combobox estado empleado
async function fillComboBoxTipoPropiedad() {
  //Se crea un endpoint especifico para el caso de leer tipo empleado
  let APIEndpoint = SERVER + "publica/propiedad.php?action=readTipoPropiedad";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //@ts-ignore
    getElementById(
      "tipo_propiedad"
    ).innerHTML += `<option value="${element.id_tipo_propiedad}" > ${element.nombre_tipo} </option>`;
  });
}

//Guardar el elemento seleccionado
//@ts-ignore 
window.guardarTipoPropiedad= () => {
  //@ts-ignore
  datos_propiedad.id_tipo_propiedad = document.getElementById('tipo_propiedad').value
  location.href= `propiedades_venta.html?id_departamento=${datos_propiedad.id_departamento}&id_municipio=${datos_propiedad.id_municipio}&id_categoria=${datos_propiedad.categoria}&id_tipo_propiedad=${datos_propiedad.id_tipo_propiedad}`;
}

//Obtener los datos de combobox estado empleado
async function fillComboBoxCategoria() {
  //Se crea un endpoint especifico para el caso de leer tipo empleado
  let APIEndpoint = SERVER + "publica/propiedad.php?action=readCategoria";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    //@ts-ignore
    getElementById(
      "categoria"
    ).innerHTML += `<option value="${element.id_categoria}" > ${element.nombre_categoria} </option>`;
  });
}

//Guardar el elemento seleccionado
//@ts-ignore 
window.guardarCategoria = () => {
  //@ts-ignore
  datos_propiedad.categoria = document.getElementById('categoria').value
  location.href= `propiedades_venta.html?id_departamento=${datos_propiedad.id_departamento}&id_municipio=${datos_propiedad.id_municipio}&id_categoria=${datos_propiedad.categoria}&id_tipo_propiedad=${datos_propiedad.id_tipo_propiedad}`;
}