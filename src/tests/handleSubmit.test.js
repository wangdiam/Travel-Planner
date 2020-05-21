import { handleSubmit } from "../client/js/handleSubmit";

describe('Form Handler Test', () => {
    it('Returns true if handleSubmit exists', () => {
        expect(handleSubmit).toBeDefined();
    });
})