//@ts-check
import { getElementById } from "../../constants/helpers.js";
//Metodo para llenar las tablas de datos, utiliza la función readRows()
export function fillTableTipoEmpleado(dataset) {
    let content = "";
    dataset.map((row) => {
        content += ` 
            <tr>  
                <td>${row.nombre_tipo}</td>
                <td>${row.visibilidad}</td> 
                
                <td class="d-flex justify-content-center">
                    <div class="btn-group" role="group">
                            <a onclick="guardarDatosTipoEmpleadoUpdate('${row.id_tipo_empleado}', '${row.nombre_tipo}', '${row.visibilidad}')" class="btn edit_add_deleteButtons edit"   id="button_ver_mas">
                                <img src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                            <a  onclick="guardarDatosTipoEmpleadoDelete('${row.id_tipo_empleado}')"  class="btn edit_add_deleteButtons delete"   id="button_ver_mas"  
                            name="search">
                                <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
                    </div>
                </td>
            </tr>
        `;
    });
    // Se muestran cada filas de los registros
    getElementById("tbody-TipoEmpleado").innerHTML = content;
}