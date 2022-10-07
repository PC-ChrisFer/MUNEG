//@ts-check
export let datos_cliente = {
  id_cliente: 0,
  nombre_cliente: "",
  correo: "",
};

//Función para cargar los datos del update
window.guardarDatosUpdate = (id_cliente, nombre_cliente, correo) => {
  //Se transfieren los datos del boton al json global
  datos_cliente.id_cliente = id_cliente;
  //Se llama el modal de actualizar
  $("#actualizar").modal("show");
  //Se imprime la información en el modal
  document.getElementById("nombre_cliente_update").value =
    String(nombre_cliente);
  document.getElementById("correo_update").value = String(correo);
};

//Función para cargar el id para el delete
window.guardarDatosDelete = (id_cliente) => {
  //Se transfieren los datos del boton al json global
  datos_cliente.id_cliente = id_cliente;
  //Se llama el modal de borrar
  $("#eliminar").modal("show");
};
