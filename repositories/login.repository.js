//login 기능
//db에 해당 nickname과 password가 있으면 jwt토큰을 발행
const { Users } = require('../models');

class LoginRepository {
  //사용자가 존재하는지 찾아본다
  findUser = async (nickname, password) => {
    const user = await Users.findOne({ where: { nickname, password } });
    return user;
  };

  //nickname, password를 베이스로 찾은 user 정보를 반환
  login = async (nickname, password) => {
    const user = await Users.findOne({ where: { nickname, password } });
    return user;
  };
}

module.exports = LoginRepository;
