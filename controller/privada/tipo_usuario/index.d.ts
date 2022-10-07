export {};

declare global {
  interface Window {
    guardarDatosUpdate: () => void;
    guardarDatosDelete: () =>  void;
    leerDatosEliminados: () => void;
    cambiarVisibilidadDeResgistro: () => void;
}
}