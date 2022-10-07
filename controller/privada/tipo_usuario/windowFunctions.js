//@ts-check
import { readDeletedRowns, readRows } from "../../components.js";
import { SERVER } from "../../constants/api_constant.js";
import {
  getElementById,
  showModal,
  uncheckButton
} from "../../constants/helpers.js";
import { fillTableTipoUsuario } from "./fill.js";

export let datos_tipoUsuario = {
  id_tipo_usuario: "",
  nombre_tipo_usuario: "",
  visibilidad: true,
};

let isWatchinDeletedData = false;

const API_GESTION_TIPO_USUARIO = SERVER + "privada/tipo_usuario.php?action=";

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE USUARIO
window.guardarDatosUpdate = (id_tipoPropiedad, visibilidad) => {
  datos_tipoUsuario.id_tipo_usuario = id_tipoPropiedad;
  datos_tipoUsuario.visibilidad = visibilidad;

  uncheckButton("eliminarElemento");
  showModal("#actualizar");
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_tipo_usuario) => {
  datos_tipoUsuario.id_tipo_usuario = id_tipo_usuario;

  showModal("#eliminar");
};

window.leerDatosEliminados = async () => {
  if (getElementById("verDatosliminados").checked === true) {
    await readDeletedRowns(API_GESTION_TIPO_USUARIO, fillTableTipoUsuario);
    isWatchinDeletedData = true;
  } else {
    await readRows(API_GESTION_TIPO_USUARIO, fillTableTipoUsuario);
    isWatchinDeletedData = false;
  }

  getElementById("verDatosliminados").checked === true
    ? (getElementById("textoSwitch").innerHTML = "Hacer visible")
    : (getElementById("textoSwitch").innerHTML = "Hacer invisible");
};

window.cambiarVisibilidadDeResgistro = () => {
  if (isWatchinDeletedData) {
    getElementById("eliminarElemento").checked === true
      ? (datos_tipoUsuario.visibilidad = true)
      : (datos_tipoUsuario.visibilidad = false);
  } else {
    getElementById("eliminarElemento").checked === true
      ? (datos_tipoUsuario.visibilidad = false)
      : (datos_tipoUsuario.visibilidad = true);
  }
};

export function resetIsWatchinDeletedDataValue() {
  isWatchinDeletedData = false;
}
