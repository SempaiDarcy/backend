import {ResolutionType, UpdateVideoInput, VideosType} from "../models/video";
import {db} from '../db/db'

export const videosRepository = {
    getVideos(): VideosType[] {
        return db.videos;
    },
    getVideoById(id: number): VideosType | null {
        const video = db.videos.find(el => el.id === id);
        return video || null
    },
    createNewVideo(title: string, author: string, availableResolutions: ResolutionType[]): VideosType | null {
        if (!title.trim() || !author.trim()) {
            return null;
        }

        if (
            !Array.isArray(availableResolutions) ||
            !availableResolutions.length ||
            !availableResolutions.every(r => Object.values(ResolutionType).includes(r))
        ) {
            return null;
        }
        const createdAt = new Date();
        const publicationDate = new Date(createdAt);
        publicationDate.setDate(createdAt.getDate() + 1);

        const newVideo: VideosType = {
            id: Date.now(),
            title: title.trim(),
            author: author.trim(),
            canBeDownloaded: false,
            minAgeRestriction: null, // по умолчанию null
            createdAt: createdAt.toISOString(),
            publicationDate: publicationDate.toISOString(),
            availableResolutions
        };

        db.videos.unshift(newVideo);
        return newVideo;
    },
    updateVideoById(id: number, data: UpdateVideoInput): 'Success' | 'NotFound' {
        const video = db.videos.find(el => el.id === id);
        if (!video) return 'NotFound';

        Object.assign(video, {
            title: data.title.trim(),
            author: data.author.trim(),
            availableResolutions: data.availableResolutions,
            canBeDownloaded: data.canBeDownloaded,
            minAgeRestriction: data.minAgeRestriction,
            publicationDate: data.publicationDate
        });

        return 'Success';
    },
    deleteVideoById(id: number): boolean {
        const initialLength = db.videos.length
        const newVideos = db.videos.filter(el => el.id !== id);
        db.videos = newVideos
        return db.videos.length < initialLength
    },
    clearAll() {
        db.videos.length = 0;
    }
}