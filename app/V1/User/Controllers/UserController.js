const formatPhoneNumber = require("../../../../helper/formatPhoneNumber");
const {
  comparePassword,
  createAccessToken,
} = require("../../../../helper/helper");
const remove = require("../../../../helper/remove");
const { User } = require("../../../../models");

class Controller {
  // REGISTER USER
  static async registerUser(req, res, next) {
    try {
      const { displayName, username, email, password, phoneNumber, address } =
        req.body;

      const body = {
        displayName,
        username,
        email,
        password,
        phoneNumber: formatPhoneNumber(phoneNumber),
        address,
        photoUser: req.file ? req.file.path : "",
      };

      const dataUser = await User.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan User Baru",
      });
    } catch (error) {
      next(error);
    }
  }

  // SCAN USERNAME
  static async scanUsername(req, res, next) {
    try {
      const { username } = req.body;
      const data = await User.findOne({
        where: {
          username,
        },
      });

      if (data) {
        throw { name: "Username Sudah Terdaftar" };
      }

      res.status(200).json({
        message: "Username Masih Tersedia",
      });
    } catch (error) {
      next(error);
    }
  }

  // LOGIN USER
  static async loginUser(req, res, next) {
    try {
      // REQUEST
      const { email, password } = req.body;

      // VALIDASI INPUT
      if (!email) {
        throw { name: "Mohon Masukkan Email" };
      }
      if (!password) {
        throw { name: "Mohon Masukkan Password" };
      }

      // VALIDASI FIND USER
      const dataUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!dataUser) {
        throw { name: "Email/Password Salah" };
      }

      if (!comparePassword(password, dataUser.password)) {
        throw { name: "Email/Password Salah" };
      }

      // CREATE PAYLOAD
      const payload = {
        id: dataUser.id,
        email: dataUser.email,
      };

      // CREATE ACCESS TOKEN
      const authorization = createAccessToken(payload);

      // SUCCESS
      res.status(200).json({
        statusCode: 200,
        message: "Selamat, berhasil login",
        authorization: authorization,
        name: dataUser.displayName,
        email: dataUser.email,
        photoUser: dataUser.photoUser ? dataUser.photoUser : "",
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ALL USER
  static async getAllUser(req, res, next) {
    try {
      // MENDAPATKAN SEMUA DATA USER
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        attributes: {
          exclude: ["password"],
        },
        order: [["displayName", "ASC"]],
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [
            { displayName: { [Op.iLike]: `%${search}%` } },
            { username: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        };
      }

      if (tanggal) {
        const pagi = moment().format(`${tanggal} 00:00`);
        const masuk = moment().format(`${tanggal} 23:59`);
        pagination.where = {
          createdAt: {
            [Op.between]: [pagi, masuk],
          },
        };
      }

      let dataUser = await User.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataUser.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data User",
        data: dataUser.rows,
        totaldataUser: dataUser.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE USER
  static async getOneUsers(req, res, next) {
    try {
      const { id } = req.params;

      const dataUser = await User.findOne({
        where: {
          id,
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }

      res.status(200).json({
        message: "Berhasil Menampilkan Semua Data User",
        data: dataUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE USER (perlu diperiksa)
  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { displayName, username, email, password, phoneNumber, address } =
        req.body;

      const dataUser = await User.findOne({
        where: {
          id,
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }

      const body = {
        displayName,
        username,
        email,
        password,
        phoneNumber: formatPhoneNumber(phoneNumber),
        address,
      };

      if (req.file) {
        remove(dataUser.photoUser);
        body.photoUser = req.file ? req.file.path : "";
      }

      await User.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Berhasil Memperbaharui Semua Data User",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE USER
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const dataUser = await User.findOne({
        where: {
          id,
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }

      await User.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Berhasil Menghapus Semua Data User",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
