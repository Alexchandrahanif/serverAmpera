const remove = require("../../../../helper/remove");
const { Company, CategoryCompany } = require("../../../../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const data = await Company.getAll({
        include: [
          {
            model: CategoryCompany,
          },
        ],
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Company",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
  // GET ONE
  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Company.getAll({
        where: {
          id,
        },
        include: [
          {
            model: CategoryCompany,
          },
        ],
      });

      if (!data) {
        throw { name: "Id Company Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Company",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { companyName, address, CategoryCompanyId } = req.body;
      let body = {
        companyName,
        address,
        companyLogo: req.file ? req.file.path : "",
      };

      if (CategoryCompanyId) {
        const data = await CategoryCompany.findOne({
          where: {
            id: CategoryCompanyId,
          },
        });

        if (!data) {
          throw { name: "Id Category Company Tidak Ditemukan" };
        }
        body.CategoryCompanyId = CategoryCompanyId;
      }

      const dataCompany = await Company.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Company",
        data: dataCompany,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { companyName, address, CategoryCompanyId } = req.body;

      const data = await Company.getAll({
        where: {
          id,
        },
        include: [
          {
            model: CategoryCompany,
          },
        ],
      });

      if (!data) {
        throw { name: "Id Company Tidak Ditemukan" };
      }

      let body = {
        companyName,
        address,
      };

      if (req.file) {
        remove(data.companyLogo);
        body.companyLogo = req.file ? req.file.path : "";
      }

      if (CategoryCompanyId) {
        const data = await CategoryCompany.findOne({
          where: {
            id: CategoryCompanyId,
          },
        });

        if (!data) {
          throw { name: "Id Category Company Tidak Ditemukan" };
        }
        body.CategoryCompanyId = CategoryCompanyId;
      }

      await Company.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Company",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETED
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Company.getAll({
        where: {
          id,
        },
        include: [
          {
            model: CategoryCompany,
          },
        ],
      });

      if (!data) {
        throw { name: "Id Company Tidak Ditemukan" };
      }

      await Company.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Company",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
