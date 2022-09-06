import { getElementById } from "../../constants/functions.js";
import {obtenerNumeroAleatorio } from "../../soporte/soporte.js"

let datosAutentificacion = {
    codigoConfirmacion:0
}

export async function sendEmail (correo)  {
 emailjs.init("JSwLPixUlUBv4PZXA");

 datosAutentificacion.codigoConfirmacion = obtenerNumeroAleatorio(1000,9999) 

  let parameters = {
      codigo:datosAutentificacion.codigoConfirmacion,
      "to":correo     
  }
   await emailjs.send("service_icg8p0a","template_a34vlwl",parameters);
 };

 //Confirmar que el token autogenerado sea el mismo que se digito
 window.confirmarCodigo = async () =>{
    console.log(Number(getElementById("codigoConfirmacion").value))
    if(Number(datosAutentificacion.codigoConfirmacion) == Number(getElementById("codigoConfirmacion").value)) {
        console.log("Codigo correcto");
        window.location.href = "pagina_principal.html";
    } else {
        alert("Codigo incorrecto");
    }
 }