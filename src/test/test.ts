import request from 'supertest';

const payload = {
    "username":"D0",
    "age":30,
    "hobbies":["films"]
}

let id: any;

describe('create', () => {
    
    it('should return 201 from post', done => {
        request('http://localhost:3333')
            .post('/api/users')
            .send( payload )
            .expect(201)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                let textParse = JSON.parse(res.text)
                id = textParse['userAdded'];
                console.log('USER CREATED');
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
                console.log(res.text);
                done();
            });
    });
});

describe('get', () => {
    it('should return 200 from GET id', done => {
        console.log(id);
        request('http://localhost:3333')
            .get(`/api/users/${id}`)
            .expect(200)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
    
                console.log("GET USER BY ID");
                done();
            });
    });
})








