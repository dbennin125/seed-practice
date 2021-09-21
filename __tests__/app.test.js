const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserServices');

describe('auth routes', () => {
  let user;
  const agent = request.agent(app);
  beforeEach(async () => {
    return setup(pool)
      .then(() => {
        UserService.create({
          userName: 'userNameDAN',
          email: 'test@test.com',
          password: 'password',
          photoURL: 'https://placekitten.com/200/200',
        });
      })
      .then(() => {
        return agent.post('/api/v1/auth/login').send({
          email: 'test@test.com',
          password: 'password',
        });
      })
      .then((res) => {
        user = res.body;
      });

    //async and await syntax
    // await setup(pool);

    // await UserService.create({
    //   userName: 'userNameDAN',
    //   email: 'test@test.com',
    //   password: 'password',
    //   photoURL: 'https://placekitten.com/200/200',
    // });

    // const response = await agent.post('/api/v1/auth/login').send({
    //   email: 'test@test.com',
    //   password: 'password',
    // });

    // user = response.body;
    // console.log("I'm a user", user);
  });

  it('allows a user to signup via POST', async () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        userName: 'userName',
        email: 'email@test.com',
        password: 'password',
        photoURL: 'https://placekitten.com/200/200',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          userName: 'userName',
          email: 'email@test.com',
          photoURL: 'https://placekitten.com/200/200',
        });
      });
  });

  it('allows a user to login via POST', async () => {
    return agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .then((res) => {
        expect(res.body).toEqual({
          ...user,
        });
      });
    //async and await syntax
    // const res = await agent.post('/api/v1/auth/login').send({
    //   email: 'test@test.com',
    //   password: 'password',
    // });

    // expect(res.body).toEqual({
    //   ...user,
    // });
  });

  it('verifies a user via GET', async () => {
    return agent.get('/api/v1/auth/verify').then((res) => {
      expect(res.body.user).toEqual({
        ...user,
      });
    });
    //async and await syntax
    // const res = await agent.get('/api/v1/auth/verify')
    // expect(res.body.user).toEqual({
    //   ...user,
    // });
  });
});
