export {};

declare global {
  interface Window {
    seleccionarTipoEmpleado: () => void;
    seleccionarEstadoEmpleado: () =>  void;
    guardarDatosEmpleadoUpdate: () => void;
    guardarDatosinquilinoEliminar: () => void;
}
}
