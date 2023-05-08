//signup.controller.js

const SignupService = require('../services/signup.service');
const signupSchema = require('../validation/joi-schemas');

// Signup의 컨트롤러(Controller)역할을 하는 클래스
class SignupController {
  signupService = new SignupService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  createSignup = async (req, res, next) => {
    try {
      
     const validatedBody = await signupSchema.createSignupSchema.validateAsync(req.body);

      //사용자가 이미 존재하는지 찾을꺼야
      const existingUser = await this.signupService.findUser(nickname);
      if (existingUser) {
        throw new Error('412/이미 존재하는 사용자입니다.');
      }

      // 서비스 계층에 구현된 createSignup 로직을 실행합니다.
      const createsignUpdata = await this.signupService.createSignup(
        validatedBody.nickname,
        validatedBody.password,
        validatedBody.confirm
      );
      res
        .status(201)
        .json({ message: '회원가입에 성공하였습니다!', createsignUpdata });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || '400/회원가입에 실패했습니다.');
    }
  };
}

module.exports = SignupController;

// //필요한 데이터가 입력되었는지
// if (!nickname || !password || !confirm) {
//   throw new Error('400/모든 필드는 필수값 입니다.');
// }

// // 닉네임 길이 제한
// if (nickname.length < 3) {
//   throw new Error('412/닉네임 형식이 일치하지 않습니다.');
// }

// // 닉네임 형식
// const nicknameRegex = /^[a-zA-Z0-9]+$/;
// if (!nicknameRegex.test(nickname)) {
//   throw new Error('412/닉네임 형식이 일치하지 않습니다.');
// }

// // 비밀번호 4자리 이상, 닉네임과 같은 값 포함
// if (password.length < 4 || password.includes(nickname)) {
//   throw new Error('412/비밀번호 형식이 일치하지 않습니다.');
// }

// // 비번 재확인
// if (password !== confirm) {
//   throw new Error('412/비밀번호가 일치하지 않습니다.');
// }
