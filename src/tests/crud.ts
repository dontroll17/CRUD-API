import request from 'supertest';

const payload = {
    "username":"user1",
    "age":30,
    "hobbies":["films"]
}

const user = {
    "username":"user2",
    "age":18,
    "hobbies":[]
}

let id: any;

describe('create', () => {
    
    it('should return 201 from post', done => {
        request('http://localhost:3333')
            .post('/api/users')
            .set('Content-type', 'application/json')
            .send( payload )
            .expect(201)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                let textParse = JSON.parse(res.text)
                id = textParse['userAdded'];
                done();
        });
    });
    
    it('should return 200 from GET', done => {
        request('http://localhost:3333')
            .get('/api/users')
            .expect(200)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });
});

describe('work with user', () => {
    it('should return 200 from GET id', done => {
        request('http://localhost:3333')
            .get(`/api/users/${id}`)
            .expect(200)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });

    it('should return 200 from PUT', done => {
        request('http://localhost:3333')
            .put(`/api/users/${id}`)
            .set('Content-type', 'application/json')
            .send( user )
            .expect(200)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });
});

describe('delete user', () => {
    it('should return 204 from DELETE', done => {
        request('http://localhost:3333')
            .delete(`/api/users/${id}`)
            .expect(204)
            .end((err, res) => {
                if(err) {
                    return done(err)
                }
                done();
        });
    });

    it('should return 404 from GET', done => {
        request('http://localhost:3333')
            .get(`/api/users/${id}`)
            .expect(404)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                done();
        });
    });
});







