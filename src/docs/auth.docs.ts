/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Авторизация пользователя
 *     description: >
 *       Аутентификация пользователя по email и паролю.
 *       Возвращает JWT токен для доступа к защищенным маршрутам.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         description: Неверная почта или пароль
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Неверная почта или пароль
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /signup:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Создает нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *           examples:
 *             minimal:
 *               summary: Минимальные данные
 *               value:
 *                 email: user@example.com
 *                 password: StrongPassword123!
 *             full:
 *               summary: Полные данные
 *               value:
 *                 name: Жак-Ив Кусто
 *                 about: Исследователь
 *                 avatar: https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png
 *                 email: ivan@example.com
 *                 password: StrongPassword123!
 *     responses:
 *       201:
 *         description: Пользователь создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Некорректные данные или пароль не соответствует требованиям безопасности
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пароль не соответствует требованиям безопасности
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

export {};
