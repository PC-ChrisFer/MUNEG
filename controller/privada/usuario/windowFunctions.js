//@ts-check

import { readDeletedRowns, readRows } from "../../components.js";
import { SERVER } from "../../constants/api_constant.js";
import { getElementById, showModal } from "../../constants/helpers.js";
import { datos_reporte } from "../reportes/windowFunctions.js";
import { fillTableUsarios } from "./fill.js";

const API_GESTION_USUARIO = SERVER + "privada/usuario.php?action=";

export let datosUsuario = {
  id_usuario: "",
  nombre_usuario: "",
  password: "",
  tipo_usuario: "",
  propiedatio_id: "",
  empleado_id: "",
};

window.leerDatosEliminados = async () => {
  getElementById("verDatosliminados").checked === true
    ? await readDeletedRowns(API_GESTION_USUARIO, fillTableUsarios)
    : await readRows(API_GESTION_USUARIO, fillTableUsarios);
    
  getElementById("verDatosliminados").checked === true
    ? (getElementById("textoSwitch").innerHTML = "Hacer visible")
    : (getElementById("textoSwitch").innerHTML = "Hacer invisible");
};

window.cambiarVisibilidadDeResgistro = () => {
  getElementById("eliminarElemento").checked === true
    ? (datos_reporte.visibilidad = false)
    : (datos_reporte.visibilidad = true);
};

//Función para cambiar la visibilidad con un checkbox
window.selectTipoUsuario = (id_tipo_usuario) => {
  datosUsuario.tipo_usuario = getElementById(id_tipo_usuario).value;
};

//Función para cambiar la visibilidad con un checkbox
window.selectEmpleado = (id_empleado) => {
  datosUsuario.empleado_id = getElementById(id_empleado).value;
};

// FUNCION PARA GUARDAR LOS DATOS USUARIO
window.guardarDatosUpdate = (id_usuario, nombre_usuario, id_empleado) => {
  datosUsuario.id_usuario = id_usuario;
  getElementById("nombre_usuario").value = String(nombre_usuario);
  getElementById("nombre_usuario").value = String(nombre_usuario);
  getElementById("cmb_empleado_update").value = String(id_empleado);
    
  showModal("#actualizar")
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_usuario) => {
  datosUsuario.id_usuario = id_usuario;

  showModal("#eliminar")
};
