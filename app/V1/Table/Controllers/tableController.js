const { Table } = require("../../../../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  // GET ONE
  static async getOne(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      let data = await Order.findAll();
      const formatCode = (num, places) => String(num).padStart(places, "0");
      const tableCode = `SPK${formatCode(data.length + 1, 5)}`;
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // DELETED
  static async delete(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
