const {
  hashingPassword,
  comparePassword,
  createAccessToken,
} = require("../../../../helper/helper");
const {
  Table,
  Menu,
  User,
  Customer,
  Order,
  OrderMenu,
} = require("../../../../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        order: [["createdAt", "DESC"]],
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [{ tableNumber: { [Op.iLike]: `%${search}%` } }],
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

      let dataTable = await Table.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataTable.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Table",
        data: dataTable.rows,
        totaldataTable: dataTable.count,
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
      const dataTable = await Table.findOne({
        where: {
          id,
        },
      });

      if (!dataTable) {
        throw { name: "Id Table Tidak Ditemukan" };
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Table",
        data: dataTable,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      let data = await Table.findAll();
      const formatCode = (num, places) => String(num).padStart(places, "0");
      const tableCode = `T-${formatCode(data.length + 1, 5)}`;

      let body = {
        tableNumber: tableCode,
        tableCode: hashingPassword(tableCode),
        QRCODE: `${process.env.CODE}${hashingPassword(tableCode)}`,
        paymentStatus: false,
        UserId: req.user.id,
      };

      const dataTable = await Table.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Table Baru",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updatePaymentStatus(req, res, next) {
    try {
      const { id } = req.params;

      const dataOrder = await Order.findAll({
        where: {
          TableId: id,
        },
      });

      let orderPrice = 0;
      let totalDiscount = 0;

      if (dataOrder.length > 0) {
        dataOrder.forEach((el) => {
          orderPrice += el.totalPrice;
          totalDiscount += el.totalDiscount;
        });
      }

      let body = {
        totalOrder: dataOrder.length,
        orderPrice: orderPrice,
        totalDiscount: totalDiscount,
        totalPrice: orderPrice - totalDiscount,
        paymentStatus: true,
      };

      await Table.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Table",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETED
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const dataTable = await Table.findOne({
        where: {
          id,
        },
      });

      if (!dataTable) {
        throw { name: "Id Table Tidak Ditemukan" };
      }

      await Table.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Table",
      });
    } catch (error) {
      next(error);
    }
  }

  // LOGIN TABLE
  static async loginTable(req, res, next) {
    try {
      const { token } = req.params;
      const dataToken = await Table.findOne({
        where: {
          tableCode: token,
          paymentStatus: false,
        },
      });

      if (!dataToken) {
        throw { name: "Token Table Tidak Valid" };
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Login",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
