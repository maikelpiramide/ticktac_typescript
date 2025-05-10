import Estado from "../domain/Estado";
import EstadoRepository from "../domain/estado.repository";

export default class EstadoUseCases {
    constructor(private readonly estadoRepository: EstadoRepository) {}

    async getAll(): Promise<Estado[]> {
        return await this.estadoRepository.getAll();
    }
}