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
} from "./constants/api_constant.js";
import { getElementById } from "./constants/functions.js";

// LEER REGISTROS
export async function readRows(ENDPOINT, fillrows) {
  let APIEndpoint = ENDPOINT + API_READALL;
  //Llamar a la función de conexión api para realizar fetch y then
  let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
  if (APIResponse.status == API_SUCESS_REQUEST) {
    fillrows(APIResponse.dataset)
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


//Función para generar un gráfico de barras verticales. Requiere el archivo chart.js. Para más información https://www.chartjs.org/*
//Parámetros: canvas (identificador de la etiqueta canvas), xAxis (datos para el eje X), yAxis (datos para el eje Y), legend (etiqueta para los datos) y title (título del gráfico).

export function barGraph(canvas, xAxis, yAxis, legend, title) {
  // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
  let colors = [];
  // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
  xAxis.map(() => {
    colors.push("#" + Math.random().toString(16).substring(2, 8));
  });
  // Se establece el contexto donde se mostrará el gráfico, es decir, se define la etiqueta canvas a utilizar.
  const context = getElementById(canvas).getContext("2d");
  // Se crea una instancia para generar el gráfico con los datos recibidos.
  const chart = new Chart(context, {
    type: "bar",
    data: {
      labels: xAxis,
      datasets: [
        {
          label: legend,
          data: yAxis,
          borderWidth: 1,
          backgroundColor: [
            "rgba(21.96,61.18, 64.31)",
            "rgba(1.18, 52.16, 32.94)",
            "rgba(0,125,132)",
            "rgba(56, 156, 164)",
            "rgba(104, 221, 189)",
            "rgba(3, 133, 84)",
          ],
          barPercentage: 1,
        },
      ],
    },
    options: {
      aspectRatio: 1,
      plugins: {
        title: {
          display: true,
          text: title,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      },
    },
  });
}

//Función para generar un gráfico de barras verticales. Requiere el archivo chart.js. Para más información https://www.chartjs.org/*
//Parámetros: canvas (identificador de la etiqueta canvas), xAxis (datos para el eje X), yAxis (datos para el eje Y), legend (etiqueta para los datos) y title (título del gráfico).

export function lineGraph(canvas, xAxis, yAxis, legend, title) {
  // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
  let colors = [];
  // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
  xAxis.map(() => {
    colors.push("#" + Math.random().toString(16).substring(2, 8));
  });
  // Se establece el contexto donde se mostrará el gráfico, es decir, se define la etiqueta canvas a utilizar.
  const context = getElementById(canvas).getContext("2d");
  // Se crea una instancia para generar el gráfico con los datos recibidos.
  const chart = new Chart(context, {
    type: "line",
    data: {
      labels: xAxis,
      datasets: [
        {
          label: legend,
          data: yAxis,
          borderColor: "#AE4747",
          borderWidth: 1,
          backgroundColor: [
            "rgba(21.96,61.18, 64.31)",
            "rgba(1.18, 52.16, 32.94)",
            "rgba(0,125,132)",
            "rgba(56, 156, 164)",
            "rgba(104, 221, 189)",
            "rgba(3, 133, 84)",
          ],
          barPercentage: 1,
        },
      ],
    },
    options: {
      aspectRatio: 1,
      plugins: {
        title: {
          display: true,
          text: title,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      },
    },
  });
}

//Función para generar un gráfico de pastel. Requiere el archivo chart.js. Para más información https://www.chartjs.org/
//Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).

export function pieGraph(canvas, legends, values, title) {
  // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
  let colors = [];
  // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
  values.map(() => {
    colors.push("#" + Math.random().toString(16).substring(2, 8));
  });
  // Se establece el contexto donde se mostrará el gráfico, es decir, se define la etiqueta canvas a utilizar.
  const context = document.getElementById(canvas).getContext("2d");
  // Se crea una instancia para generar el gráfico con los datos recibidos.
  const chart = new Chart(context, {
    type: "pie",
    data: {
      labels: legends,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "rgba(21.96,61.18, 64.31)",
            "rgba(1.18, 52.16, 32.94)",
            "rgba(0,125,132)",
            "rgba(56, 156, 164)",
            "rgba(104, 221, 189)",
            "rgba(3, 133, 84)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
    },
  });
}

//Función para generar un gráfico de dona. Requiere el archivo chart.js. Para más información https://www.chartjs.org/
//Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).

export function doughnutGraph(canvas, legends, values, title) {
  // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
  let colors = [];
  // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
  values.map(() => {
    colors.push("#" + Math.random().toString(16).substring(2, 8));
  });
  // Se establece el contexto donde se mostrará el gráfico, es decir, se define la etiqueta canvas a utilizar.
  const context = getElementById(canvas).getContext("2d");
  // Se crea una instancia para generar el gráfico con los datos recibidos.
  const chart = new Chart(context, {
    type: "doughnut",
    data: {
      labels: legends,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "rgba(21.96,61.18, 64.31)",
            "rgba(1.18, 52.16, 32.94)",
            "rgba(0,125,132)",
            "rgba(56, 156, 164)",
            "rgba(104, 221, 189)",
            "rgba(3, 133, 84)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
    },
  });
}

//Función para generar un gráfico de dona. Requiere el archivo chart.js. Para más información https://www.chartjs.org/
//Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).

export function polarAreaGraph(canvas, legends, values, title) {
  // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
  let colors = [];
  // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
  values.map(() => {
    colors.push("#" + Math.random().toString(16).substring(2, 8));
  });
  // Se establece el contexto donde se mostrará el gráfico, es decir, se define la etiqueta canvas a utilizar.
  const context = getElementById(canvas).getContext("2d");
  // Se crea una instancia para generar el gráfico con los datos recibidos.
  const chart = new Chart(context, {
    type: "polarArea",
    data: {
      labels: legends,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "rgba(21.96,61.18, 64.31)",
            "rgba(1.18, 52.16, 32.94)",
            "rgba(0,125,132)",
            "rgba(56, 156, 164)",
            "rgba(104, 221, 189)",
            "rgba(3, 133, 84)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
    },
  });
}


// SE TIENE QUE PASAR EL HTML QUE SE QUIERE IMPRIMIR A PDF
export async function generatePDF(stingHTML, nombreReporte) {
  console.log("rxr");
  let APIEndpointCreatePDF = SERVER + "privada/pdf.php?action=create_pdf";
  // OPCIONES PARA LA GENERACION DE EL PDF
  var opt = {
    margin: 0.5,
    filename: "Reporte.pdf",
    image: { type: "jpeg", quality: 1 },
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
        pdf.addImage(
          "../../resources/img/navbar_publico/logoCut.png",
          "jpeg",
          pdf.internal.pageSize.getWidth() - 1.1,
          pdf.internal.pageSize.getHeight() - 1.25,
          1,
          1
        );
      }
    })
    .outputPdf("arraybuffer");

  // CONVIRTIENDO "BUFFER" A "BLOB"
  const blob = new Blob([buffer]);

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