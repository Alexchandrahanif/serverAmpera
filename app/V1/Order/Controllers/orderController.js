const {
  Order,
  Table,
  User,
  Menu,
  OrderMenu,
  Customer,
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

      let dataOrder = await Order.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataOrder.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Order",
        data: dataOrder.rows,
        totaldataOrder: dataOrder.count,
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
      const dataOrder = await Order.findOne({
        where: {
          id,
        },
      });
      if (!dataOrder) {
        throw { name: "Id Order Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Order",
        data: dataOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { customerName, CustomerId, TableId, MenuId } = req.body;

      // let MenuId = [
      //   {
      //     Id: "", // id menu
      //     total: 2,
      //     discount: 2,
      //     catatan: "Gula nya banyakin ya",
      //   },
      // ];

      let body = {
        customerName,
        orderStatus: "BELUM_DIPROSES",
        paymentStatus: false,
        UserId: req.user.id,
      };

      if (MenuId) {
        let orderPrice = 0;
        let totalDiscount = 0;
        MenuId.forEach(async (el) => {
          const data = await Menu.findOne({
            where: {
              id: el.id,
            },
          });
          orderPrice += data.price * el.total;
          totalDiscount += el.discount * el.total;
        });

        body.orderPrice = orderPrice;
        body.totalDiscount = totalDiscount;
        body.totalPrice = orderPrice - totalDiscount;
      }

      if (TableId) {
        const data = await Table.findOne({
          where: {
            id: TableId,
          },
        });
        if (!data) {
          throw { name: "Id Table Tidak Ditemukan" };
        } else {
          body.TableId = TableId;
        }
      }

      if (CustomerId) {
        const data = await Customer.findOne({
          where: {
            id: CustomerId,
          },
        });
        if (!data) {
          throw { name: "Id Table Tidak Ditemukan" };
        } else {
          body.CustomerId = CustomerId;
        }
      }

      const dataOrder = await Order.create(body);

      if (MenuId) {
        MenuId.forEach(async (el) => {
          await OrderMenu.create({
            total: el.total,
            discount: el.discount,
            catatan: el.catatan,
            MenuId: el.id,
            OrderId: el.id,
          });
        });
      }

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Order Baru",
        data: dataOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const dataOrder = await Order.findOne({
        where: {
          id,
        },
      });
      if (!dataOrder) {
        throw { name: "Id Order Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Order",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETED
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const dataOrder = await Order.findOne({
        where: {
          id,
        },
      });
      if (!dataOrder) {
        throw { name: "Id Order Tidak Ditemukan" };
      }

      await Order.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Order",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
