import { Logger } from "../../../../src/config/logger/logger.decorator";

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
		it("should log method call and result", async () => {
			class TestClass {
				// @ts-ignore: bug of decorators in typescript
				@Logger.Log
				public async testMethod(name: string): Promise<string> {
					return `Hello, ${name}`;
				}
			}

			const testInstance = new TestClass();
			const result = await testInstance.testMethod("World");

			expect(stdoutSpy).toHaveBeenCalledWith(
				expect.stringContaining('Calling testMethod with arguments: ["World"]'),
			);
			expect(stdoutSpy).toHaveBeenCalledWith(
				expect.stringContaining('Result: "Hello, World"'),
			);
			expect(result).toBe("Hello, World");
		});

		it("should log an error when the method throws", async () => {
			class TestClass {
				// @ts-ignore: bug of decorators in typescript
				@Logger.Log
				public async testMethod() {
					throw new Error("Test error");
				}
			}

			const testInstance = new TestClass();

			await expect(testInstance.testMethod()).rejects.toThrow("Test error");

			expect(stdoutSpy).toHaveBeenCalledWith(
				expect.stringContaining("Calling testMethod with arguments: []"),
			);
			expect(stdoutSpy).toHaveBeenCalledWith(
				expect.stringContaining("Error: Error: Test error"),
			);
		});
	});
});
