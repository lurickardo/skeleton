import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import { createUserDto } from "./dto/create.dto";

export const userService = {
	findById: async (id: string) => {
		try {
			if (!id) throw httpException("Id user not found.", HttpStatus.NOT_FOUND);
			return { idUser: id };
		} catch (error) {
			throw error;
		}
	},

	create: async (createUserDto: createUserDto) => {
		try {
			if (!createUserDto)
				throw httpException("User data was not sent.", HttpStatus.BAD_REQUEST);
			return {
				_id: Math.floor(Math.random() * 100),
				name: createUserDto.name,
				email: createUserDto.email,
			};
		} catch (error) {
			throw error;
		}
	},
};
