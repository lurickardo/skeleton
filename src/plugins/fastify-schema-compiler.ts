const Ajv = require('ajv');

const ajvInstance = new Ajv({
  removeAdditional: true,
  coerceTypes: false,
  allErrors: true,
});

const queryStringAjvInstance = new Ajv({
  removeAdditional: true,
  coerceTypes: true,
  allErrors: true,
});

ajvInstance.addKeyword({
  keyword: 'stringIsNotEmpty',
  type: 'string',
  validate: (schema, data) => (typeof data === 'string' && data.trim() !== ''),
});

queryStringAjvInstance.addKeyword({
  keyword: 'stringIsNotEmpty',
  type: 'string',
  validate: (schema, data) => (typeof data === 'string' && data.trim() !== ''),
});

const schemaCompilers = {
  body: ajvInstance,
  params: ajvInstance,
  querystring: queryStringAjvInstance,
  headers: ajvInstance,
};

export default fastify => {
  fastify.setValidatorCompiler(req => {
    if (!req.httpPart) {
      throw new Error('Missing httpPart');
    }

    const compiler = schemaCompilers[req.httpPart];
    if (!compiler) {
      throw new Error(`Missing compiler for ${req.httpPart}`);
    }

    return compiler.compile(req.schema);
  });
};