//signup.service.js
const SignupRepository = require('../repositories/signup.repository');
//실제로 db를 끌어다 쓰기때문에 repository를 호출한다.

class SignupService {
  signupRepository = new SignupRepository();

  findUser = async (nickname) => {
    const existingUser = await this.signupRepository.findUser(nickname);
    return existingUser;
  };

  createSignup = async (nickname, password) => {
    // nickname, password를 가지고 저장소(Repository)에게 저장될 데이터를 요청합니다.

    const createSignUpdata = await this.signupRepository.createSignup(
      nickname,
      password
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      userId: createSignUpdata.userId,
      nickname: createSignUpdata.nickname,
      password: createSignUpdata.password,
      createdAt: createSignUpdata.createdAt,
      updatedAt: createSignUpdata.updatedAt,
    };
  };
}

module.exports = SignupService;
