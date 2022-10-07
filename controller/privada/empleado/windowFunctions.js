//@ts-check
import { getElementById, showModal } from "../../constants/helpers.js";

export let datos_empleado = {
  id: 0,
  nombre_empleado: " ",
  apellido_empleado: " ",
  dui: " ",
  nit: " ",
  telefono: " ",
  correo: " ",
  genero: " ",
  fecha_nacimiento: " ",
  imagen: " ",
  id_estado_empleado: 0,
  nombre_estado_empleado: "",
  id_tipo_empleado: 0,
  nombre_tipo_empleado: "",
  imagen: "",
};

window.seleccionarTipoEmpleado = () => {
  datos_empleado.id_tipo_empleado = getElementById("tipo_empleado").value;
};

window.seleccionarEstadoEmpleado = () => {
  datos_empleado.id_estado_empleado = getElementById("estado_empleado").value;
};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE EMPLEADO
window.guardarDatosEmpleadoUpdate = (
  id_empleado,
  nombre_empleado,
  apellido_empleado,
  dui,
  nit,
  telefono,
  correo,
  genero,
  fecha_nacimiento,
  id_estado_empleado,
  id_tipo_empleado,
  imagen
) => {
  datos_empleado.id = id_empleado;

  getElementById("nombre_empleado_update").value = String(nombre_empleado);

  getElementById("apellido_empleado_update").value = String(apellido_empleado);

  getElementById("dui_update").value = String(dui);

  getElementById("nit_update").value = String(nit);

  getElementById("telefono_update").value = String(telefono);

  getElementById("correo_electronico_update").value = String(correo);

  getElementById("genero_update").value = String(genero);

  getElementById("fecha_nacimiento_update").value = String(fecha_nacimiento);

  getElementById("estado_empleado_update").value = String(id_estado_empleado);

  getElementById("tipo_empleado_update").value = String(id_tipo_empleado);

  datos_empleado.imagen = imagen;

  showModal("#actualizar");
};

// FUNCION PARA GUARDAR LOS DATOS DEL TIPO DE inquilino
window.guardarDatosinquilinoEliminar = (id_empleado) => {
  datos_empleado.id = id_empleado;
  showModal("#eliminar");
};
