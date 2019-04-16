const request = require('supertest');
const server = require('./server.js');


describe('server.js', () => {
    describe('GET /', () => {

        it('should respond with a 200', async () => {
            const response = await request(server).get('/');
            expect(response.statusCode).toBe(200);
        });

        it('should respond with 200, supertest format', () => {
            return request(server)
            .get('/')
            .then(response => {
                expect(response.status).toBe(200);
            })
        })
    })


    describe('GET /games/:id', () => { // Non async/await style
        it('should respond with a 200 and json', (done) => {
            request(server)
                .get('/games/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/i)
                .expect(200, done);
        });
        it('should respond with a 404, game not found', (done) => {
            request(server)
                .get('/games/1a0a')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/i)
                .expect(404, done);
        });
    });


    describe('POST /games', () => {
        it('should respond with 422 (because no body supplied)', async () => {
            const response = await request(server).post('/games');
            expect(response.status).toBe(422);
        })
        it('should respond with 201 (body supplied and correct)', async () => {
            const response = await request(server).post('/games').send({
                title:'Paperboy',
                genre:'NES', 
                releaseYear:1988
            });
            expect(response.status).toBe(201);
        })
        it('should respond with 422 (body supplied but incorrect)', async () => {
            const response = await request(server).post('/games').send({
                title:'Blaster Master'
            });
            expect(response.status).toBe(422);
        })
    })


})

