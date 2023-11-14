import { funktion } from "../src/js/businesslogic";

describe('funktion', () => {
    test("should return 'All Good!'", () => {
        expect(funktion()).toEqual("All Good!");
    });
});