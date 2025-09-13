import request from "supertest";
import {app} from "../src/app";

describe('/videos API', () => {
    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(204);
    })
    it('GET /videos -> []', async () => {
        const res = await request(app).get('/videos').expect(200);
        expect(res.body).toEqual([])
    })
    it('GET /videos by id -> 404', async () => {
        await request(app)
            .get('/videos/99999')
            .expect(404)
    });
    it('GET /videos by id -> 200', async () => {
        const createRes = await request(app)
            .post('/videos')
            .send({
                title: 'some video',
                author: 'Darcy',
                availableResolutions: ['P144']
            })
            .expect(200)
        const newVideo = createRes.body

        const res = await request(app)
            .get(`/videos/${newVideo.id}`)
            .expect(200);

        expect(res.body).toEqual(newVideo)
    });
    it('POST /videos -> 400', async () => {
        const res = await request(app)
            .post('/videos')
            .send({
                title: '',
                author: '',
                availableResolutions: []
            })
            .expect(400)
        expect(res.body).toHaveProperty('errorsMessages')
        expect(Array.isArray(res.body.errorsMessages)).toBe(true)
        expect(res.body.errorsMessages.length).toBeGreaterThan(0)
    });
    it('POST /videos -> 201', async () => {
        const res = await request(app)
            .post('/videos')
            .send({
                title: 'Rainbow six siege',
                author: 'Akbar',
                availableResolutions: ['P144']
            })
            .expect(201)
        expect(typeof res.body === 'object').toBe(true);
        // console.log(res.body)
        // console.log({...res.body})
        // console.log({...res.body, title: res.body.title})
        expect(res.body.title).toBe('Rainbow six siege');
    });
    it('PUT /videos/:id -> 204', async () => {
        const createRes = await request(app)
            .post('/videos')
            .send({
                title: 'Rainbow six siege',
                author: 'Akbar',
                availableResolutions: ['P144']
            })
            .expect(201)

        const newVideo = createRes.body;

        await request(app)
            .put(`/videos/${newVideo.id}`)
            .send({
                title: 'Rainbow six siege (updated)',
                author: 'Akbar Updated',
                availableResolutions: ['P240', 'P360'],
                canBeDownloaded: true,
                minAgeRestriction: 16,
                publicationDate: new Date().toISOString()
            })
            .expect(204)

        const getRes = await request(app)
            .get(`/videos/${newVideo.id}`)
            .expect(200);

        expect(getRes.body.title).toBe('Rainbow six siege (updated)');
        expect(getRes.body.author).toBe('Akbar Updated');
        expect(getRes.body.availableResolutions).toEqual(['P240', 'P360']);
        expect(getRes.body.canBeDownloaded).toBe(true);
        expect(getRes.body.minAgeRestriction).toBe(16);    });
})