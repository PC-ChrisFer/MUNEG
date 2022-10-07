//@ts-check

import { APIConnection } from "../../APIConnection.js";
import { POST_METHOD, SERVER } from "../../constants/api_constant.js";
import { getElementById, showModal } from "../../constants/helpers.js";

const API_USUARIOS = SERVER + "privada/usuario.php?action=";

window.abrirGuardarDato = () => {
  showModal("#correo_enviado")
};

window.comprobarDato = async () => {

  let endpointEmail = API_USUARIOS + "readMail";
  let parametros = new FormData();
  parametros.append("nombre_usuario", getElementById("nombre_usuario").value);
  var object = {};
  parametros.forEach(function(value, key){
      object[key] = value;
  });
  var json = JSON.stringify(object);
  console.log(json)

  let respuesta = await APIConnection(endpointEmail, POST_METHOD, parametros);

  console.log(respuesta)
  let URL =
    "http://localhost/MUNEG/views/privada/cambiar_password.html?id=" +
    respuesta.dataset.id_usuario;

  //ENVIANDO EMAIL
  //Inicializadno libreria
  emailjs.init("XvdiLPYrw4ZVNcvss");

  //INICIALIZANDO PARAMETROS
  let parameters = {
    url: URL,
    to: respuesta.dataset.correo_electronico,
  };

  // ENVIO DE INFORMACION
  let res = await emailjs.send("service_48tm3u4", "recuperacion_template", parameters);

  if ((res.status = 200)) {
    showModal("#proceso_bien")
  } else {
    showModal("#error_proceso")
  }
};
