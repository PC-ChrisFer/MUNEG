//@ts-check

//Función para cargar los datos del update
window.guardarDatosUpdate = (id_categoria, nombre_categoria) => {
    //Se transfieren los datos del boton al json global
    // delete
    // datos_categoria.id = id_categoria;
    document.getElementById("checkBocVisibilidad").checked = false;
    //Se llama el modal de actualizar
    $("#actualizar").modal("show");
    //Se imprime la información en el modal
    getElementById("nombre_categoria_update").value = String(nombre_categoria);

    return datos_categoria.id
  };
  
  //Función para cargar el id para el delete
 window.guardarDatosDelete = (id_categoria) => {
    //Se transfieren los datos del boton al json global
    datos_categoria.id = id_categoria;
    //Se llama el modal de borrar
    $("#eliminar").modal("show");
  };
  
  //Función para cambiar la visibilidad con un checkbox
  window.cambiarVisibilidadDeResgistro = () => {
    getElementById("verDatosliminados").checked === true
      ? (datos_categoria.visibilidad = true)
      : (datos_categoria.visibilidad = false);
  };
  
  //Función para mostrar datos invisibles
  window.leerDatosEliminados = async () => {
    getElementById("verDatosliminados").checked === true
      ? await readDeletedRowns(API_CATEGORIA, fillTableCategoria)
      : await readRows(API_CATEGORIA, fillTableCategoria);
  };

  module.exports = {guardarDatosUpdate: window.guardarDatosUpdate }