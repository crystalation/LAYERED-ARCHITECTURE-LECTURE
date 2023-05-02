const LoginRepository = require('../repositories/login.repository');
const myError = require('../utils/error');
const jwt = require('jsonwebtoken');

class LoginService {
  loginRepository = new LoginRepository();

  login = async (nickname, password) => {
    console.log(nickname, password);
    const user = await this.loginRepository.findUser(nickname, password);
    //nickname: "", password: ""

    //닉네임(사용자)이 존재하지 않는경우
    if (!user) {
      throw myError(412, '닉네임 혹은 비밀번호를 확인해주세요.');
    }
    //nickname이 있다 -> 조건은 통과
    //nickname과 pw가 db에있다 라는 뜻
    //db에 nickname, password가 있으면 로그인 성공 후 jwt발행하기

    const token = jwt.sign({ userId: user.userId }, 'secret');
    console.log(token);
    return {
      token,
    };
  };
}

module.exports = LoginService;
