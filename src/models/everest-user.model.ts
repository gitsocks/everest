import { SecurityContext } from "./security-context.model";

export interface EverestUser {
    securityContexts: SecurityContext[];
}