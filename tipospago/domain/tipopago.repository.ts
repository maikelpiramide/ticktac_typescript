import TipoPago from "./TipoPago";

export default interface TipoPagoRepository {
    getById(id: number): Promise<TipoPago | null>;
    getAll(): Promise<TipoPago[]>;
}