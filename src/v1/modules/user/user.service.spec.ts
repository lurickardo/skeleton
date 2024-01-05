import { userService } from "./user.service";

describe("Unit tests for user service", () => {
	describe("findById tests", () => {
		it("should have return correctly", async () => {
			const result = await userService.findById("1");
			expect(result).toEqual({ idUser: "1" });
		});
	});
	

	describe("create tests", () => {
		it("should have return correctly", async () => {
			const result = await userService.create({name: 'foo', email: 'bar'});
			expect(result).toBeInstanceOf(Object)
			expect(result).toHaveProperty('name')
			expect(result).toHaveProperty('email')
		});
	});
});
