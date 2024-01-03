import { findUser } from '../controller';
import { findUsers } from '../schema';

const tags = ['v1'];

export const findUsersRoute = {
    method: 'GET',
    url: '/v1/findUsers',
    schema: {
        tags,
        summary: 'Find data of users',
        ...findUsers
    },
    handler: findUser
}