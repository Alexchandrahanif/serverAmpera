const { CategoryMenu, Menu } = require("../../../../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const dataCategory = await CategoryMenu.findAll({
        include: [
          {
            model: Menu,
          },
        ],
        order: [["name", "ASC"]],
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Category Menu",
        data: dataCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const dataCategory = await CategoryMenu.findOne({
        where: {
          id,
        },
      });

      if (!dataCategory) {
        throw { name: "Id Category Menu Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        messsage: "Berhasil Menampilkan Data Category Menu",
        data: dataCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { name, description } = req.body;

      const dataCategory = await CategoryMenu.create({
        name,
        description,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Category Menu Baru",
        data: dataCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const dataCategory = await CategoryMenu.findOne({
        where: {
          id,
        },
      });

      if (!dataCategory) {
        throw { name: "Id Category Menu Tidak Ditemukan" };
      }

      await CategoryMenu.update(
        {
          name,
          description,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Category Menu Baru",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETED
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataCategory = await CategoryMenu.findOne({
        where: {
          id,
        },
      });

      if (!dataCategory) {
        throw { name: "Id Category Menu Tidak Ditemukan" };
      }

      await CategoryMenu.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Category Menu Baru",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
