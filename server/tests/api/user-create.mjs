/* global suite, before, test, after */

import { assert } from 'chai';
import supertest from 'supertest';
import app from '../../src/app';
import TestFactory from '../TestFactory';

const factory = new TestFactory();
const request = supertest.agent(app);

suite('User create');

before(async () => {
  await factory.waitForReady();
  await factory.cleanup();
  await factory.setDefaultUsers();
});

test('Positive: Create user', () => {
  return request
    .post('/api/v1/users')
    .send({
      data: {
        email: 'testuser@gmail.com',
        username: 'testuser',
        password: '123456',
        confirmPassword: '123456'
      }
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(res => {
      assert.ok(res.body.status);
    });
});

test('Negative: Create with not unique email', () => {
  return request
    .post('/api/v1/users')
    .send({
      data: {
        email: 'user1@gmail.com',
        username: 'user1',
        password: '123456',
        confirmPassword: '123456'
      }
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(res => {
      assert.deepEqual(res.body, {
        status: 0,
        error: {
          code: 'NOT_UNIQUE',
          fields: {
            email: 'NOT_UNIQUE'
          }
        }
      });
    });
});

test('Negative: Create without confirmPassword', () => {
  return request
    .post('/api/v1/users')
    .send({
      data: {
        email: 'user1@gmail.com',
        username: 'user1',
        password: '123456'
      }
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(res => {
      assert.deepEqual(res.body, {
        status: 0,
        error: {
          code: 'FORMAT_ERROR',
          fields: {
            'data/confirmPassword': 'REQUIRED'
          }
        }
      });
    });
});

test('Negative: Create without username', () => {
  return request
    .post('/api/v1/users')
    .send({
      data: {
        email: 'user1@gmail.com',
        password: '123456',
        confirmPassword: '123456'
      }
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(res => {
      assert.deepEqual(res.body, {
        status: 0,
        error: {
          code: 'FORMAT_ERROR',
          fields: {
            'data/username': 'REQUIRED'
          }
        }
      });
    });
});

after(async () => {
  try {
    await factory.cleanup();
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    throw e;
  }
});
