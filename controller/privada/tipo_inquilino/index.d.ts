export { };

declare global {
    interface Window {
        guardarDatosTipoInquilinoUpdate: () => void;
        guardarDatosTipoInquilinoDelete: () => void;
        leerDatosEliminados: () => void;
        cambiarVisibilidadDeResgistro: () => void;
    }
}