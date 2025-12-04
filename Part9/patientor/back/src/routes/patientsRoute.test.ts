import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from './../../app';

test('get patient by id', async () => {
  await request(app)
    .get('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667')
    .expect(200)
    .then(res => {
      assert.deepStrictEqual(res.body, [{
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "gender": "male",
        "occupation": "New york city cop",
        "entries": []
      }])
    })
})

