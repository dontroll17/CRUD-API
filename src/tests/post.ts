import request from 'supertest';

const notValidUser1 = {
    "username":"test_user",
    "hobbies":["walk", 'drink']
}

const notValidUser2 = {
    "username":"test_user",
    "age": 30
}

const notValidUser3 = {
    "age": 30,
    "hobbies":["walk", 'drink']
}

describe('POST test', () => {
    it('should return 400', done => {
        request('http://localhost:3333')
            .post('/api/users')
            .set('Content-type', 'application/json')
            .send( notValidUser1 )
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
            .post('/api/users')
            .set('Content-type', 'application/json')
            .send( notValidUser2 )
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
            .post('/api/users')
            .set('Content-type', 'application/json')
            .send( notValidUser3 )
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });
});