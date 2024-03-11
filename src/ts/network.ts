const axios = require('axios');

const APIKey = '7mHafSd3ILuo78L6ARh9u0i2wRhNVU23'

const instance = axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs/',
    timeout: 1000,
    method: 'GET',
});

interface GiphyData {
    type: string;
    id: string;
    url: string;
    source: string;
    title: string;
    images: {
        fixed_height: {
            height: string,
            url: string,
            webp: string
        },
        original: {
            url: string,
            webp: string
        }
    }
}

interface GiphySearchResponse {
    data: {
        data: GiphyData[];
    };
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    };
    meta: {
        status: number;
        msg: string;
        response_id: string;
    };
}


const search = (
    query: string,
    limit: number = 25,
    offset: number = 0,
    lang: string = 'en',
    bundle: string = 'messaging_non_clips'
): Promise<GiphySearchResponse> => {
    return instance.get(`/search?api_key=${APIKey}&q=${query}&limit=${limit}&offset=${offset}&rating=g&lang=${lang}&bundle=${bundle}`)
};

const random = (): Promise<GiphySearchResponse> => {
    return instance.get(`random?api_key=${APIKey}&tag=&rating=g`);
};
export type {GiphyData};
export {search, random};