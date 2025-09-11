export enum ResolutionType {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160',
}


type VideosType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null,
    createdAt?: string,
    publicationDate?: string,
    availableResolutions: ResolutionType[]
}

export type UpdateVideoInput = {
    title: string;
    author: string;
    availableResolutions: ResolutionType[];
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
};

 let videos: VideosType[] = [
    {
        id: 1,
        title: "TypeScript Tutorial",
        author: "Alex",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: [ResolutionType.P144, ResolutionType.P240, ResolutionType.P360]
    },
    {
        id: 2,
        title: "Node.js Express Basics",
        author: "Maria",
        canBeDownloaded: false,
        minAgeRestriction: 18,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: [ResolutionType.P480, ResolutionType.P720, ResolutionType.P1080]
    }
];

export const videosRepository = {
    getVideos(): VideosType[] {
        return videos;
    },
    getVideoById(id: number): VideosType | null {
        const video = videos.find(el => el.id === id);
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

        const newVideo: VideosType = {
            id: Date.now(),
            title: title.trim(),
            author: author.trim(),
            canBeDownloaded: true,
            minAgeRestriction: null, // по умолчанию null
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions
        };

        videos.unshift(newVideo);
        return newVideo;
    },
    updateVideoById(id: number, data: UpdateVideoInput): 'Success' | 'NotFound' | 'BadRequest' {
        const video = videos.find(el => el.id === id);
        if (!video) return 'NotFound';

        // валидация
        if (!data.title?.trim() || !data.author?.trim()) return 'BadRequest';
        if (
            !Array.isArray(data.availableResolutions) ||
            !data.availableResolutions.length ||
            !data.availableResolutions.every(r => Object.values(ResolutionType).includes(r))
        ) {
            return 'BadRequest';
        }

        // валидация minAgeRestriction (1–18 или null)
        if (
            data.minAgeRestriction !== null &&
            (data.minAgeRestriction < 1 || data.minAgeRestriction > 18)
        ) {
            return 'BadRequest';
        }

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
        const initialLength = videos.length
        const newVideos = videos.filter(el => el.id !== id);
        videos = newVideos
        return videos.length < initialLength
    },
    clearAll() {
        videos.length = 0;
    }
}