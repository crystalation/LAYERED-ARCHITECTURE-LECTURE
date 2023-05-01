const { Users } = require('../models');

class SignupRepository {
  createSignup = async (nickname, password) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createSignupData = await Users.create({
      nickname,
      password,
    });
    return createSignupData;
  };

  findUser = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } });
    return user;
  };
}

module.exports = SignupRepository;

//여기서 진행되는애들은 db에 저장이 되므로 confirm은 필요가 없다.
