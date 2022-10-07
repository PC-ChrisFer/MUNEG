export {};

declare global {
  interface Window {
    seleccionarPropietario: () => void;
    seleccionarPropiedad: () => void;
    seleccionarEmpleado: () => void;
    seleccionarInquilino: () => void;
    guardaDatosUpdate: () => void;
    guardaDatosDelete: () => void;
    generarGrafico: () => void;
    createContratoOrdenPDF: () => void;
  }
}
