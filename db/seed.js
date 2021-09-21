const chance = require('chance').Chance();
const UserService = require('../lib/services/UserServices');

module.exports = async ({ users = 10 } = {}) => {
  const randomUserArray = [...Array(users)].map((_, i) => ({
    userName: `test${i}@test.com`,
    email: `email${i}@email.com`,
    password: `hello${i}`,
    photoURL: chance.url(),
  }));

  await Promise.all(
    randomUserArray.map((singleUser) => UserService.create(singleUser))
  );
};
