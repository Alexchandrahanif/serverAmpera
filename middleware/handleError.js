const handleError = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = [];
    err.errors.forEach((el) => {
      message.push(el.message);
    });
  }

  // Error Inputan (400)
  if (err.name === "Mohon Masukkan Password") {
    code = 400;
    message = "Mohon Masukkan Password";
  } else if (err.name === "Mohon Masukkan Email") {
    code = 400;
    message = "Mohon Masukkan Email";
  }

  // Error Id (400)
  else if (err.name === "Id User Tidak Ditemukan") {
    code = 400;
    message = "Id User Tidak Ditemukan";
  }

  // 401
  else if (err.name === "Invalid authorization") {
    code = 401;
    message = "Token Tidak Ada Atau Salah";
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Token Tidak Sesuai";
  }

  // 403
  else if (err.name === "Forbidden") {
    code = 403;
    message = "Anda Tidak Memiliki Hak Akses";
  }

  res.status(code).json({
    statusCode: code,
    message: message,
  });
};

module.exports = handleError;
