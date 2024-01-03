export const findUsers = {
    query: {
        type: 'object',
        properties: {
            userId: {
                type: 'string',
            }
        },
        required: ['userId']
    },
    headers: {
        type: 'object',
        properties: {
            Authorization: { type: 'string'},
        },
        additionalProperties: true,
    }
}