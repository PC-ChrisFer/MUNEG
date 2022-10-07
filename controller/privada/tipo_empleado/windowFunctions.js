//@ts-check
import { readRows, readDeletedRowns } from "../../components.js";
import {
  checkButton,
  getElementById,
  showModal,
  uncheckButton,
} from "../../constants/helpers.js";
import { SERVER } from "../../constants/api_constant.js";
import { fillTableTipoEmpleado } from "./fill.js";

export let datos_tipo_empleado = {
  id: 0,
  nombre_tipo: " ",
  visibilidad: " ",
};

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_TIPO_EMPLEADO = SERVER + "privada/tipo_empleado.php?action=";

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE EMPLEADO
window.guardarDatosTipoEmpleadoUpdate = (
  id_tipo_empleado,
  nombre_tipo,
  visibilidad
) => {
  datos_tipo_empleado.id = id_tipo_empleado;

  getElementById("tipo_empleado_update").value = String(nombre_tipo);
  getElementById("visibilidad_update").value = String(visibilidad);

  getElementById("verDatosliminados").checked
    ? uncheckButton("#visibilidad_update")
    : checkButton("#visibilidad_update");

  showModal("#actualizar");
};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE EMPLEADO
window.guardarDatosTipoEmpleadoDelete = (id_tipo_empleado) => {
  datos_tipo_empleado.id = id_tipo_empleado;
  showModal("#eliminarForm");
};

window.cambiarVisibilidadDeResgistro = () => {
  getElementById("verDatosliminados").checked === true
    ? (datos_tipo_empleado.visibilidad = true)
    : (datos_tipo_empleado.visibilidad = false);
};

window.leerDatosEliminados = async () => {
  getElementById("verDatosliminados").checked === true
    ? await readDeletedRowns(API_TIPO_EMPLEADO, fillTableTipoEmpleado)
    : await readRows(API_TIPO_EMPLEADO, fillTableTipoEmpleado);
};
