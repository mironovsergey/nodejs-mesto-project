import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mesto API',
      version: '1.0.0',
      description: 'API для приложения Mesto - сервиса обмена фотографиями интересных мест',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.mesto.stackra.ru',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Введите JWT токен, полученный при авторизации',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Требуется авторизация',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Требуется авторизация',
                  },
                },
              },
            },
          },
        },
        BadRequestError: {
          description: 'Некорректный запрос',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Некорректные данные',
                  },
                },
              },
            },
          },
        },
        NotFoundError: {
          description: 'Ресурс не найден',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Ресурс не найден',
                  },
                },
              },
            },
          },
        },
        ForbiddenError: {
          description: 'Доступ запрещен',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Доступ запрещен',
                  },
                },
              },
            },
          },
        },
        ConflictError: {
          description: 'Конфликт запроса',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Email уже используется',
                  },
                },
              },
            },
          },
        },
        InternalServerError: {
          description: 'Ошибка сервера',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Ошибка сервера',
                  },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Аутентификация и регистрация',
      },
      {
        name: 'Users',
        description: 'Операции с пользователями',
      },
      {
        name: 'Cards',
        description: 'Операции с карточками',
      },
    ],
  },
  apis: ['./src/docs/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
