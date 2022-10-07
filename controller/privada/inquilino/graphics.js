
import { APIConnection } from "../../APIConnection.js";
import { pieGraph } from "../../components.js";
import { API_SUCESS_REQUEST, POST_METHOD, SERVER } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

const API_INQUILINO = SERVER + "privada/inquilino.php?action=";

// Función para crear el grafico que, "La cantidad  de inquilinos por municipio segun el departamento"
export async function graphPieInquilinoDepartamento(id_departamento) {
    //Creo un formData para los parametros
    let parameters = new FormData();
    //Inserto el id_producto a los parametros
    parameters.append("id_departamento", id_departamento);
    //Obtener los datos del grafico
    //Crear endpoint
    let APIEndpoint = API_INQUILINO + "graphInquilino2";
    //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
    let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);
    //Se verifica si la consulta retorna un valor positivo
    if (APIResponse.status == API_SUCESS_REQUEST) {
      // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
      if (APIResponse.status) {
        // Se declaran los arreglos para guardar los datos a gráficar.
        let municipio = [];
        let num_inquilino = [];
        // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
        APIResponse.dataset.map(function (row) {
          // Se agregan los datos a los arreglos.
          municipio.push(row.municipio);
          num_inquilino.push(row.count);
        });
        getElementById('graph_contrato').innerHTML = '<canvas id="chartInquilino" style="background-color: white; border-radius: 20px"></canvas>'
        // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
        pieGraph(
          "chartInquilino",
          municipio,
          num_inquilino,
          "La cantidad  de inquilinos por municipio segun el departamento."
        );
      } else {
        console.log(response.exception);
      }
    }
  }
  