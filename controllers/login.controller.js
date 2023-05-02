//signup.controller.js

const LoginService = require('../services/login.service');

// Signup의 컨트롤러(Controller)역할을 하는 클래스
class LoginController {
  loginService = new LoginService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      console.log(req.body);

      // 서비스 계층에 구현된 login 로직을 실행합니다.
      console.log('before');
      const loginData = await this.loginService.login(nickname, password);
      const { token } = loginData;
      res.cookie('authorization', `Bearer ${token}`);
      console.log('after');
      res.status(201).json({ data: loginData });
    } catch (err) {
      res.status(400).json({ errormessage: err });
    }
  };
}

module.exports = LoginController;
