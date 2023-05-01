//signup.service.js
const SignupRepository = require('../repositories/signup.repository');
//실제로 db를 끌어다 쓰기때문에 repository를 호출한다.
const { Users } = require('../models');
const myError = require('../utils/error');

class SignupService {
  signupRepository = new SignupRepository();

  createSignup = async (nickname, password, confirm) => {
    //데이터 조건 검사

    // 닉네임 길이 제한
    if (nickname.length < 3) {
      throw myError(412, '닉네임 형식이 일치하지 않습니다.');
    }

    // 닉네임 형식
    const nicknameRegex = /^[a-zA-Z0-9]+$/;
    if (!nicknameRegex.test(nickname)) {
      throw myError(412, '닉네임 형식이 일치하지 않습니다.');
    }

    //사용자가 이미 존재하는지 찾을꺼야
    const existingUser = await this.signupRepository.findUser(nickname);
    if (existingUser) {
      throw myError(412, '이미 존재하는 사용자입니다.');
    }

    // 닉네임 4자리 이상, 닉네임과 같은 값 포함
    if (password.length < 4 || password.includes(nickname)) {
      throw myError(412, '비밀번호 형식이 일치하지 않습니다.');
    }

    // 비번 재확인
    if (password !== confirm) {
      throw myError(412, '비밀번호가 일치하지 않습니다.');
    }

    // 저장소(Repository)에게 저장될 데이터를 요청합니다.
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

// // 로그인
// router.post('/login', async (req, res) => {
//   try {
//     const { nickname, password } = req.body;
//     //사용자가 존재하는지 찾아보자
//     const user = await Users.findOne({ where: { nickname } });
//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: '닉네임 또는 패스워드를 확인해주세요.' });
//     } else if (user.password !== password) {
//       return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
//     }

//     //jwt를 생성하고
//     const token = jwt.sign({ userId: user.userId }, 'customized_secret_key'); //user안에 있는 userId,
//     //쿠키를 발급
//     res.cookie('authorization', `Bearer ${token}`);
//     //response할당
//     return res.status(200).json({ message: '로그인 성공' });
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({ message: '서버 에러' });
//   }
// });
