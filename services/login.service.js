const LoginRepository = require('../repositories/login.repository');
// const myError = require('../utils/error');
const jwt = require('jsonwebtoken');

class LoginService {
  loginRepository = new LoginRepository();

  findUser = async (nickname, password) => {
    const existingUser = await this.loginRepository.findUser(
      nickname,
      password
    );
    return existingUser;
  };

  //jwt 토큰을 발급하는 함수
  //요청받은 nickname, pssword가 있다면
  login = async (nickname, password) => {
    const user = await this.loginRepository.login(nickname, password);
    //login은 유저 정보가 될것임

    if (user) {
      const token = jwt.sign({ userId: user.userId }, 'secret');
      return {
        token,
      };
    }
  };
}

module.exports = LoginService;
