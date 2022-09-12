export {};

declare global {
  interface Window {
    guardarDatosUpdate: () => string  | void;
  }
}