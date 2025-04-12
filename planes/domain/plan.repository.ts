import { Plan } from "./Plan";

export interface PlanRepository {
    getAll(): Promise<Plan[]>;
}