import request from "supertest";
import {app} from "../src/app";

describe('blogs API', () => {

    it('GET blogs 200', async () => {
        const res = await request(app).get('/blogs').expect(200)
        expect(res.body).toEqual([])
    });
    it('POST blogs 201 ', async () => {
        const data = {
            name:"New Blog",
            description:"Test description",
            websiteUrl:"https://example.com"
        }
        const res = await request(app)
            .post('/blogs')
            .send(data)
            .expect(201);
        expect(res.body).toEqual({
            id: expect.any(String),
            name: "New Blog",
            description: "Test description",
            websiteUrl: "https://example.com"
        })
    });
})