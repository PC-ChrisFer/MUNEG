//@ts-check
import { APIConnection } from "../../APIConnection.js";
import { deleteRow, readRows, saveRow, searchRows } from "../../components.js";
import {
  API_CREATE,
  API_SUCESS_REQUEST,
  API_UPDATE,
  GET_METHOD,
  SERVER,
} from "../../constants/api_constant.js";
import {
  closeModal,
  getElementById,
  uncheckButton,
} from "../../constants/helpers.js";
import { validateExistenceOfUser } from "../../constants/validationUser.js";
import {
  fillEmpleado,
  fillInquilino,
  fillMunicipio,
  fillPropietario,
  fillTablePropiedad,
  fillTipoAcabado,
  fillTipoPropiedad,
} from "./fill.js";
import { datosPropiedad } from "./windowFunctions.js";
import { inactivityTime } from "../../soporte/soporte.js";
import { sendImageToFirebase } from "../firebase/firebaseConnection.js";

//Constantes que establece la comunicación entre la API y el controller utilizando parametros y rutas
const API_PROPIEDAD = SERVER + "privada/propiedad.php?action=";
const API_USUARIO = SERVER + "privada/usuario.php?action=";

document.addEventListener("DOMContentLoaded", async () => {
  await validateExistenceOfUser();
  await readRows(API_PROPIEDAD, fillTablePropiedad);
  await fillTipoAcabado();
  await fillMunicipio();
  await fillTipoPropiedad();
  await fillInquilino();
  await fillEmpleado();
  await fillPropietario();

  getElementById("textoSwitch").innerHTML = "Hacer invisible";

  inactivityTime();
});

// EVENTO PARA READ
document.addEventListener("submit", async (event) => {
  event.preventDefault();
  await searchRows(API_PROPIEDAD, "search-bar", fillTablePropiedad);
});

// EVENTO PARA INSERT
// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
getElementById("insert_form")?.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();

  let parameters = new FormData(getElementById("insert_form"));

  parameters.append("id_municipio_update", datosPropiedad.municipioID);
  parameters.append("id_tipo_propiedad_update", datosPropiedad.tipoPropiedadID);
  parameters.append("id_empleado_update", datosPropiedad.empleadoID);
  parameters.append("id_inquilino", datosPropiedad.inquilinoID);
  parameters.append("id_tipo_acabado_update", datosPropiedad.tipo_acabadoID);
  parameters.append(
    "id_estado_propiedad_update",
    datosPropiedad.inquilinoID == 0 ? 2 : 1
  );
  let imageURL = await sendImageToFirebase("upload_image");


  parameters.append("imageName", imageURL);
  await saveRow(API_PROPIEDAD, API_CREATE, parameters, fillTablePropiedad);
  closeModal("#agregar");
});

//EVENTO PARA UPDATE
getElementById("update_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  // OBTENIENDO URL DE IMAGEN
  let imageURL =
    (await sendImageToFirebase("updateGestionImagen")) ??
    datosPropiedad.imageName;

  let parameters = new FormData(getElementById("update_form"));
  parameters.append("id_propiedad", datosPropiedad.id_propiedad);
  parameters.append("visibilidad", datosPropiedad.visibilidad);

  parameters.append("imageName", imageURL);

  // Se llama a la función que realiza la actualizacion. Se encuentra en el archivo components.js
  await saveRow(API_PROPIEDAD, API_UPDATE, parameters, fillTablePropiedad);

  getElementById("textoSwitch").innerHTML = "Hacer invisible";

  uncheckButton("#verDatosliminados");
  closeModal("#actualizar");
});

//EVENTO PARA DELETE
getElementById("delete_form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  let parameters = new FormData();
  parameters.append("id_propiedad", datosPropiedad.id_propiedad);

  await deleteRow(API_PROPIEDAD, parameters, fillTablePropiedad);
  closeModal("#eliminar");
});
