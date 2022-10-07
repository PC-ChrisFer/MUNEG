//@ts-check
import { getElementById, showModal } from "../../constants/helpers.js";
import { graphPieInquilinoDepartamento } from "./graphics.js";

export let datos_inquilino = {
  id: 0,
  nombre_inquilino: " ",
  apellido_inquilino: " ",
  dui: " ",
  nit: " ",
  telefono: " ",
  correo: " ",
  genero: " ",
  fecha_nacimiento: " ",
  imagen: " ",
  id_estado_inquilino: 0,
  nombre_estado_inquilino: "",
  id_tipo_inquilino: 0,
  nombre_tipo_inquilino: "",
  id_departamento: 0,
  imagen: "",
};

//Función para guardar los datos cambiados en el combobox
window.seleccionarTipoinquilino = () => {
  datos_inquilino.id_tipo_inquilino = getElementById("tipo_inquilino").value;
};

//Función para guardar los datos cambiados en el combobox
window.seleccionarEstadoinquilino = () => {
  datos_inquilino.id_estado_inquilino =
    getElementById("estado_inquilino").value;
};

//Función para guardar los datos cambiados en el combobox
window.selectDepartamento = (id_departamento) => {
  datos_inquilino.id_departamento = getElementById(id_departamento).value;
};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE inquilino
window.guardarDatosUpdate = (
  id_inquilino,
  nombre,
  apellido,
  DUI,
  NIT,
  NRC,
  telefono,
  correo,
  genero,
  fecha_nacimiento,
  id_tipo_inquilino,
  id_estado_inquilino,
  imagen
) => {
  //Se transfieren los datos del boton al json global
  datos_inquilino.id = id_inquilino;
  datos_inquilino.imagen = imagen;
  //Se llama el modal de actualizar
  //Se imprime la información en el modal
  getElementById("nombre_inquilino_update").value = String(nombre);
  getElementById("apellido_inquilino_update").value = String(apellido);
  getElementById("dui_update").value = String(DUI);
  getElementById("nit_update").value = String(NIT);
  getElementById("nrc_update").value = String(NRC);
  getElementById("telefono_update").value = String(telefono);
  getElementById("correo_electronico_update").value = String(correo);
  getElementById("genero_update").value = String(genero);
  getElementById("fecha_nacimiento_update").value = String(fecha_nacimiento);
  getElementById("tipo_inquilino_u").value = String(id_tipo_inquilino);
  getElementById("estado_inquilino_u").value = String(id_estado_inquilino);

  showModal("#actualizarform");
};

//Función para cargar el id para el delete
window.guardarDatosEliminar = (id_inquilino) => {
  datos_inquilino.id = id_inquilino;
  showModal("#eliminar");
};

//Funcion para generar grafico a traves del click de un boton
window.generarGrafico = async () => {
  await graphPieInquilinoDepartamento(datos_inquilino.id_departamento);
};
