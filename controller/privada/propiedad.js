//@ts-check

import { deleteRow, readRows, saveRow } from "../components.js";
import {
  SERVER,
  API_CREATE,
  API_UPDATE,
  API_SUCESS_REQUEST,
  GET_METHOD,
} from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { APIConnection } from "../APIConnection.js";

const API_PROPIEDAD = SERVER + "privada/propiedad.php?action=";

let datosPropiedad = {
    id_propiedad:"",
    direccion_propiedad:"",
    area_propiedad:"",
    area_construccion_propiedad:"",
    codigo:"",
    precio:0,
    alquiler:"",
    habitaciones:0,
    plantas:0,
    sanitario:0,
    espacioParqueo:0,
    descripcion:"",
    tipo_acabadoID:"",
    municipioID:0,
    tipoPropiedadID:0,
    inquilinoID:0,
    empleadoID:0
}

document.addEventListener("DOMContentLoaded", async () => {
    //validateExistenceOfUser();
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    await readRows(API_PROPIEDAD, fillTablePropiedad);
  });

  function fillTablePropiedad(dataset) {
    let content = "";
    console.log(dataset);
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map((row) => {
      // Se crean y concatenan las filas de la tabla con los datos de cada registro.
      content += ` 
                 <tr>
                 <td><img src="../img/${}"></td>
                 <td>${}</td>
                 <td>${}</td>
                 <td>${}</td>
                 <td>${}</td>
                 <td>${}</td>
                 <td>${}</td>
                 <td>${}</td>
                 <td class="d-flex justify-content-center">
                 <a onclick="guardarDatosUpdate(${row.id_usuario})" class="btn" id="button_ver_mas">
                   <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
                 <a onclick="guardarDatosDelete(${row.id_usuario})" class="btn" id="button_ver_mas">
                   <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
             </td>
             </tr>
            `;
    });    
  //@ts-ignore
  getElementById("tbody-usuario").innerHTML = content;
}

async function fillTipoAcabado() {
    let APIEndpoint = API_PROPIEDAD + "readAll";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    if (APIResponse.status == API_SUCESS_REQUEST) {
      APIResponse.dataset.map((element) => {
        //@ts-ignore
        getElementById(
          "cmb_tipo_acabado"
        ).innerHTML += `<option value="${element.id_tipo_usuario}" > ${element.nombre_tipo} </option>`;
      });
      return;
    }
    console.log("all bad");
  }

  async function fillMunicipio() {
    let APIEndpoint = API_PROPIEDAD + "readAll";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    if (APIResponse.status == API_SUCESS_REQUEST) {
      APIResponse.dataset.map((element) => {
        //@ts-ignore
        getElementById(
          "cmb_municipio"
        ).innerHTML += `<option value="${element.id_tipo_usuario}" > ${element.nombre_tipo} </option>`;
      });
      return;
    }
    console.log("all bad");
  }
  async function fillTipoPropiedad() {
    let APIEndpoint = API_PROPIEDAD + "readAll";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    if (APIResponse.status == API_SUCESS_REQUEST) {
      APIResponse.dataset.map((element) => {
        //@ts-ignore
        getElementById(
          "cmb_tipo_propiedad"
        ).innerHTML += `<option value="${element.id_tipo_usuario}" > ${element.nombre_tipo} </option>`;
      });
      return;
    }
    console.log("all bad");
  }

  async function fillEmpleado() {
    let APIEndpoint = API_PROPIEDAD + "readAll";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    if (APIResponse.status == API_SUCESS_REQUEST) {
      APIResponse.dataset.map((element) => {
        //@ts-ignore
        getElementById(
          "cmb_empleado"
        ).innerHTML += `<option value="${element.id_tipo_usuario}" > ${element.nombre_tipo} </option>`;
      });
      return;
    }
    console.log("all bad");
  }

  async function fillInquilino() {
    let APIEndpoint = API_PROPIEDAD + "readAll";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    if (APIResponse.status == API_SUCESS_REQUEST) {
      APIResponse.dataset.map((element) => {
        //@ts-ignore
        getElementById(
          "cmb_inquilino"
        ).innerHTML += `<option value="${element.id_tipo_usuario}" > ${element.nombre_tipo} </option>`;
      });
      return;
    }
    console.log("all bad");
  }


  //@ts-ignore
window.selectTipoAcabado = (id_tipo_acabado) => {
    datosPropiedad.tipo_acabadoID = id_tipo_acabado;
  };
  
  //@ts-ignore
  window.selectMunicipio = (id_municipio) => {
    datosPropiedad.municipioID = id_municipio;
  };

    
  //@ts-ignore
  window.selectTipoPropiedad = (id_tipo_propiedad) => {
    datosPropiedad.tipoPropiedadID = id_tipo_propiedad;
  };

    //@ts-ignore
    window.selectEmpleado = (id_empleado) => {
        datosPropiedad.empleadoID = id_empleado;
      };

//@ts-ignore
window.guardarDatosUpdate = (id_propiedad) => {
    datosPropiedad.id_propiedad = id_propiedad;
    //@ts-ignore
    $("#actualizar").modal("show");
  };
  
  //@ts-ignore
  window.guardarDatosDelete = (id_propiedad) => {
    datosPropiedad.id_propiedad  = id_propiedad;
    //@ts-ignore
    $("#eliminar").modal("show");
  };

  getElementById("insert_form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    //@ts-ignore
    let parameters = new FormData(getElementById("update_form"));
    parameters.append("id", datosUsuario.id_usuario);
    parameters.append("tipo_usuario", datosUsuario.tipo_usuario);
    parameters.append("empleado", datosUsuario.empleado_id);
  
    await saveRow(API_GESTION_URUSARIO, API_UPDATE, parameters, fillTableUsarios);
  
    // @ts-ignore
    $("#agregar").modal("hide");
  });
  

  getElementById("update_form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    //@ts-ignore
    let parameters = new FormData(getElementById("update_form"));
    parameters.append("id", datosUsuario.id_usuario);
    parameters.append("tipo_usuario", datosUsuario.tipo_usuario);
    parameters.append("empleado", datosUsuario.empleado_id);
  
    await saveRow(API_GESTION_URUSARIO, API_UPDATE, parameters, fillTableUsarios);
  
    // @ts-ignore
    $("#agregar").modal("hide");
  });
  
  getElementById("delete_form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    let parameters = new FormData();
    parameters.append("id", datosUsuario.id_usuario);
  
    await deleteRow(API_GESTION_URUSARIO, parameters, fillTableUsarios);
  
    // @ts-ignore
    $("#agregar").modal("hide");
  });