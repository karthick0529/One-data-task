const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

before(done => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => done())
        .catch(err => console.log(err));
});

describe('Picture API', () => {
    it('should get all pictures', done => {
        request(app)
            .get('/api/pictures')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});
