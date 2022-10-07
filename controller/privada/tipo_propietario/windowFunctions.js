import { getElementById, showModal } from "../../constants/helpers.js";

export let datos_tipo_propietario = {
  id: 0,
  nombre_tipo: " ",
  visibilidad: " ",
};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE PROPIETARIO
window.guardarDatosTipoPropietarioUpdate = (
  id_tipo_propietario,
  nombre_tipo,
  visibilidad
) => {
  datos_tipo_propietario.id = id_tipo_propietario;
  $("#actualizar").modal("show");

  // SE ACTUALIZA EL VALOR DEL INPUT CON EL ID ESPECIFICADO AL VALOR INGRESADO AL PARAMETRO, ASEGURENSE DE QUE EL INPUT TENGA
  getElementById("tipo_propietario_update").value = String(nombre_tipo);
  getElementById("visibilidad_update").value = String(visibilidad);
};

window.guardarDatosTipoPropietarioDelete = (id_tipo_propietario) => {
  datos_tipo_propietario.id = id_tipo_propietario;
  showModal("#eliminarForm");
};
