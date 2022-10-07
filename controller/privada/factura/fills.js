//@ts-check 
import { APIConnection } from "../../APIConnection.js";
import { pieGraph } from "../../components.js";
import { showErrorModal } from "../../components/htmlComponents.js";
import { SERVER, GET_METHOD, API_SUCESS_REQUEST, POST_METHOD } from "../../constants/api_constant.js";
import { getElementById } from "../../constants/helpers.js";

const API_FACTURA = SERVER + "privada/factura.php?action=";

//Obtener los datos de combobox tipo empleado
export async function fillComboBoxInquilino() {
    let APIEndpoint = SERVER + "privada/factura.php?action=readInquilino";
    let APIResponse = await APIConnection(APIEndpoint, GET_METHOD, null);
    APIResponse.dataset.map((element) => {
      //Cargar los datos obtenidos de la consulta                
      getElementById("id_inquilino").innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
    });
    APIResponse.dataset.map((element) => {
      //Cargar los datos obtenidos de la consulta                
      getElementById("id_inquilino_update").innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
    });
    APIResponse.dataset.map((element) => {
      //Cargar los datos obtenidos de la consulta                
      getElementById("cmb_inquilino").innerHTML += `<option value="${element.id_inquilino}" > ${element.nombre} </option>`;
    });
  }
  
  export function fillTableFactura(dataset) {
    let content = "";
    dataset.map((row) => {
      content += ` 
                <tr>  
                    <td>${row.codigo_factura}</td>
                    <td>${row.descripcion}</td> 
                    <td>${row.direccion}</td> 
                    <td>${row.subtotal}</td> 
                    <td>${row.IVA}</td> 
                    <td>${row.venta_gravada}</td> 
                    <td>${row.fecha}</td> 
                    <td>${row.id_inquilino}</td> 
  
                    <td class="d-flex justify-content-center">
                        <div class="btn-group" role="group">
                            <form method="post" id="read-one">
                                <a onclick="guardarDatosUpdate(${row.id_factura},'${row.codigo_factura}', '${row.descripcion}', '${row.direccion}', '${row.subtotal}', '${row.IVA}', '${row.venta_gravada}', '${row.fecha}', '${row.id_inquilino}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
                                <img src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                                <a  onclick="guardarDatosDelete(${row.id_factura})"  class="btn edit_add_deleteButtons delete"  id="button_ver_mas"  
                                name="search" >
                                <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
                                <a onclick="generarReporteFactura(${row.id_factura})" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">generar reporte</a>
                                </form>
                        </div>
                    </td>
                </tr>
            `;
    });
    // Se muestran cada filas de los registros
    getElementById("tbody-Factura").innerHTML = content;
  }

  
export async function graphPieFacturaInquilino(id_inquilino) {
    let parameters = new FormData();
    parameters.append("id_inquilino", id_inquilino);

    let APIEndpoint = API_FACTURA + "graphFactura";
    let APIResponse = await APIConnection(APIEndpoint, POST_METHOD, parameters);

    if (APIResponse.status == API_SUCESS_REQUEST) {
      if (APIResponse.status) {

        let nombre_estado  = [];
        let num_factura = [];
        APIResponse.dataset.map(function (row) {
          // Se agregan los datos a los arreglos.
          nombre_estado.push(row.nombre_estado);
          num_factura.push(row.count);
        });

        getElementById('graph_contrato').innerHTML =
        '<canvas id="chartFactura" style="background-color: white; border-radius: 20px"></canvas>'
        pieGraph(
          "chartFactura",
          nombre_estado,
          num_factura,
          "Cantidad de Facturas emitidas a un inquilino ."
        );
      } else {
        showErrorModal(APIResponse.exception)
      }
    }
  }
  