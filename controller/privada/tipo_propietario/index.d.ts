export { };

declare global {
    interface Window {
        guardarDatosTipoPropietarioUpdate: () => void;
        guardarDatosTipoPropietarioDelete: () => void;
    }
}