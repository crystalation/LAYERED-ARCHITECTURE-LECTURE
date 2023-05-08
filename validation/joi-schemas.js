//middleware를 사용하지 않을 시
//body검증용 노드 모듈
//npm install joi
const Joi = require('joi');

//회원가입 생성 요청 바디 검증 스키마
const createSignupSchema = Joi.object({
  //닉네임 body유무, 길이제한, 형식,
  nickname: Joi.string()
    .required()
    .min(3)
    .pattern(/^[a-zA-Z0-9]+$/)
    .message('닉네임은 3자이상 영문과 숫자만 가능합니다.'),
  //password body유무, 4자이상, 닉네임과 같은값 포함x
  password: Joi.string()
    .required()
    .disallow(Joi.ref('nickname'))
    .min(4)
    .message('비밀번호는 4자 이상, 닉네임과 일치하지 않아야 합니다.'),
  //confirm body 유무, password와 같아야 통과
  confirm: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({ 'any.only': '비밀번호가 일치하지 않습니다.' }),
}).messages({
  'any.required': '필수 항목입니다.',
  'string.empty': '빈 값은 허용되지 않습니다.',
});

// 게시글 생성 요청 바디 검증 스키마
const createPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

// 게시글 수정 요청 바디 검증 스키마
const updatePostSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
});

module.exports = {
  createPostSchema,
  updatePostSchema,
  createSignupSchema,
};

//Joi로 구현할 수 있는건 body에 한정된것?
//Controller에서 Joi로 검증하는 부분에서 에러 발생시, 예외처리를 위해 try-catch블록
