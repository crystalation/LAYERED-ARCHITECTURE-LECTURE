//login 기능
//db에 해당 nickname과 password가 있으면 jwt토큰을 발행
const { Users } = require('../models');

class LoginRepository {
  findUser = async (nickname, password) => {
    const user = await Users.findOne({ where: { nickname, password } });
    return user;
  };
}

module.exports = LoginRepository;
