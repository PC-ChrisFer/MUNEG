export {};

declare global {
  interface Window {
    seleccionarEstadoinquilino: () => void;
    seleccionarTipoinquilino: () => void;

    selectDepartamento: () => void;
    guardarDatosEliminar: () => void;
  }
}
