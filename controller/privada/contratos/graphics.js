
import { APIConnection } from "../../APIConnection.js";
import { barGraph } from "../../components.js";
import { API_SUCESS_REQUEST, POST_METHOD, SERVER } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

const API_CONTRATO = SERVER + "privada/contrato.php?action=";

// Función para crear el grafico que, "La cantidad de firmas realizada por los empleados durante un periodo de tiempo"
export async function graphBarContrato(fecha_firma_i, fecha_firma_f) {
    //Creo un formData para los parametros
    let parameters = new FormData();
    //Inserto el id_producto a los parametros
    parameters.append("fecha_firma", fecha_firma_i);
    parameters.append("fecha_firma_final", fecha_firma_f);
    //Obtener los datos del grafico
    //Crear endpoint
    let APIEndpoint = API_CONTRATO + "graphContrato2";
    //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
    let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);
    //Se verifica si la consulta retorna un valor positivo
    if (APIResponse.status == API_SUCESS_REQUEST) {
      // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
      if (APIResponse.status) {
        // Se declaran los arreglos para guardar los datos a gráficar.
        let nombre_empleado = [];
        let num_empleado = [];
        // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
        APIResponse.dataset.map(function (row) {
          // Se agregan los datos a los arreglos.
          nombre_empleado.push(row.concat);
          num_empleado.push(row.count);
        });
        getElementById('graph_contrato').innerHTML = '<canvas id="chartContrato2" style="background-color: white; border-radius: 20px"></canvas>'
        // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
        barGraph(
          "chartContrato2",
          nombre_empleado,
          num_empleado,
          "Número de Firmas.",
          "La cantidad de firmas realizada por los empleados durante un periodo de tiempo."
        );
      } else {
        console.log(response.exception);
      }
    }
  }