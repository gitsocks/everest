import { Qualification } from "./qualification.model";

export interface SecurityContext {
    abilities: string[];
    entity: string;
    qualifications?: Qualification[]
}