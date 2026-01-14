/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - about
 *         - avatar
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: ID пользователя
 *           example: 507f1f77bcf86cd799439011
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 30
 *           description: Имя пользователя
 *           example: Жак-Ив Кусто
 *         about:
 *           type: string
 *           minLength: 2
 *           maxLength: 200
 *           description: Информация о пользователе
 *           example: Исследователь
 *         avatar:
 *           type: string
 *           format: uri
 *           description: Ссылка на аватар
 *           example: https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png
 *         email:
 *           type: string
 *           format: email
 *           description: Email пользователя
 *           example: user@example.com
 *
 *     UserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 30
 *           description: Имя пользователя
 *           example: Жак-Ив Кусто
 *         about:
 *           type: string
 *           minLength: 2
 *           maxLength: 200
 *           description: Информация о пользователе
 *           example: Исследователь
 *         avatar:
 *           type: string
 *           format: uri
 *           description: Ссылка на аватар
 *           example: https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png
 *         email:
 *           type: string
 *           format: email
 *           description: Email пользователя
 *           example: newuser@example.com
 *         password:
 *           type: string
 *           description: Пароль пользователя (должен соответствовать требованиям безопасности)
 *           example: StrongPassword123!
 *
 *     UpdateUser:
 *       type: object
 *       required:
 *         - name
 *         - about
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 30
 *           description: Новое имя пользователя
 *           example: Жак-Ив Кусто
 *         about:
 *           type: string
 *           minLength: 2
 *           maxLength: 200
 *           description: Новая информация о пользователе
 *           example: Исследователь морских глубин
 *
 *     UpdateAvatar:
 *       type: object
 *       required:
 *         - avatar
 *       properties:
 *         avatar:
 *           type: string
 *           format: uri
 *           description: Новая ссылка на аватар
 *           example: https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png
 *
 *     Card:
 *       type: object
 *       required:
 *         - name
 *         - link
 *         - owner
 *       properties:
 *         _id:
 *           type: string
 *           description: ID карточки
 *           example: 507f1f77bcf86cd799439012
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 30
 *           description: Название места
 *           example: Озеро Байкал
 *         link:
 *           type: string
 *           format: uri
 *           description: Ссылка на изображение
 *           example: https://img.freepik.com/free-photo/frozen-lake-baikal_23-2151956322.jpg
 *         owner:
 *           type: string
 *           description: ID владельца карточки
 *           example: 507f1f77bcf86cd799439011
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: Массив ID пользователей, поставивших лайк
 *           example: ["507f1f77bcf86cd799439013", "507f1f77bcf86cd799439014"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания карточки
 *           example: 2026-01-13T12:00:00.000Z
 *
 *     CardInput:
 *       type: object
 *       required:
 *         - name
 *         - link
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 30
 *           description: Название места
 *           example: Камчатка
 *         link:
 *           type: string
 *           format: uri
 *           description: Ссылка на изображение
 *           example: https://img.freepik.com/free-photo/panoramic-view-iceberg-clouds-antarctica_181624-33359.jpg
 *
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email пользователя
 *           example: user@example.com
 *         password:
 *           type: string
 *           description: Пароль пользователя
 *           example: Password123!
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT токен для авторизации
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Сообщение о результате операции
 *           example: Карточка удалена
 */

export {};
