//@ts-check

import { deleteRow, readRows,saveRow } from "../components.js";
import { SERVER, API_CREATE, API_UPDATE } from "../constants/api_constant.js";

import { getElementById } from "../constants/functions.js";

const API_GESTION_TIPO_PROPIEDAD = SERVER + "privada/tipo_propiedad.php?action=";

let datos_tipoPropiedad = {
    id_tipo_propiedad: "",
    nombre_tipo_propiedad:"",
    visibilidad:true
  };

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () => {
    //validateExistenceOfUser();
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    await readRows(API_GESTION_TIPO_PROPIEDAD, fillTableTipoPropiedad);
  });



 function fillTableTipoPropiedad (dataset) {
    let content = "";
    console.log(dataset)
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
     dataset.map((row) => {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
             content += ` 
             <tr>
             <td>${row.nombre_tipo}</td>
             <td>${row}</td>
             <td class="d-flex justify-content-center">
             <a onclick="guardarDatosUpdate(${row.id_tipo_propiedad},${row.visibilidad})" class="btn" id="button_ver_mas">
               <img  src="../../resources/img/iconos_formularios/edit_35px.png"></a>
             <a onclick="guardarDatosDelete(${row.id_tipo_acabado})" class="btn" id="button_ver_mas">
               <img src="../../resources/img/iconos_formularios/trash_can_35px.png"></a>
         </td>
         </tr>
        `;
  });
  //Se inserta las información de la tabla a un elemento html
  //@ts-ignore
  getElementById("tbody-tipo-propiedad").innerHTML = content;
}

//@ts-ignore
window.guardarDatosUpdate = (id_tipoPropiedad,visibilidad) => {
    datos_tipoPropiedad.id_tipo_propiedad = id_tipoPropiedad
    datos_tipoPropiedad.visibilidad = visibilidad

    //@ts-ignore
    getElementById("switchButton").value = datos_tipoPropiedad.visibilidad   ? "visible"
    : "invisible";
    //@ts-ignore
    $("#actualizar").modal("show");
}

//@ts-ignore
window.guardarDatosDelete = (id_tipoPropiedad) => {
    datos_tipoPropiedad.id_tipo_propiedad = id_tipoPropiedad
    //@ts-ignore
    $("#eliminar").modal("show");

}

//@ts-ignore
window.cambiarEstadoTipoPropiedad = () => {
    datos_tipoPropiedad.visibilidad = !datos_tipoPropiedad.visibilidad
      // @ts-ignore
  getElementById("switchButton").value = datos_tipoPropiedad.visibilidad
  ? "visible"
  : "invisible";
}


getElementById("insert_form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    //@ts-ignore
    let parameters = new FormData(getElementById("insert_form"));
  
    await saveRow(API_GESTION_TIPO_PROPIEDAD, API_CREATE, parameters, fillTableTipoPropiedad);
  
    // @ts-ignore
    $("#agregar").modal("hide");
  });

  
getElementById("update_form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
  

    //@ts-ignore
    let parameters = new FormData(getElementById("update_form"));
        //@ts-ignore
    parameters.append("visibilidad", datos_tipoPropiedad.visibilidad)
            //@ts-ignore
    parameters.append("id_tipo_propiedad", datos_tipoPropiedad.id_tipo_propiedad)

    
    await saveRow(API_GESTION_TIPO_PROPIEDAD, API_UPDATE, parameters, fillTableTipoPropiedad);
  
    // @ts-ignore
    $("#actualizar").modal("hide");
  });

    
getElementById("delete_form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    //@ts-ignore
    let parameters = new FormData();
    //@ts-ignore
    parameters.append("id_tipo_propidad", datos_tipoPropiedad.id_tipo_propiedad)

    await deleteRow(API_GESTION_TIPO_PROPIEDAD, parameters, fillTableTipoPropiedad);
  
    // @ts-ignore
    $("#eliminar").modal("hide");
  });