module.exports = async (error, req, res, next) => {
  //"404/어쩌구" 형태의 에러를 잡아오면 "/"기점으로 split 한 후
  //각각 status, errorMessage값을 할당해줌
  const [status, errorMessage] = error.message.split('/');
  console.error(error);

  //위에서 split한 번호와 에러메세지를 아래와 같이 출력한다.
  return res.status(status).json({ errorMessage });
};
