import { getElementById } from "../../constants/helpers.js";

//Función (ReadAll) llenar las tablas de información
export function fillTableCategoria(dataset) {
  //Se define el contenido html
  let content = "";
  //Se llenan los elementos con la información proporcionada por la base de datos
  dataset.map((row) => {
    //El cuerpo del elemento html
    content += ` 
              <tr>
                  <td>${row.id_categoria}</td>  
                  <td>${row.nombre_categoria}</td>
                  <td>${row.visibilidad}</td> 
                  
                  <td class="d-flex justify-content-center">
                      <div class="btn-group" role="group">
                          <form method="post" id="read-one">
                              <a onclick="guardarDatosUpdate(${row.id_categoria},'${row.nombre_categoria}')" class="btn edit_add_deleteButtons edit"  id="button_ver_mas">
                                  <img src="../../resources/img/iconos_formularios/edit_icon.png"   style="width: 35px; height: 35px;"></a>
                              <a  onclick="guardarDatosDelete(${row.id_categoria})"  class="btn edit_add_deleteButtons delete"  id="button_ver_mas"
                              name="search">
                                  <img src="../../resources/img/iconos_formularios/trash_icon.png" style="width: 35px; height: 35px;"></a>
                          </form>
                      </div>
                  </td>
              </tr>
          `;
  });

  //Se escribe el id del contendor que se quiere llenar con el elemento html
  getElementById("tbody-Categoria").innerHTML = content;
}
