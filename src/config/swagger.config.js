export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Nodejs-Starter-Template API',
      version: '1.0.0',
      description:
        'The API documentation of a boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Bahrican Yesil',
        url: 'https://github.com/bahricanyesil',
        email: 'bahricanyesil@gmail.com',
      },
    },
    basePath: '/api',
    servers: [
      {
        url: 'http://localhost:3000/api/',
      },
    ],
  },
  tags: [
    {
      name: 'Auth',
      description: 'API for authorization',
    },
    {
      name: 'User',
      description: 'API for users',
    },
    {
      name: 'Recipes',
      description: 'API for recipes',
    },
    {
      name: 'Ingredients',
      description: 'API for ingredients',
    },
    {
      name: 'Categories',
      description: 'API for categories',
    },
  ],
  apis: [
    'src/models/*.js',
    'src/utils/helpers/*.js',
    'src/api/controllers/auth/*.js',
    'src/api/controllers/user/*.js',
    'src/api/controllers/recipes/*.js',
  ],
};
