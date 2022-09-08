//@ts-check
//Importar las constantes y metodos de components.js y api_constant.js
import {
  deleteRow,
  readRows,
  saveRow,
  readDeletedRowns,
} from "../components.js";
import {
  SERVER,
  API_UPDATE,
  API_SUCESS_REQUEST,
  GET_METHOD,
  POST_METHOD,
} from "../constants/api_constant.js";
import { getElementById } from "../constants/functions.js";
import { validateExistenceOfUser } from "../constants/validationUser.js";
import { APIConnection } from "../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_GESTION_URUSARIO = SERVER + "privada/usuario.php?action=";
const API_EDICION_USUARIO = SERVER + "privada/editar_usuario.php?action=";

// JSON EN EN CUAL SE GUARDA INFORMACION DE EL TIPO DE EMPLEADO, ESTA INFORMACION
// SE ACTUALIZA CUANDO SE DA CLICK EN ELIMINAR O HACER UN UPDATElet
let datosUsuario = {
  id_usuario: "",
  nombre_usuario: "",
  password: "",
  tipo_usuario: "",
  propiedatio_id: "",
  empleado_id: "",
};

window.cambiarContraseña = async () => {
  if (getElementById('contrauno').value == getElementById('contrados').value){
    let endpointChange = API_EDICION_USUARIO + 'passwordRecovery'

  let parametros = new FormData()
  // Se busca en la URL las variables (parámetros) disponibles.

  let params = new URLSearchParams(location.search);

  // Se obtienen los datos localizados por medio de las variables.

  let id_empleado = params.get("id");
  parametros.append('id', id_empleado)

  parametros.append('password_user', getElementById('contrauno').value)
  let respuesta = await APIConnection(endpointChange, POST_METHOD, parametros)
    console.log(respuesta)
  }
};

// EVENTO PARA UPDATE
// SE EJECUTARA CUANDO EL BOTON DE TIPO "submit" DEL FORMULARIO CON EL ID 'actualizarConfirmar_buttons' SE CLICKEE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  //OBTIENE LOS DATOS DEL FORMULARIO QUE TENGA COMO ID "update_form'"
  let parameters = new FormData(getElementById("update_form"));
  // Se adhieren datos al arreglo que se envia al update
  parameters.append("id", datosUsuario.id_usuario);
  var object = {};
  parameters.forEach(function (value, key) {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  console.log(json)
  // Se llama a la función que realiza la actualización. Se encuentra en el archivo components.js
  await saveRow(API_EDICION_USUARIO, API_UPDATE, parameters);
  // Se cierra el formulario de registro
  $("#actualizar").modal("hide");
});
