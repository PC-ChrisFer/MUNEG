//@ts-check
import { APIConnection } from "../APIConnection.js";
import { getElementById } from "../constants/functions.js";
import {
  POST_METHOD,
  GET_METHOD,
  SERVER,
  API_CREATE,
  API_REGISTRAR_CLIENTE_USER
} from "../constants/api_constant.js";
import { saveRow } from "../components.js";

// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_CLIENTE = SERVER + "publica/cliente.php?action=";

