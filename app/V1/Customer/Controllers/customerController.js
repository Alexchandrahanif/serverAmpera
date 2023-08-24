const formatPhoneNumber = require("../../../../helper/formatPhoneNumber");
const { Customer } = require("../../../../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        order: [["customerName", "ASC"]],
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
            { customerName: { [Op.iLike]: `%${search}%` } },
            { phoneNumber: { [Op.iLike]: `%${search}%` } },
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

      let dataCustomer = await Customer.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataCustomer.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Customer",
        data: dataCustomer.rows,
        totaldataCustomer: dataCustomer.count,
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
      const data = await Customer.findOne({
        where: {
          id,
        },
      });
      if (!data) {
        throw { name: "Id Customer Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Customer",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { customerName, email, phoneNumber, address } = req.body;

      const dataPhoneNumber = await Customer.findOne({
        where: {
          phoneNumber: formatPhoneNumber(phoneNumber),
        },
      });

      if (dataPhoneNumber) {
        throw { name: "Nomor Telepon Sudah Terdaftar" };
      }

      let body = {
        customerName,
        email,
        phoneNumber: formatPhoneNumber(phoneNumber),
        address,
        totalTransaction: 0,
      };

      const data = await Customer.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Customer Baru",
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
      const { customerName, email, phoneNumber, address } = req.body;

      const data = await Customer.findOne({
        where: {
          id,
        },
      });
      if (!data) {
        throw { name: "Id Customer Tidak Ditemukan" };
      }

      if (formatPhoneNumber(phoneNumber) != data.phoneNumber) {
        const data = await Customer.findOne({
          where: {
            phoneNumber: formatPhoneNumber(phoneNumber),
          },
        });
        if (data) {
          throw { name: "Nomor Telepon Sudah Terdaftar" };
        }
      }
      let body = {
        customerName,
        email,
        phoneNumber: formatPhoneNumber(phoneNumber),
        address,
      };

      await Customer.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Customer",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETED
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Customer.findOne({
        where: {
          id,
        },
      });
      if (!data) {
        throw { name: "Id Customer Tidak Ditemukan" };
      }

      await Customer.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Customer",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
