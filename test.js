const chai = require('chai');
const chaiHttp = require('chai-http');
const startMedicalBillUploadService = require('./app');
const app = startMedicalBillUploadService();
const expect = chai.expect;
medicalBills = [];

chai.use(chaiHttp);

describe('Medical Bill Upload Service', () => {
  beforeEach(() => {
    medicalBills = [];
  });

  describe('GET /items', () => {
    it('should return an empty list of medical bills', done => {
      chai
        .request(app)
        .get('/items')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.is.empty;
          done();
        });
    });
  });

  describe('POST /items', () => {
    it('should create a new medical bill', done => {
      const medicalBill = {
        patientName: 'John Doe',
        dateOfService: '2023-02-09',
        totalAmount: 100.0
      };

      chai
        .request(app)
        .post('/items')
        .send(medicalBill)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(medicalBill);
          done();
        });
    });
  });

  describe('GET /items after POST', () => {
    it('should return a list of medical bills', done => {
      const medicalBill = {
        patientName: 'John Doe',
        dateOfService: '2022-01-01',
        totalAmount: 100.0
      };

      chai
        .request(app)
        .post('/items')
        .send(medicalBill)
        .end((err, res) => {
          chai
            .request(app)
            .get('/items')
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('array').that.has.lengthOf(1);
              expect(res.body[0]).to.deep.equal(medicalBill);
              done();
            });
        });
    });
  });
});
