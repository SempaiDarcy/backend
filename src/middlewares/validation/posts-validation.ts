import {body} from "express-validator";
import {blogsRepository} from "../../repositories/blogs-repository";

export const postsValidation = [
    body("title")                // берём поле "title" из req.body
        .trim()                    // убираем пробелы в начале и в конце строки
        .notEmpty()                // проверяем, что строка не пустая (после trim)
        .withMessage("Invalid title") // если не прошло — вернётся эта ошибка
        .isLength({max: 30})     // проверяем, что длина ≤ 30 символов
        .withMessage("title is too long"), // если не прошло — вернётся эта ошибка
    body('shortDescription')
        .trim()
        .notEmpty().withMessage("Invalid shortDescription")
        .isLength({max: 100}).withMessage('shortDescription is too long'),
    body('content')
        .trim()
        .notEmpty().withMessage('Invalid content')
        .isLength({max: 1000}).withMessage('content is too long'),
    body("blogId")
        .trim()
        .notEmpty().withMessage("BlogId is required")
        .isString().withMessage("blogId must be a string")
        .custom((value) => {
            const blog = blogsRepository.getBlocksById(value);
            if (!blog) {
                throw new Error("Blog not found");
            }
            return true;
        }),
]