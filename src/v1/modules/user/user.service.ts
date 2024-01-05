import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import { createUserDto } from "./dto/create.dto";

export const userService = {
	findById: async (id: string) => {
		try {
			if(!id)
				throw httpException('Id user not found.', HttpStatus.NOT_FOUND)
			return { idUser: id };
		} catch (error) {}
	},

	create: async (createUserDto: createUserDto) => {
		try {
			return {
				_id: Math.floor(Math.random() * 100),
				name: createUserDto.name,
				email: createUserDto.email,
			};
		} catch (error) {}
	},
};
