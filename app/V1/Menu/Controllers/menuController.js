const remove = require("../../../../helper/remove");
const { Menu, Company, CategoryMenu } = require("../../../../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        order: [["name", "ASC"]],
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
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

      let dataMenu = await Menu.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataMenu.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Menu",
        data: dataMenu.rows,
        totaldataMenu: dataMenu.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ALL BY COMPANY ID
  static async getAllByCompanyId(req, res, next) {
    try {
      const { CompanyId } = req.params;
      const { limit, page, search, tanggal } = req.query;

      const data = await Company.findByPk(CompanyId);
      if (!data) {
        throw { name: "Id Company Tidak Ditemukan" };
      }

      let pagination = {
        where: {
          CompanyId,
        },
        order: [["name", "ASC"]],
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
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

      let dataMenu = await Menu.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataMenu.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Menu",
        data: dataMenu.rows,
        totaldataMenu: dataMenu.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Menu.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Menu Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Menu",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { name, price, description, stokMenu, CategoryMenuId } = req.body;

      let body = {
        name,
        price,
        description,
        stokMenu: stokMenu ? stokMenu : 0,
        photoMenu: req.file ? req.file.path : "",
      };

      if (CategoryMenuId) {
        const data = await CategoryMenu.findOne({
          where: {
            id: CategoryMenuId,
          },
        });
        if (!data) {
          throw { name: "Id Category Company Tidak Ditemukan" };
        }
        body.CategoryMenuId = CategoryMenuId;
      }

      const dataMenu = await Menu.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Menu Baru",
        data: dataMenu,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, description, stokMenu, CategoryMenuId } = req.body;

      const data = await Menu.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Menu Tidak Ditemukan" };
      }

      let body = {
        name,
        price,
        description,
        stokMenu,
      };

      if (req.file) {
        remove(data.photoMenu);
        body.photoMenu = req.file ? req.file.path : "";
      }

      if (CategoryMenuId) {
        const data = await CategoryMenu.findOne({
          where: {
            id: CategoryMenuId,
          },
        });
        if (!data) {
          throw { name: "Id Category Company Tidak Ditemukan" };
        }
        body.CategoryMenuId = CategoryMenuId;
      }

      const dataMenu = await Menu.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Menu",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETED
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Menu.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Menu Tidak Ditemukan" };
      }

      await Menu.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Menu",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
