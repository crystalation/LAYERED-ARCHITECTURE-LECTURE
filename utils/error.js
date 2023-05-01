//코드랑 에러내용이 들어가야댐

const myError = (statusCode, message) => {
  let error = new Error(message);
  error.statusCode = statusCode;

  return error;
};

module.exports = myError;
