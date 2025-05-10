import Estado from "./Estado";

export default interface EstadoRepository {
    getAll(): Promise<Estado[]>;
}