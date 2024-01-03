import userService from "./user.service";

describe("Unit tests for user service", () => {
	describe("findUser tests", () => {
		it("should have return correctly", async () => {
			const result = await userService.findUser("1");
			expect(result).toEqual({ idUser: "1" });
		});
	});
});
