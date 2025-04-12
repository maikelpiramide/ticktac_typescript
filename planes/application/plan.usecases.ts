import { Plan } from "../domain/Plan";
import { PlanRepository } from "../domain/plan.repository";

export class PlanUseCases {

    constructor(private planRepository: PlanRepository) {}

    async getAll(): Promise<Plan[]> {
        return await this.planRepository.getAll();
    }
}