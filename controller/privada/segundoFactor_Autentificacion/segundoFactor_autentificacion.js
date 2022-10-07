//
import { APIConnection } from "../../APIConnection.js";
import { API_LOG_IN, POST_METHOD, SERVER } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";
import { obtenerNumeroAleatorio } from "../../soporte/soporte.js";

let datosAutentificacion = {
  codigoConfirmacion: 0,
};

export async function sendEmail(correo) {
  emailjs.init("XvdiLPYrw4ZVNcvss");

  datosAutentificacion.codigoConfirmacion = obtenerNumeroAleatorio(1000, 9999);

  let parameters = {
    codigo: datosAutentificacion.codigoConfirmacion,
    to: correo,
  };
  await emailjs.send(
    "service_48tm3u4",
    "confirmacionCodigo_templ",
    parameters
  );
}

const API_USUARIOS = SERVER + "privada/usuario.php?action=";

//Confirmar que el token autogenerado sea el mismo que se digito
window.confirmarCodigo = async () => {
  if (
    Number(datosAutentificacion.codigoConfirmacion) ==
    Number(getElementById("codigoConfirmacion").value)
  ) {
    // Se crea un end point para consultar la información de los usuarios
    let APIEndpoint = API_USUARIOS + API_LOG_IN;
    // CONVIRTIENDO EL JSON A FORMDATA

    let parameters = new FormData(getElementById("logInForm"));

    // Petición para revisar si el administrador se encuentra registrado.
    await APIConnection(APIEndpoint, POST_METHOD, parameters);

    window.location.href = "pagina_principal.html";
  } else {
    alert("Codigo incorrecto");
  }
};
