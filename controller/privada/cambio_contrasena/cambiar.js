//@ts-check
import {
  SERVER,
  API_SUCESS_REQUEST,
  POST_METHOD,
} from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";
import { APIConnection } from "../../APIConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_EDICION_USUARIO = SERVER + "privada/editar_usuario.php?action=";

window.cambiarContraseña = async () => {
  if (getElementById('contrauno').value == getElementById('contrados').value) {
    let endpointChange = API_EDICION_USUARIO + 'passwordRecovery'

    let parametros = new FormData()

    // Se busca en la URL las variables (parámetros) disponibles.
    let params = new URLSearchParams(location.search);

    // Se obtienen los datos localizados por medio de las variables.
    parametros.append('id', params.get("id") ?? "")
    parametros.append('password_user', getElementById('contrauno').value)

    let respuesta = await APIConnection(endpointChange, POST_METHOD, parametros)

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


