//signup.controller.js

const LoginService = require('../services/login.service');

// Signup의 컨트롤러(Controller)역할을 하는 클래스
class LoginController {
  loginService = new LoginService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;

      //닉네임(사용자)이 존재하는지 확인
      await this.loginService.findUser(nickname, password);

      //loginService.login 함수를 실행한 값은
      //jwt토큰
      const loginData = await this.loginService.login(nickname, password);
      const { token } = loginData;
      console.log(loginData);
      res.cookie('authorization', `Bearer ${token}`);
      res.status(201).json({ data: loginData });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || '400/로그인에 실패했습니다.');
    }
  };
}

// } catch (err) {
//   if (!err.statusCode) {
//     res.status(400).json({ message: '좋아요 추가에 실패했습니다.' });
//   } else {
//     res.status(err.statusCode).json({ errormessage: err.message });
//   }

module.exports = LoginController;
