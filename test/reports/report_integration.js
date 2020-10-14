process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'lol';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    describe('GET /reports', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });

    describe('GET /reports/kmom01', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("string");

                    done();
                });
        });
    });

    describe('GET /reports/kmom02', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("string");

                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('201 HAPPY REGISTER', (done) => {
            chai.request(server)
                .post("/register")
                .type('form')
                .send({
                    email: 'test@test.se',
                    password: 'password'
                })
                .end((err, res) => {
                    res.should.have.status(201);

                    done();
                });
        });

        it('409 REGISTER THAT EXISTS', (done) => {
            chai.request(server)
                .post("/register")
                .type('form')
                .send({
                    email: 'test@test.se',
                    password: 'password'
                })
                .end((err, res) => {
                    res.should.have.status(409);

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('200 HAPPY LOGIN', (done) => {
            chai.request(server)
                .post("/login")
                .type('form')
                .send({
                    email: 'test@test.se',
                    password: 'password'
                })
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });

        it('401 BAD LOGIN', (done) => {
            chai.request(server)
                .post("/login")
                .type('form')
                .send({
                    email: 'test@test.se',
                    password: 'pass'
                })
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
    });

    describe('POST /reports', () => {
        it('BAD REPORT CREATION', (done) => {
            chai.request(server)
                .post("/reports")
                .type('form')
                .send({
                    week: '10',
                    content: 'Content for this week.'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.error.should.equal('Invalid token');

                    done();
                });
        });
    });

    describe('POST /reports/update', () => {
        it('BAD REPORT UPDATE', (done) => {
            chai.request(server)
                .post("/reports/update")
                .type('form')
                .send({
                    week: '10',
                    content: 'Content for this week.'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.error.should.equal('Invalid token');

                    done();
                });
        });
    });

    describe('GET /index', () => {
        it('200 HAPPY INDEX', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
});
