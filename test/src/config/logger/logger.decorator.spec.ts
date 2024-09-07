import { Log } from "../../../../src/config/logger/logger.decorator";

describe("Logger", () => {
	let stdoutSpy: jest.SpyInstance;

	beforeEach(() => {
		stdoutSpy = jest
			.spyOn(process.stdout, "write")
			.mockImplementation(() => true);
	});

	afterEach(() => {
		stdoutSpy.mockRestore();
	});

	describe("Log decorator", () => {
		it("should log method call and result with a custom message", async () => {
			class TestClass {
				@Log("Calling testMethod")
				public async testMethod(name: string): Promise<string> {
					return `Hello, ${name}`;
				}
			}

			const testInstance = new TestClass();
			const result = await testInstance.testMethod("World");

			expect(stdoutSpy).toHaveBeenCalledWith(
				expect.stringContaining(
					'Calling testMethod testMethod with arguments: ["World"]',
				),
			);
			expect(stdoutSpy).toHaveBeenCalledWith(
				expect.stringContaining('Method: testMethod return: "Hello, World"'),
			);
			expect(result).toBe("Hello, World");
		});

		it("should log an error when the method throws", async () => {
			class TestClass {
				@Log()
				public async testMethod() {
					throw new Error("Test error");
				}
			}

			const testInstance = new TestClass();

			await expect(testInstance.testMethod()).rejects.toThrow("Test error");

			expect(stdoutSpy).toHaveBeenCalledWith(
				expect.stringContaining("testMethod with arguments: []"),
			);
			expect(stdoutSpy).toHaveBeenCalledWith(
				expect.stringContaining("Method: testMethod Error: Test error"),
			);
		});
	});
});
