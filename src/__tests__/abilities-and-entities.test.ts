import { Everest } from "../everest";
import { SecurityContext } from "../models/security-context.model";
import { User } from "./__mocks__/user.model";

describe("Abilities Tests", () => {
    let user: User;

    beforeEach(() => {
        user = {
            id: "abc123",
            firstName: "Billy",
            lastName: "Anderson",
            email: "billy@example.com",
            securityContexts: []
        }
    });

    it("Expects user to be authorized with correct ability on correct entity", () => {
        // arrange
        const securityContext: SecurityContext = { abilities: ["read"], entity: "business", qualifications: [{ field: "city", value: "Pretoria" }] };
        user.securityContexts.push(securityContext);

        // act
        const result = new Everest(user).can("read").on("business").check();

        // assert
        expect(result).toBe(true);
    });

    it("Checks if user is not authorized with read ability on incorrect entity", () => {
        // arrange
        const securityContext: SecurityContext = { abilities: ["read"], entity: "driver" };
        user.securityContexts.push(securityContext);

        // act
        const result = new Everest(user).can("read").on("business").check();

        // assert
        expect(result).toBe(false);
    });

    it("Expects user to not be authorized given incorrect ability on correct entity", () => {
        // arrange
        const securityContext: SecurityContext = { abilities: ["read"], entity: "business" };
        user.securityContexts.push(securityContext);

        // act
        const result = new Everest(user).can("create").on("business").check();

        // assert
        expect(result).toBe(false);
    });

    it("Expect user to not be authorized given incorrect ability on incorrect entity", () => {
        // arrange
        const securityContext: SecurityContext = { abilities: ["read"], entity: "business" };
        user.securityContexts.push(securityContext);

        const result = new Everest(user).can("create").on("driver").check();
        expect(result).toBe(false);
    });
})