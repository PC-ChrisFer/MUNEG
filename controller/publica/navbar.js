//@ts-check
import { APIConnection } from "../APIConnection.js";
import { GET_METHOD, SERVER } from "../constants/api_constant.js";
import { getElementById } from "../constants/helpers.js";

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

document.addEventListener("DOMContentLoaded", async () => {
  //Cargando los combobox
  await fillComboBoxDepartamento();
  await fillComboBoxMunicipio();
  await fillComboBoxTipoPropiedad();
  await fillComboBoxCategoria();
});

//Obtener los datos de combobox departamento
async function fillComboBoxDepartamento() {
  let APIEndpoint = SERVER + "publica/propiedad.php?action=readDepartamento";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  APIResponse.dataset.map((element) => {
    getElementById(
      "departamento"
    ).innerHTML += `<option value="${element.id_departamento}" > ${element.departamento} </option>`;
  });
}

//Obtener los datos de combobox municipio
async function fillComboBoxMunicipio() {
  let APIEndpoint = SERVER + "publica/propiedad.php?action=readMunicipio";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);

  APIResponse.dataset.map((element) => {
    getElementById(
      "municipio"
    ).innerHTML += `<option value="${element.id_municipio}" > ${element.municipio} </option>`;
  });
}

//Obtener los datos de combobox estado empleado
async function fillComboBoxTipoPropiedad() {
  let APIEndpoint = SERVER + "publica/propiedad.php?action=readTipoPropiedad";

  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);

  APIResponse.dataset.map((element) => {
    getElementById(
      "tipo_propiedad"
    ).innerHTML += `<option value="${element.id_tipo_propiedad}" > ${element.nombre_tipo} </option>`;
  });
}

//Obtener los datos de combobox estado empleado
async function fillComboBoxCategoria() {
  //Se crea un endpoint especifico para el caso de leer tipo empleado
  let APIEndpoint = SERVER + "publica/propiedad.php?action=readCategoria";
  //Se utiliza como api connection para realizar la consulta
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  //Obtiene todos los valores y los ordena en un array, presentandolos en el select
  APIResponse.dataset.map((element) => {
    getElementById(
      "categoria"
    ).innerHTML += `<option value="${element.id_categoria}" > ${element.nombre_categoria} </option>`;
  });
}

//Guardar el elemento seleccionado
window.guardarDepartamento = () => {
  datos_propiedad.id_departamento = Number(
    getElementById("departamento").value
  );
  location.href = `propiedades_venta.html?id_departamento=${datos_propiedad.id_departamento}&id_municipio=${datos_propiedad.id_municipio}&id_categoria=${datos_propiedad.categoria}&id_tipo_propiedad=${datos_propiedad.id_tipo_propiedad}`;
};

//Guardar el elemento seleccionado
window.guardarMunicipio = () => {
  datos_propiedad.id_municipio = Number(getElementById("municipio").value);
  location.href = `propiedades_venta.html?id_departamento=${datos_propiedad.id_departamento}&id_municipio=${datos_propiedad.id_municipio}&id_categoria=${datos_propiedad.categoria}&id_tipo_propiedad=${datos_propiedad.id_tipo_propiedad}`;
};

//Guardar el elemento seleccionado
window.guardarTipoPropiedad = () => {
  datos_propiedad.id_tipo_propiedad = Number(
    getElementById("tipo_propiedad").value
  );
  location.href = `propiedades_venta.html?id_departamento=${datos_propiedad.id_departamento}&id_municipio=${datos_propiedad.id_municipio}&id_categoria=${datos_propiedad.categoria}&id_tipo_propiedad=${datos_propiedad.id_tipo_propiedad}`;
};

//Guardar el elemento seleccionado
window.guardarCategoria = () => {
  datos_propiedad.categoria = Number(getElementById("categoria").value);
  location.href = `propiedades_venta.html?id_departamento=${datos_propiedad.id_departamento}&id_municipio=${datos_propiedad.id_municipio}&id_categoria=${datos_propiedad.categoria}&id_tipo_propiedad=${datos_propiedad.id_tipo_propiedad}`;
};
