import { Greeter } from "../index";

test("Greeter", () => {
    expect(Greeter("Billy")).toBe("Hello Billy!");
})