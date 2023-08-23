const { User } = require("../../../../models");

class Controller {
  // REGISTER USER
  static async registerUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // LOGIN USER
  static async loginUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // GET ALL USER
  static async getAllUser(req, res, next) {
    try {
      const dataUser = await User.findAll();
      res.status(200).json({
        message: "Berhasil Menampilkan Semua Data User",
        data: dataUser,
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

  // UPDATE USER
  static async updateUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // DELETE USER
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
