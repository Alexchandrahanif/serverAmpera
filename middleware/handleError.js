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
  } else if (err.name === "Mohon Masukan PIN 4 Digit") {
    code = 400;
    message = "Mohon Masukan PIN 4 Digit";
  } else if (err.name === "Nomor Telepon Sudah Terdaftar") {
    code = 400;
    message = "Nomor Telepon Sudah Terdaftar";
  }

  // Error Id (404)
  else if (err.name === "Id Category Company Tidak Ditemukan") {
    code = 404;
    message = "Id Category Company Tidak Ditemukan";
  } else if (err.name === "Id Company Tidak Ditemukan") {
    code = 404;
    message = "Id Company Tidak Ditemukan";
  } else if (err.name === "Id Category Menu Tidak Ditemukan") {
    code = 404;
    message = "Id Category Menu Tidak Ditemukan";
  } else if (err.name === "Id Menu Tidak Ditemukan") {
    code = 404;
    message = "Id Menu Tidak Ditemukan";
  } else if (err.name === "Id Customer Tidak Ditemukan") {
    code = 404;
    message = "Id Customer Tidak Ditemukan";
  } else if (err.name === "Id Order Tidak Ditemukan") {
    code = 404;
    message = "Id Order Tidak Ditemukan";
  } else if (err.name === "Id Table Tidak Ditemukan") {
    code = 404;
    message = "Id Table Tidak Ditemukan";
  } else if (err.name === "Id User Tidak Ditemukan") {
    code = 404;
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
