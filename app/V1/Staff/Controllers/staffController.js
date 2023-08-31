const formatPhoneNumber = require("../../../../helper/formatPhoneNumber");
const { Staff, Company } = require("../../../../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        order: [["staffName", "ASC"]],
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
            { staffName: { [Op.iLike]: `%${search}%` } },
            { phoneNumber: { [Op.iLike]: `%${search}%` } },
            { role: { [Op.iLike]: `%${search}%` } },
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

      let dataStaff = await Staff.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataStaff.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Staff",
        data: dataStaff.rows,
        totaldataStaff: dataStaff.count,
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
      const data = await Staff.findOne({
        where: {
          id,
        },
      });
      if (!data) {
        throw { name: "Id Staff Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Staff",
        data,
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
        order: [["staffName", "ASC"]],
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
            { staffName: { [Op.iLike]: `%${search}%` } },
            { phoneNumber: { [Op.iLike]: `%${search}%` } },
            { pin: { [Op.iLike]: `%${search}%` } },
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

      let dataStaff = await Staff.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataStaff.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Staff",
        data: dataStaff.rows,
        totaldataStaff: dataStaff.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { staffName, pin, role, phoneNumber, CompanyId } = req.body;

      const dataPhoneNumber = await Staff.findOne({
        where: {
          phoneNumber: formatPhoneNumber(phoneNumber),
        },
      });

      if (dataPhoneNumber) {
        throw { name: "Nomor Telepon Sudah Terdaftar" };
      }

      let body = {
        staffName,
        pin,
        role,
        phoneNumber: formatPhoneNumber(phoneNumber),
      };

      if (CompanyId) {
        const data = await CompanyId.findByPk(Company);
        if (!data) {
          throw { name: "Id Company Tidak Ditemukan" };
        }
        body.CompanyId = CompanyId;
      }

      const data = await Staff.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Staff Baru",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { staffName, role, phoneNumber, CompanyId } = req.body;

      const data = await Staff.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Staff Tidak Ditemukan" };
      }

      if (formatPhoneNumber(phoneNumber) != data.phoneNumber) {
        const data = await Staff.findOne({
          where: {
            phoneNumber: formatPhoneNumber(phoneNumber),
          },
        });
        if (data) {
          throw { name: "Nomor Telepon Sudah Terdaftar" };
        }
      }

      let body = {
        staffName,
        role,
        phoneNumber: formatPhoneNumber(phoneNumber),
      };

      if (CompanyId) {
        const data = await CompanyId.findByPk(Company);
        if (!data) {
          throw { name: "Id Company Tidak Ditemukan" };
        }
        body.CompanyId = CompanyId;
      }

      const data = await Staff.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Staff",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETED
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Staff.findOne({
        where: {
          id,
        },
      });
      if (!data) {
        throw { name: "Id Staff Tidak Ditemukan" };
      }

      await Staff.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Staff",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
