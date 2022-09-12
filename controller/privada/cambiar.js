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
  if (getElementById('contrauno').value == getElementById('contrados').value) {
    let endpointChange = API_EDICION_USUARIO + 'passwordRecovery'

    let parametros = new FormData()
    // Se busca en la URL las variables (parámetros) disponibles.

    let params = new URLSearchParams(location.search);

    // Se obtienen los datos localizados por medio de las variables.

    let id_usuario = params.get("id");
    parametros.append('id', id_usuario)
    console.log(id_usuario);

    parametros.append('password_user', getElementById('contrauno').value)
    var object = {};
    parametros.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);

    console.log(json)
    let respuesta = await APIConnection(endpointChange, POST_METHOD, parametros)
    console.log(respuesta)

    if (respuesta.status == API_SUCESS_REQUEST) {
      $("#buen_proceso").modal("show");
    } else {
      $("#error_proceso").modal("show");
    }
  }
  else {
    $("#mal_proceso").modal("show");
  }
};


