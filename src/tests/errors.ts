import request from 'supertest';

const notValidUUID = '8e228c3a-5515-4562-b76d-89681402c5a';
const validUUID = '8e228c3a-5515-4562-b76d-89681402c5ac';

const body = {
    "username":"test_user",
    "age":25,
    "hobbies":["walk", 'drink']
}

describe('non-existent endpoint', () => {
    it('should return 404' , done => {
        request('http://localhost:3333')
            .get('/some/url')
            .expect(404)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });

    it('should return 404 from POST', done => {
        request('http://localhost:3333')
            .get('/non-existed/endpoint')
            .expect(404)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });
});

describe('non valid uuid', () => {
    it('should return 400', done => {
        request('http://localhost:3333')
            .get(`/api/users/${notValidUUID}`)
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });

    it('should return 400', done => {
        request('http://localhost:3333')
            .put(`/api/users/${notValidUUID}`)
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });

    it('should return 400', done => {
        request('http://localhost:3333')
            .delete(`/api/users/${notValidUUID}`)
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });
});

describe('user not found', () => {
    it('should return 404 GET', done => {
        request('http://localhost:3333')
            .get(`/api/users/${validUUID}`)
            .expect(404)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });

    it('should return 404 PUT', done => {
        request('http://localhost:3333')
            .put(`/api/users/${validUUID}`)
            .set('Content-type', 'application/json')
            .send( body )
            .expect(404)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });

    it('should return 404 DELETE', done => {
        request('http://localhost:3333')
            .delete(`/api/users/${validUUID}`)
            .set('Content-type', 'application/json')
            .send( body )
            .expect(404)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });
});