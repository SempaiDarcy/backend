import {Request, Response, Router} from "express";
import {ResolutionType, videosRepository} from "../repositories/videos-repository";

export const videosRouter = Router({});

videosRouter.get('/', (req: Request, res: Response) => {
    const videos = videosRepository.getVideos()
    res.send(videos)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const video = videosRepository.getVideoById(id)
    if (video) {
        res.status(200).send(video);
    } else res.sendStatus(404)
})
videosRouter.post('/', (req: Request, res: Response) => {
    const { title, author, availableResolutions } = req.body;

    const errorsMessages: { message: string; field: string }[] = [];

    if (!title?.trim()) {
        errorsMessages.push({ message: "Invalid title", field: "title" });
    } else if (title.length > 40) {
        errorsMessages.push({ message: "Title length should not exceed 40 characters", field: "title" });
    }
    if (!author?.trim()) {
        errorsMessages.push({ message: "Invalid author", field: "author" });
    } else if (author.length > 20) {
        errorsMessages.push({ message: "Author length should not exceed 20 characters", field: "author" });
    }

    if (
        !Array.isArray(availableResolutions) ||
        !availableResolutions.length ||
        !availableResolutions.every(r => Object.values(ResolutionType).includes(r))
    ) {
        errorsMessages.push({ message: "Invalid availableResolutions", field: "availableResolutions" });
    }

    if (errorsMessages.length) {
        return res.status(400).send({ errorsMessages });
    }

    const newVideo = videosRepository.createNewVideo(title, author, availableResolutions);
    return res.status(201).send(newVideo);
});
videosRouter.put('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;

    const errorsMessages: { message: string; field: string }[] = [];

    if (typeof title !== 'string' || !title.trim()) {
        errorsMessages.push({ message: "Invalid title", field: "title" });
    } else if (title.length > 40) {
        errorsMessages.push({ message: "Title length should not exceed 40 characters", field: "title" });
    }

    if (typeof author !== 'string' || !author.trim()) {
        errorsMessages.push({ message: "Invalid author", field: "author" });
    } else if (author.length > 20) {
        errorsMessages.push({ message: "Author length should not exceed 20 characters", field: "author" });
    }

    if (
        !Array.isArray(availableResolutions) ||
        !availableResolutions.length ||
        !availableResolutions.every(r => Object.values(ResolutionType).includes(r))
    ) {
        errorsMessages.push({ message: "Invalid availableResolutions", field: "availableResolutions" });
    }

    if (typeof canBeDownloaded !== 'boolean') {
        errorsMessages.push({ message: "Invalid canBeDownloaded", field: "canBeDownloaded" });
    }

    if (
        minAgeRestriction !== null &&
        (typeof minAgeRestriction !== 'number' || minAgeRestriction < 1 || minAgeRestriction > 18)
    ) {
        errorsMessages.push({ message: "Invalid minAgeRestriction", field: "minAgeRestriction" });
    }

    if (publicationDate && isNaN(Date.parse(publicationDate))) {
        errorsMessages.push({ message: "Invalid publicationDate", field: "publicationDate" });
    }

    if (errorsMessages.length) {
        return res.status(400).send({ errorsMessages });
    }

    const result = videosRepository.updateVideoById(id, req.body);
    if (result === 'NotFound') return res.sendStatus(404);

    return res.sendStatus(204);
});

videosRouter.delete('/:id', (req: Request, res: Response) =>{
    const id = Number(req.params.id);
    const isDeleted = videosRepository.deleteVideoById(id);

    if (!isDeleted) {
        return res.sendStatus(404);
    }

    return res.sendStatus(204);
})
