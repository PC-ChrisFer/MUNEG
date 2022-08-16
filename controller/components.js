//@ts-check
//Importar las constantes y metodos de components.js y api_constant.js
import { APIConnection } from "./APIConnection.js";
import {
  API_READALL,
  API_SEARCH,
  API_SUCESS_REQUEST,
  GET_METHOD,
  POST_METHOD,
  API_DELETE,
  API_READONE,
  API_UNDELETE,
  API_READALL_DELETED,
  SERVER
} from "./constants/api_constant.js";
import { getElementById } from "./constants/functions.js";

// LEER REGISTROS
export async function readRows(ENDPOINT, fillrows) {
  let APIEndpoint = ENDPOINT + API_READALL;
  //Llamar a la función de conexión api para realizar fetch y then
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  console.log(APIResponse.dataset)
  if (APIResponse.status == API_SUCESS_REQUEST) {
    fillrows(APIResponse.dataset)
    return
  }
  // dado caso este if se ejecute con "return" hara que hasta este punto llegue el codigo
}

// LEER REGISTROS ELIMINADOS
export async function readDeletedRowns(ENDPOINT, fillrows) {
  let APIEndpoint = ENDPOINT + API_READALL_DELETED;
  //Llamar a la función de conexión api para realizar fetch y then
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  console.log(APIResponse.dataset)
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // valida si el array tiene longitud
    if(APIResponse.dataset.length == 0){
      //@ts-ignore
      $('#no_data').modal('show');
    }else {
      fillrows(APIResponse.dataset)
    }
    return
  }
  // dado caso este if se ejecute con "return" hara que hasta este punto llegue el codigo
}

// BUSCAR REGISTROS
export async function searchRows(ENDPOINT, formID, fillrows, parametersJson) {
  let APIEndpoint = ENDPOINT + API_SEARCH;
  //@ts-ignore
  let parameters = formID ? new FormData(getElementById(formID)) : parametersJson;

  //Llamar a la función de conexión api para realizar fetch y then
  let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);
  //Utilizar la respuesta del api para realizar funciones
  if (APIResponse.status == API_SUCESS_REQUEST) {
    fillrows(APIResponse.dataset)
    // dado caso este if se ejecute con "return" hara que hasta este punto llegue el codigo
    return;
  } else {
    fillrows([])
    // dado caso este if se ejecute con "return" hara que hasta este punto llegue el codigo
    return;
  }
}

// GUARDAR REGISTROS
export async function saveRow(ENDPOINT, ACTION, parameters, fillrows) {
  // ingresando valores a variables
  let APIEndpoint = ENDPOINT + ACTION;
  console.log(APIEndpoint)


  // ejecutando request hacia la API
  let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);
  // validando respuesta 
  if (APIResponse.status == API_SUCESS_REQUEST) {
    fillrows(APIResponse.dataset)
    //@ts-ignore
    $('#guardado').modal('show');
    return;
  }
  //En caso de fracaso se abrira un modal de error
  //@ts-ignore
  $('#error_proceso').modal('show');

}

// ELIMINAR REGISTROS
export async function deleteRow(ENDPOINT, parameters, fillrows) {
  let APIEndpoint = ENDPOINT + API_DELETE;

  let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);

  if (APIResponse.status == API_SUCESS_REQUEST) {
    fillrows(APIResponse.dataset)
    //@ts-ignore
    $('#eliminado').modal('show');
    return;
  }
  //En caso de fracaso se abrira un modal de error
  //@ts-ignore
  $('#error_proceso').modal('show');
}

// Hacer un readOne
export async function readOne(ENDPOINT, parameters, fillrows) {
  let APIEndpoint = ENDPOINT + API_READONE;

  let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);

  console.log(APIResponse);  
  if (APIResponse.status == API_SUCESS_REQUEST) {
    fillrows(APIResponse.dataset)
    return;
  }
}

// ELIMINAR REGISTROS
export async function unDeleteRow(ENDPOINT, parameters, fillrows) {
  let APIEndpoint = ENDPOINT + API_UNDELETE;

  let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);

  if (APIResponse.status == API_SUCESS_REQUEST) {
    fillrows(APIResponse.dataset)
    return;
  }
  //En caso de fracaso se abrira un modal de error
  //@ts-ignore
  $('#error_proceso').modal('show');
}

// SE TIENE QUE PASAR EL HTML QUE SE QUIERE IMPRIMIR A PDF
export async function generatePDF(stingHTML, nombreReporte) {
  console.log("rxr");
  let APIEndpointCreatePDF = SERVER + "privada/pdf.php?action=create_pdf";
  // OPCIONES PARA LA GENERACION DE EL PDF
  var opt = {
    //MARGEN
    margin: 1,
    //NOMBRE REPORTE
    filename: "reporte",
    //EXTENCION
    image: { type: "jpeg", quality: 1 },
    // CONFIGURACIONES VISUALES
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  // OBTENIENDO BUFFER QUE RETORNA EL METODO
  let buffer = await html2pdf()
    .set(opt)
    .from(stingHTML)
    .toPdf()
    .get("pdf")
    .then(function (pdf) {
      console.log(pdf);
      var totalPages = pdf.internal.getNumberOfPages();
      for (var i = 1; i <= pdf.internal.getNumberOfPages(); i++) {
        pdf.setPage(i);
        pdf.setFontSize(5);
        pdf.setTextColor(0);
        pdf.text(
          pdf.internal.pageSize.getWidth() - 5,
          pdf.internal.pageSize.getHeight() - 0.1,
          "Page number " + i
        );
        // pdf.addImage(
        //   "../../resources/img/navbar_publico/logoCut.png",
        //   "jpeg",
        //   pdf.internal.pageSize.getWidth() - 1.1,
        //   pdf.internal.pageSize.getHeight() - 1.25,
        //   1,
        //   1
        // );
      }
    })
    .outputPdf("arraybuffer");

  // CONVIRTIENDO "BUFFER" A "BLOB"
  const blob = new Blob([buffer]);

  console.log("blob")

  console.log(blob)

  let parameters = new FormData();

  parameters.append("pdf", blob);
  parameters.append("nombreReporte", nombreReporte);

  await APIConnection(APIEndpointCreatePDF, POST_METHOD, parameters);
}

// OBTIENE LA FECHA DE HOY
export function obtenerFechaActual() {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  return hoy.toLocaleDateString();
}