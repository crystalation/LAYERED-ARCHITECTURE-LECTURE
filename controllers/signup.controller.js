//signup.controller.js

const SignupService = require('../services/signup.service');
const myError = require('../utils/error');

// Signup의 컨트롤러(Controller)역할을 하는 클래스
class SignupController {
  signupService = new SignupService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  createSignup = async (req, res, next) => {
    try {
      const { nickname, password, confirm } = req.body;
      //필요한 데이터가 입력되었는지
      if (!nickname || !password || !confirm) {
        throw myError(400, '모든 필드는 필수값 입니다.');
      }

      // 서비스 계층에 구현된 createSignup 로직을 실행합니다.
      const createsignUpdata = await this.signupService.createSignup(
        nickname,
        password,
        confirm
      );

      res.status(201).json({ data: createsignUpdata });
    } catch (err) {
      res.status(err.statusCode).json({ errormessage: err.message });
    }
  };
}

module.exports = SignupController;
