import request from "supertest";
import {app} from "../src/app";

describe('/products API', () => {
    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(204);
    })
    it('GET /products -> []', async () => {
        const res = await request(app).get('/products').expect(200);
        expect(res.body).toEqual([])
    })
    it('POST /products -> 201 и createProduct ', async () => {
        const res = await request(app)
            .post('/products')
            .send({title: 'banana'})
            .expect(201)

        expect(res.body.title).toBe('banana')
    });
})