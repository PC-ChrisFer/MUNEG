export { };

declare global {
    interface Window {
        guardarDatosTipoEmpleadoUpdate: () => void;
        guardarDatosTipoEmpleadoDelete: () => void;
        leerDatosEliminados: () => void;
        cambiarVisibilidadDeResgistro: () => void;
    }
}