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

 let videos: VideosType[] = [];

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

        videos.unshift(newVideo);
        return newVideo;
    },
    updateVideoById(id: number, data: UpdateVideoInput): 'Success' | 'NotFound' {
        const video = videos.find(el => el.id === id);
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
        const initialLength = videos.length
        const newVideos = videos.filter(el => el.id !== id);
        videos = newVideos
        return videos.length < initialLength
    },
    clearAll() {
        videos.length = 0;
    }
}