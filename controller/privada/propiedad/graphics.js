
import { APIConnection } from "../../APIConnection.js";
import { doughnutGraph } from "../../components.js";
import { showErrorModal } from "../../components/htmlComponents.js";
import { API_SUCESS_REQUEST, GET_METHOD, POST_METHOD, SERVER } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

const API_PROPIEDAD = SERVER + "privada/propiedad.php?action=";


// Función para crear el grafico que, "Productos mejor valorados, según las calificaciones de clientes"
export async function graphDoughnutPropiedadPropietario(id_propietario) {
  //Creo un formData para los parametros
  let parameters = new FormData();
  //Inserto el id_producto a los parametros
  parameters.append("id_propietario", id_propietario);
  //Obtener los datos del grafico
  //Crear endpoint
  let APIEndpoint = API_PROPIEDAD + "graphPropiedadPropietario";
  //Se realiza la consulta con el endpoint, el metodo "get" y no requiere parametros
  let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);
  //Se verifica si la consulta retorna un valor positivo
  if (APIResponse.status == API_SUCESS_REQUEST) {
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (APIResponse.status) {
      // Se declaran los arreglos para guardar los datos a gráficar.
      let departamento = [];
      let num_propiedades = [];
      // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
      APIResponse.dataset.map(function (row) {
        // Se agregan los datos a los arreglos.
        departamento.push(row.departamento);
        num_propiedades.push(row.count);
      });
      getElementById("graph_contrato").innerHTML =
        '<canvas id="chartPropiedadPropietario" style="background-color: white; border-radius: 20px"></canvas>';
      // Se llama a la función que genera y muestra un gráfico de pastel. Se encuentra en el archivo components.js
      doughnutGraph(
        "chartPropiedadPropietario",
        departamento,
        num_propiedades,
        "Las propiedades en diferentes departamentos segun el propietario."
      );
    } else {
      showErrorModal(response.exception)
    }
  }
}
