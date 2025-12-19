import { describe, test } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from './../../app';
import { healthCheckEntrySchema } from '../utils/entryValidation';

test('get patient by id', async () => {
  await request(app)
    .get('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667')
    .expect(200)
    .then(res => {
      assert.deepStrictEqual(res.body, {
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "gender": "male",
        "occupation": "New york city cop",
        "entries": [
          {
            id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
            date: '2015-01-02',
            type: 'Hospital',
            specialist: 'MD House',
            diagnosisCodes: ['S62.5'],
            description:
              "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
            discharge: {
              date: '2015-01-16',
              criteria: 'Thumb has healed.',
            },
          }
        ],
      })
    })
})

describe('add an entry for a patient', () => {
  const todayDate: string = `${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`
  const baseEntryObject = {
    "description": "description",
    "date": todayDate,
    "specialist": "specialist",
    "diagnosisCodes": ["M24.2"]
  }
  const url = '/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries';
  test('adding without type throws error ', async () => {
    const response = await request(app)
      .post(url)
      .send(baseEntryObject)
      .expect(400)
    assert.equal(response.status, 400);
    assert.equal(JSON.parse(response.text).error, "Type is missing.");
  });

  test.only('Healthcheck entry succeeds', async () => {
    const res = await request(app)
      .post(url)
      .send({
        ...baseEntryObject,
        type: "Healthcheck",
        healthCheckRating: 0
      })
      .expect(201)
    console.log('res', res)
  })
});
