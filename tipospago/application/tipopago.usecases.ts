import TipoPago from "../domain/TipoPago";
import TipoPagoRepository from "../domain/tipopago.repository";

export default class TipoPagoUseCases {
    constructor(private readonly tipoPagoRepository: TipoPagoRepository) {}

    async getTipoPagoById(id: number): Promise<TipoPago | null> {
        return await this.tipoPagoRepository.getById(id);
    }

    async getAllTiposPago(): Promise<TipoPago[]> {
        return await this.tipoPagoRepository.getAll();
    }
}