export {};

declare global {
  interface Window {
    guardarDatosDelete: () => void;
    cambiarVisibilidadDeResgistro: () =>  void;
    leerDatosEliminados: () => void;
}
}
