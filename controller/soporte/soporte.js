export function obtenerNumeroAleatorio(min, max) {
    return Math.floor( Math.random() * (max - min) + min);
  }

export async function envirarEmailRecuperacionContraseña(URL,correo ) { 
  //Inicializadno libreria 
 emailjs.init("JSwLPixUlUBv4PZXA");

  //INICIALIZANDO PARAMETROS
  let parameters = {
      url:URL,
      "to":correo     
  }

  // ENVIO DE INFORMACION
   await emailjs.send("service_icg8p0a","resetPassword",parameters);
}