//src\app_front\sessionstorage.ts

/**
 * Clase para manejar el sessionStorage de forma segura
 * Proporciona métodos para verificar la disponibilidad, leer, guardar, eliminar y limpiar datos.
 */
export class StorageService {
    /**
     * Verifica si el sessionStorage está disponible
     */
    private static isAvailable(): boolean {
        return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
    }

    /**
     * Verifica si existe una clave en el sessionStorage
     * @param key Clave a verificar
     * @returns true si la clave existe, false en caso contrario
     */
    public static exist(key: string): boolean {
        return this.isAvailable() ? sessionStorage.getItem(key) !== null : false;
    }

    /**
     * Lee un valor del sessionStorage
     * @param key Clave a leer
     * @returns El valor almacenado o null si no existe
     */
    public static read(key: string): string | null {
        return this.isAvailable() ? sessionStorage.getItem(key) : null;
    }

    /**
     * Guarda un valor en el sessionStorage
     * @param key Clave bajo la cual se guardará el valor
     * @param value Valor a guardar
     */
    public static save(key: string, value: string): void {
        if (this.isAvailable()) {
            sessionStorage.setItem(key, value);
        }
    }

    /**
     * Elimina un valor del sessionStorage
     * @param key Clave a eliminar
     */
    public static remove(key: string): void {
        if (this.isAvailable()) {
            sessionStorage.removeItem(key);
        }
    }

    /**
     * Limpia todo el sessionStorage
     */
    public static clear(): void {
        if (this.isAvailable()) {
            sessionStorage.clear();
        }
    }
}