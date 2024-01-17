import { userService } from "./user.service";

describe("Unit tests for user service", () => {
	describe("findById", () => {
		it("should have return correctly", async () => {
			const result = await userService.findById("1");
			expect(result).toEqual({
				_id: "1",
				name: "Jhon Doe",
				email: "jhondoe@gmail.com",
			});
		});

		it("should return error becose no have id", async () => {
			const forceError: any = null;
			try {
				await userService.findById(forceError);
			} catch (error) {
				expect(error).toHaveProperty("statusCode", 404);
				expect(error).toHaveProperty("message", "Id user not found.");
			}
		});
	});

	describe("create", () => {
		it("should have return correctly", async () => {
			const result = await userService.create({ name: "foo", email: "bar" });
			expect(result).toBeInstanceOf(Object);
			expect(result).toHaveProperty("name");
			expect(result).toHaveProperty("email");
		});

		it("should return error becose no have userDto", async () => {
			try {
				const forceError: any = null;
				await userService.create(forceError);
			} catch (error) {
				expect(error).toHaveProperty("statusCode", 400);
				expect(error).toHaveProperty("message", "User data was not sent.");
			}
		});
	});
});
