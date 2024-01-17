import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import { createUserDto } from "./dto/create.dto";

export const userService = {
	findById: async (id: string) => {
		try {
			if (!id) throw httpException("Id user not found.", HttpStatus.NOT_FOUND);
			return {
				_id: id,
				name: "Jhon Doe",
				email: "jhondoe@gmail.com",
			};
		} catch (error) {
			throw error;
		}
	},

	listAll: async () => {
		return [
			{
				_id: String(Math.floor(Math.random() * 1000)),
				name: "Jhon Doe",
				email: "jhondoe@gmail.com",
			},
			{
				_id: String(Math.floor(Math.random() * 1000)),
				name: "Foo Bar",
				email: "foobar@gmail.com",
			},
		];
	},

	create: async (createUserDto: createUserDto) => {
		try {
			if (!createUserDto)
				throw httpException("User data was not sent.", HttpStatus.BAD_REQUEST);
			return {
				_id: String(Math.floor(Math.random() * 100)),
				name: createUserDto.name,
				email: createUserDto.email,
			};
		} catch (error) {
			throw error;
		}
	},

	update: async (id: string, createUserDto: createUserDto) => {
		try {
			if (!id) throw httpException("Id user not found.", HttpStatus.NOT_FOUND);
			if (!createUserDto)
				throw httpException("User data was not sent.", HttpStatus.BAD_REQUEST);
			return {
				_id: id,
				name: createUserDto.name,
				email: createUserDto.email,
			};
		} catch (error) {
			throw error;
		}
	},

	remove: async (id: string) => {
		try {
			if (!id) throw httpException("Id user not found.", HttpStatus.NOT_FOUND);
			return { message: "User successfully removed" };
		} catch (error) {
			throw error;
		}
	},
};
