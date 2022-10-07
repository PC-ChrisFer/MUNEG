//@ts-check
import { APIConnection } from "../../APIConnection.js";
import {
  saveRow
} from "../../components.js";
import {
  API_SUCESS_REQUEST, API_UPDATE, GET_METHOD, SERVER
} from "../../constants/api_constant.js";
import { closeModal, getElementById } from "../../constants/helpers.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import { inactivityTime } from "../../soporte/soporte.js";


const API_GESTION_URUSARIO = SERVER + "privada/usuario.php?action=";
const API_EDICION_USUARIO = SERVER + "privada/editar_usuario.php?action=";

let datosUsuario = {
  id_usuario: "",
  nombre_usuario: "",
  password: "",
  tipo_usuario: "",
  propiedatio_id: "",
  empleado_id: "", 
};

document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  let APIEndpoint = API_GESTION_URUSARIO + "readOne";
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  inactivityTime();
  if (APIResponse.session == API_SUCESS_REQUEST) {

    getElementById("nombre_usuario").value = APIResponse.dataset.nombre_usuario;
    getElementById("password_user").value = APIResponse.dataset.password;

    datosUsuario.id_usuario = APIResponse.dataset.id_usuario;
  }
});


getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData(getElementById("update_form"));
  parameters.append("id", datosUsuario.id_usuario);

  await saveRow(API_EDICION_USUARIO, API_UPDATE, parameters);

  closeModal("#actualizar")
});
