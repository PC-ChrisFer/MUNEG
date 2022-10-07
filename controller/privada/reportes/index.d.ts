export { };

declare global {
    interface Window {
        seleccionarInquilino: () => void;
        guardarDatosUpdate: () => void;
        guardarDatosDelete: () => void;
        cambiarEstadoReporte: () => void;
        createReporteReportesPDF: () => void;
    }
}