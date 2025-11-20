import request from "supertest";
import { Response as SupertestResponse } from "supertest";
import { app } from "./app.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function makeRequest(height?: any, weight?: any) {
  return await request(app).get(`/bmi?height=${height}&weight=${weight}`);
};

function validateErrorMessage(response: SupertestResponse, errorMessage: string) {
  expect(response.statusCode).toBe(400);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { error } = JSON.parse(response.text);
  expect(error).toBe(errorMessage);
};

describe('endpoints', () => {
  const heightParam = '5.9';
  const weightParam = '190';
  test('bmi endpoints with params returns bmi', async () => {
    const expectedBmi = 'overweight';
    const res = await makeRequest(heightParam, weightParam);
    expect(res.statusCode).toBe(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { height, weight, bmi } = JSON.parse(res.text);
    expect(height).toBe(heightParam);
    expect(weight).toBe(weightParam);
    expect(bmi).toBe(expectedBmi);
  });

  test('undefined height returns error message', async () => {
    const expectedErrorMessage = "height or weight parameter are undefined.";
    const res = await makeRequest(heightParam, '');
    validateErrorMessage(res, expectedErrorMessage);
  });

  test('not number parameter returns error', async () => {
    const expectedErrorMessage = 'height or weight parameter are not numbers.';
    const res = await makeRequest(heightParam, 'heavy');
    validateErrorMessage(res, expectedErrorMessage);
  });
});

describe('test exercise endpoints', () => {
  test('empty call returns nothing message', async () => {
    const res = await request(app)
      .post('/exercises')
      .set("Content-Type", "application/json")
      .send({})

    expect(res.statusCode).toBe(400)
    expect(res.text).toBe('Error while validating arguments: Nothing in the body of the request')
  })
  test('<2 args return error', async () => {
    const res = await request(app)
      .post('/exercises')
      .set('Content-Type', 'application/json')
      .send({ weeklyArray: [] })

    expect(res.statusCode).toBe(400)
    expect(res.text).toBe(`Error while validating arguments: Wrong number of arguments: 1`)
  })
  test('>2 args return error', async () => {
    const res = await request(app)
      .post('/exercises')
      .set('Content-Type', 'application/json')
      .send({ weeklyArray: [], target: 2, anotherThing: 3 })

    expect(res.statusCode).toBe(400)
    expect(res.text).toBe(`Error while validating arguments: Wrong number of arguments: 3`)
  })
  describe('testing arrray', () => {
    test('no array returns error', async () => {
      const res = await request(app)
        .post('/exercises')
        .set('Content-Type', 'application/json')
        .send({ weeklyArray: {}, target: 2 })

      expect(res.statusCode).toBe(400)
      expect(res.text).toBe(`Error while validating arguments: The first argument must be an array.`)
    })
    test('short array returns error', async () => {
      const res = await request(app)
        .post('/exercises')
        .set('Content-Type', 'application/json')
        .send({ weeklyArray: [1, 2, 3, 4, 5, 6], target: 2 })

      expect(res.statusCode).toBe(400)
      expect(res.text).toBe(`Error while validating arguments: Array is too long or too short. Length: 6`)
    })
    test('long array returns error', async () => {
      const res = await request(app)
        .post('/exercises')
        .set('Content-Type', 'application/json')
        .send({ weeklyArray: [1, 2, 3, 4, 5, 6, 7, 8], target: 2 })

      expect(res.statusCode).toBe(400)
      expect(res.text).toBe(`Error while validating arguments: Array is too long or too short. Length: 8`)
    })
  })
  describe('number val', () => {
    test('a number validation throws the correct error', async () => {
      const res = await request(app)
        .post('/exercises')
        .set('Content-Type', 'application/json')
        .send({ weeklyArray: [1, 2, 3, 4, 5, 6, 7], target: 'a' })

      expect(res.statusCode).toBe(400)
      expect(res.text).toBe(`Error while validating arguments: 'a' is not a number.`)
    })
  })

  test('success', async () => {
    const weeklyArray = [3, 0, 2, 4.5, 0, 3, 1];
    const targetDaily = 2;
    const expectedResult = {
      periodLength: 7,
      trainingDays: 5,
      success: false,
      rating: 2.9,
      ratingDescription: 'Better than average',
      target: 2,
      average: 1.9285714285714286
    };

    const res = await request(app)
      .post('/exercises')
      .set('Content-Type', 'application/json')
      .send({ weeklyArray: weeklyArray, target: targetDaily })

    expect(res.statusCode).toBe(200)
    expect(res.text).toBe(JSON.stringify(expectedResult))
  })
})
