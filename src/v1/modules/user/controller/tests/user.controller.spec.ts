import userService from "../user.controller";

const request = { params: { id: "1" } };
const reply = {
	code: jest.fn().mockReturnThis(),
	send: jest.fn(),
};

describe("Unit tests for user controller", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("findUser tests", () => {
		it("should return correctly", async () => {
			const result = await userService.findUser(request, reply);
			expect(result).toEqual({ idUser: "1" });
		});
	});
});
