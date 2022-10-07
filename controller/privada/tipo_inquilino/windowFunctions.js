//Importar las constantes y metodos de components.js y api_constant.js
import { readRows, readDeletedRowns } from "../../components.js";
import { SERVER } from "../../constants/api_constant.js";
import {
  checkButton,
  getElementById,
  showModal,
  uncheckButton,
} from "../../constants/helpers.js";
import { fillTableTipoInquilino } from "./fill.js";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
export let datos_tipo_inquilino = {
  id: 0,
  nombre_tipo: " ",
  visibilidad: " ",
};

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_TIPO_INQUILINO = SERVER + "privada/tipo_inquilino.php?action=";

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE INQUILINO
window.guardarDatosTipoInquilinoUpdate = (
  id_tipo_inquilino,
  nombre_tipo,
  visibilidad
) => {
  datos_tipo_inquilino.id = id_tipo_inquilino;
  getElementById("tipo_inquilino_update").value = String(nombre_tipo);
  getElementById("visibilidad_update").value = String(visibilidad);

  getElementById("verDatosliminados").checked
    ? uncheckButton("#visibilidad_update")
    : checkButton("#visibilidad_update");

  showModal("#actualizar");
};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE INQUILINO
window.guardarDatosTipoInquilinoDelete = (id_tipo_inquilino) => {
  datos_tipo_inquilino.id = id_tipo_inquilino;
  showModal("#eliminarForm");
};

window.cambiarVisibilidadDeResgistro = () => {
  getElementById("verDatosliminados").checked === true
    ? (datos_tipo_inquilino.visibilidad = true)
    : (datos_tipo_inquilino.visibilidad = false);
};

window.leerDatosEliminados = async () => {
  getElementById("verDatosliminados").checked === true
    ? await readDeletedRowns(API_TIPO_INQUILINO, fillTableTipoInquilino)
    : await readRows(API_TIPO_INQUILINO, fillTableTipoInquilino);
};
