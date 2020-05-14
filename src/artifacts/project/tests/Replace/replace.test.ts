/* eslint-disable global-require */
import request from 'supertest';
import { MockProxy } from 'jest-mock-extended';
import { Repository } from 'typeorm';

const app = require('../../src/app').default;

jest.mock('../../src/middlewares/Logger');
jest.mock('typeorm')
describe('Replace Module Tests', () => {

  const repository = (require('typeorm').repositoryMock) as MockProxy<Repository<any>>

  test('Should returna list of Replaces', async () => {

    repository.find.mockResolvedValue([{ _id: '5e9dfe8bacb25e2e26c72916', name: 'Replace' }] as any)

    await request(app)
      .get('/replace')
      .expect(200, [{ _id: '5e9dfe8bacb25e2e26c72916', name: 'Replace' }]);
  });

  test('should return one Replace', async () => {
    repository.findOne.mockResolvedValue({ _id: '5e9dfe8bacb25e2e26c72916', name: 'Replace' });
    await request(app)
      .get('/replace/5e9dfe8bacb25e2e26c72916')
      .expect(200, { _id: '5e9dfe8bacb25e2e26c72916', name: 'Replace' });
  });

  test('should return error when Replace does not exists', async () => {
    repository.findOne.mockResolvedValue(undefined);
    await request(app)
      .get('/replace/5e9dfe8bacb25e2e26c72916')
      .expect(404, {
        errors: [
          {
            "code": "REPLACE_NOT_FOUND",
            "message": "Replace not found",
            "status": 404
          }
        ]
      })

  })

  test('should create one Replace', async () => {
    repository.save.mockResolvedValue({ _id: '5e9dfe8bacb25e2e26c72916', name: 'Replace' })
    await request(app)
      .post('/replace')
      .send({ name: 'Replace' })
      .expect(200, { _id: '5e9dfe8bacb25e2e26c72916', name: 'Replace' });
  });

  test('should update one Replace', async () => {
    repository.update.mockResolvedValue({} as any);
    repository.findOne.mockResolvedValue({
      _id: '5e9dfe8bacb25e2e26c72916',
      name: 'User',
    });
    await request(app)
      .put('/replace/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(200, { _id: '5e9dfe8bacb25e2e26c72916', name: 'User' });
  });

  test('should return error when update one User', async () => {
    repository.update.mockResolvedValue({} as any);
    repository.findOne.mockResolvedValue(undefined);
    await request(app)
      .put('/replace/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(404, {
        errors: [
          {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            status: 404,
          },
        ],
      });
  });

  test('should delete one User', async () => {
    repository.delete.mockResolvedValue({} as any);
    repository.findOne.mockResolvedValue({
      _id: '5e9dfe8bacb25e2e26c72916',
      name: 'User',
    });
    await request(app)
      .delete('/replace/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(200, { });
  });

  test('should return error when delete one User', async () => {
    repository.findOne.mockResolvedValue(undefined);
    await request(app)
      .delete('/replace/5e9dfe8bacb25e2e26c72916')
      .send({ name: 'User' })
      .expect(404, {
        errors: [
          {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            status: 404,
          },
        ],
      });
  });
});
