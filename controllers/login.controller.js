//signup.controller.js

const LoginService = require('../services/login.service');
const myError = require('../utils/error');
// Signup의 컨트롤러(Controller)역할을 하는 클래스
class LoginController {
  loginService = new LoginService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;

      //닉네임(사용자)이 존재하지 않는경우
      //findUser함수의 반환값은
      //user = {nickname: "", password:""}
      const user = await this.loginService.findUser(nickname, password);

      // console.log(user);
      if (!user) {
        throw myError(412, '닉네임 혹은 비밀번호를 확인해주세요.');
      }

      //loginService.login 함수를 실행한 값은
      //jwt토큰
      const loginData = await this.loginService.login(nickname, password);
      const { token } = loginData;
      console.log(loginData);
      res.cookie('authorization', `Bearer ${token}`);
      res.status(201).json({ data: loginData });
    } catch (err) {
      res.status(400).json({ errormessage: err });
    }
  };
}

module.exports = LoginController;
