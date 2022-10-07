export {};

declare global {
  interface Window {
    selectIdCategoria: () => void;
    guardarDatosUpdate: () =>  void;
    guardarDatosDelete: () => void;
    leerDatosEliminados: () => void;
    cambiarVisibilidadDeResgistro: () => void;
    generarReporteTipoPropiedad: () => void;
}
}