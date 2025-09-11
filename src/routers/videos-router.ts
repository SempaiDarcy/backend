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
    }
    if (!author?.trim()) {
        errorsMessages.push({ message: "Invalid author", field: "author" });
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
    const result = videosRepository.updateVideoById(id, req.body);

    if (result === 'NotFound') return res.sendStatus(404);
    if (result === 'BadRequest') {
        return res.status(400).send({
            errorsMessages: [{ message: 'Invalid input', field: 'body' }]
        });
    }

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
