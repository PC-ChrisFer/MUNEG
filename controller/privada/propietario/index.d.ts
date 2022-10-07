export {};

declare global {
  interface Window {
    guardarDatosUpdate: () => void;
    cambiarEstadoTipoPropiedad: () => void;
  }
}
