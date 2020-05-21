const app = require('../server/index');
const request = require('supertest');

const mockAPI = [{
    adminCode2: '061',
    adminCode1: 'NY',
    adminName2: 'New York',
    lng: -74.008344,
    countryCode: 'US',
    postalcode: '10005',
    adminName1: 'New York',
    placeName: 'New York',
    lat: 40.705649
}];

describe('API Test', () => {
    it('[GET: /test] Response for request should return valid data', (done) => {
        request(app)
            .get('/test')
            .expect(200)
            .end((err, res) => {
                expect(res.body["postalcodes"]).toStrictEqual(mockAPI);
                done();
            })
    });
});