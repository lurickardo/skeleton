import userService from "./user.controller";

describe("Unit tests for user controller", () => {
	describe("findUser tests", () => {
		it("should have return correctly", async () => {
			const result = await userService.findUser({ params: { id: "1" } }, {});
			expect(result).toEqual({ idUser: "1" });
		});
	});
});
