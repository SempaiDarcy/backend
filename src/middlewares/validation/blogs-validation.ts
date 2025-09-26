import {body} from "express-validator";

export const blogsValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Invalid name')
        .isLength({max: 15}).withMessage('name is too long'),
    body('description')
        .trim()
        .notEmpty().withMessage('Invalid description')
        .isLength({max: 500}).withMessage('description is too long'),
    body('websiteUrl')
        .trim()
        .notEmpty().withMessage('Invalid websiteUrl')
        .isLength({max: 100}).withMessage('websiteUrl is too long')
        .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
        .withMessage('websiteUrl does not match the template')
    // matches(regex) — встроенная проверка по регулярному выражению.
    // .withMessage(...) сразу прикрепляет ошибку, если строка не соответствует шаблону.
]