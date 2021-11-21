import { Everest } from "../everest";
import { SecurityContext } from "../models/security-context.model";
import { User } from "./__mocks__/user.model";

describe("Qualifications Tests", () => {
    let user: User;

    beforeEach(() => {
        user = {
            id: "abc123",
            firstName: "Billy",
            lastName: "Anderson",
            email: "billy@example.com",
            securityContexts: []
        };
    });

    it("Expects user to be authorized with correct qualifications", () => {
        // arrange
        const securityContext: SecurityContext = {
            abilities: ["read"],
            entity: "business",
            qualifications: [
                { field: "city", value: "Pretoria" }
            ]
        };
        user.securityContexts.push(securityContext);

        // act
        const result = new Everest(user).can("read").on("business").with([
            { field: "city", value: "Pretoria"}
        ]).check();

        // assert
        expect(result).toBe(true);
    });

    it("Expects user to be unauthorized with incorrect qualifications", () => {
        // arrange
        const securityContext: SecurityContext = {
            abilities: ["read"],
            entity: "business",
            qualifications: [
                { field: "city", value: "Johannesburg" }
            ]
        }
        user.securityContexts.push(securityContext);

        // act
        const result = new Everest(user).can("read").on("business").with([
            { field: "city", value: "Pretoria" }
        ]).check();

        // assert
        expect(result).toBe(false);
    });

    it("Expects user to be authorized with multiple correct qualifications", () => {
        // arrange
        const securityContext: SecurityContext = {
            abilities: ["read"],
            entity: "business",
            qualifications: [
                { field: "city", value: "Pretoria" },
                { field: "industry", value: "Paper" }
            ]
        }
        user.securityContexts.push(securityContext);

        // act
        const result = new Everest(user).can("read").on("business").with([
            { field: "city", value: "Pretoria" },
            { field: "industry", value: "Paper" }
        ]).check();

        // assert
        expect(result).toBe(true);
    });

    it("Expects user to be unauthorized with one correct qualification and one incorrect qualification", () => {
        // arrange
        const securityContext: SecurityContext = {
            abilities: ["read"],
            entity: "business",
            qualifications: [
                { field: "city", value: "Pretoria" },
                { field: "industry", value: "Automotive" }
            ]
        }
        user.securityContexts.push(securityContext);

        // act
        const result = new Everest(user).can("read").on("business").with([
            { field: "city", value: "Pretoria" },
            { field: "industry", value: "Paper" }
        ]).check();

        // assert
        expect(result).toBe(false);
    });

    it("Expects user to be authorized with correct qualifications", () => {
        // arrange
        const securityContext: SecurityContext = {
            abilities: ["read", "create"],
            entity: "driver",
            qualifications: [
                { field: "location", value: "Pretoria" },
                { field: "motorcycle", value: "Suzuki" }
            ]
        };
        user.securityContexts.push(securityContext);

        // act
        const result = new Everest(user).can("read").on("driver").with([
            { field: "location", value: "Pretoria" },
            { field: "motorcycle", value: "Honda" }
        ]).check();

        // assert
        expect(result).toBe(true);
    });
});